const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const { resolvers } = require('./graphql/resolvers');

const server = new GraphQLServer({
    typeDefs: 'graphql/schema.graphql',
    resolvers,
    context: request => {
      return {
        ...request,
        prisma
      }
    },
  })

server.start(() => console.log('Server is running on http://localhost:4000'))