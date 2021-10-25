const { PrismaClient } = require("@prisma/client");
const { ApolloServer, gql } = require("apollo-server");
const prisma = new PrismaClient();

const typeDefs = gql`
  type User {
    email: String!
    name: String
  }
  type Query {
    allUsers: [User!]!
  }
`;
const resolvers = {
  Query: {
    allUsers: () => {
      return prisma.user.findMany();
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
