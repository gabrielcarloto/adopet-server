import { ApolloError, AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import 'dotenv/config';

import prisma from './prisma';
import {
  AddPetMutationArgs,
  AddUserMutationArgs,
  Context,
  LoginMutationArgs,
} from './interfaces';

const resolvers = {
  Query: {
    pets: async () => {
      const pets = await prisma.pet.findMany();

      return pets;
    },

    pet: async (_: unknown, { id }: { id: string }) => {
      const pet = await prisma.pet.findUnique({
        where: { id },
      });

      return pet;
    },

    user: async (_: unknown, { id }: { id: string }) => {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      return user;
    },
  },

  Mutation: {
    addPet: async (
      _: unknown,
      { petData }: AddPetMutationArgs,
      ctx: Context,
    ) => {
      if (
        !ctx.username ||
        !(await prisma.user.findUnique({
          where: {
            username: ctx.username,
          },
        }))
      ) {
        throw new AuthenticationError('Invalid credentials');
      }

      const response = await prisma.pet.create({
        data: {
          ...petData,
          owner: {
            connect: { username: ctx.username },
          },
        },
        include: {
          owner: {
            select: {
              id: true,
              createdAt: true,
              username: true,
              name: true,
              picture: true,
            },
          },
        },
      });

      return response;
    },

    registerUser: async (
      _: unknown,
      { userData }: AddUserMutationArgs,
      ctx: Context,
    ) => {
      const isAlreadyRegistered = await prisma.user.findUnique({
        where: {
          username: userData.username,
        },
      });

      if (isAlreadyRegistered) {
        throw new AuthenticationError('User already exists');
      }

      const hashedPassword = await argon2.hash(userData.password);

      const createdUser = await prisma.user.create({
        data: { ...userData, password: hashedPassword },
      });

      const { username } = userData;

      const accessToken = jwt.sign(
        { username },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '15m' },
      );

      const refreshToken = jwt.sign(
        { username },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: '7d' },
      );

      ctx.res.cookie('access-token', accessToken, { expire: 60 * 15 });
      ctx.res.cookie('refresh-token', refreshToken, {
        expire: 60 * 60 * 24 * 7,
      });

      return { username: createdUser.username };
    },

    login: async (
      _: unknown,
      { username, password }: LoginMutationArgs,
      ctx: Context,
    ) => {
      if (!username || !password)
        throw new AuthenticationError('Invalid credentials');

      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user || !(await argon2.verify(user.password, password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const accessToken = jwt.sign(
        { username },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '15m' },
      );

      const refreshToken = jwt.sign(
        { username },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: '7d' },
      );

      ctx.res.cookie('access-token', accessToken, { expire: 60 * 15 });
      ctx.res.cookie('refresh-token', refreshToken, {
        expire: 60 * 60 * 24 * 7,
      });

      await prisma.token.deleteMany({
        where: {
          username,
        },
      });

      await prisma.token.create({
        data: {
          token: refreshToken,
          user: {
            connect: {
              username,
            },
          },
        },
      });

      return { username: user.username };
    },

    refresh: async (
      _parent: unknown,
      _args: unknown,
      { refreshToken, ...ctx }: Context,
    ) => {
      const { username } = jwt.verify(
        refreshToken as string,
        process.env.REFRESH_TOKEN_SECRET as string,
      ) as unknown as { username: string };

      const user = await prisma.user.findUnique({
        where: { username },
        include: {
          tokens: true,
        },
      });

      if (!user) throw new AuthenticationError('Invalid credentials');
      if (user.tokens[0].token !== refreshToken) {
        throw new AuthenticationError('User is not logged in');
      }

      const accessToken = jwt.sign(
        { username },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '15m' },
      );

      ctx.res.cookie('access-token', accessToken, { expire: 60 * 15 });
      return { username };
    },

    logout: async (
      _: unknown,
      { username }: { username: string },
      ctx: Context,
    ) => {
      if (!username) throw new ApolloError('`username` field is required');

      const { count } = await prisma.token.deleteMany({
        where: {
          username,
        },
      });

      ctx.res.cookie('access-token', 'expired', { expire: 60 * 15 });

      return count > 0;
    },
  },
};

export default resolvers;
