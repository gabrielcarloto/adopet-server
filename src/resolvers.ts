import prisma from './prisma';

interface PetByIdQuery {
  id: string;
}

interface PetsMutationArgs {
  name: string;
  image: string;
  location: string;
  breed: string;
  age: string;
  size: string;
  behaviour: string;
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
    addPet: async (_parent: any, args: PetsMutationArgs) => {
      const response = await prisma.pet.create({
        data: args,
      });

      return response;
    },
  },
};

export default resolvers;
