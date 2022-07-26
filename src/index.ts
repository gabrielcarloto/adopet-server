import { ApolloServer } from 'apollo-server';
import jwt from 'jsonwebtoken';
import resolvers from './resolvers';
import typeDefs from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  cors: {
    origin: [
      'https://adopet-lovat.vercel.app',
      'https://studio.apollographql.com',
      'http://localhost:3000',
    ],
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
  },

  formatResponse: (res, requestContext) => {
    const reqContext = requestContext;

    if (res.errors && !reqContext.request.variables) {
      if (reqContext.response?.http) {
        reqContext.response.http.status = 401;
      }
    }

    return res;
  },

  context: async ({ req, ...context }) => {
    const ctx: { username: string | null; refreshToken: string | null } = {
      username: null,
      refreshToken: null,
    };

    if (req.headers.cookie) {
      const cookies = req.headers.cookie
        .replace(/([a-z]+-[a-z]+=)|;/g, '')
        .split(' ');

      const accessToken = cookies[0];
      const refreshToken = cookies[1];

      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err, decoded) => {
          if (err) {
            ctx.username = null;
            ctx.refreshToken = refreshToken;
            return;
          }

          const { username } = decoded as unknown as { username: string };

          ctx.username = username;
        },
      );
    }

    return { ...ctx, ...context };
  },
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
