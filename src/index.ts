import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import typeDefs from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
