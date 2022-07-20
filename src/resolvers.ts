import pets from './pets';

const resolvers = {
  Query: {
    pets: () => pets,
    pet: () => {},
  },
};

export default resolvers;
