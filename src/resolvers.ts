import argon2 from 'argon2';
import prisma from './prisma';

interface PetByIdQuery {
  id: string;
}

interface AddPetMutationArgs {
  petData: {
    name: string;
    image: string;
    location: string;
    breed: string;
    age: string;
    size: string;
    behaviour: string;
  };
}

interface AddUserMutationArgs {
  userData: {
    username: string;
    password: string;
    name: string;
  };
}

const resolvers = {
  Query: {
    pets: async () => {
      const pets = await prisma.pet.findMany();

      return pets;
    },
    pet: async (_parent: any, { id }: PetByIdQuery) => {
      const pet = await prisma.pet.findUnique({
        where: { id },
      });

      return pet;
    },
  },

  Mutation: {
    addPet: async (_parent: any, { petData }: AddPetMutationArgs) => {
      const response = await prisma.pet.create({
        data: {
          ...petData,
          User: {
            connect: { id: '' },
          },
        },
      });

      return response;
    },

    addUser: async (_parent: any, { userData }: AddUserMutationArgs) => {
      try {
        const hashedPassword = await argon2.hash(userData.password);

        const response = await prisma.user.create({
          data: { ...userData, password: hashedPassword },
        });

        return response;
      } catch (err) {
        return err;
      }
    },
  },
};

export default resolvers;
