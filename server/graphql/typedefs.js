const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    username: String
    email: String
    password: String
    token: String
  }
  input RegisterInput {
    username: String
    email: String
    password: String
  }
  input LoginInput {
    username: String
    password: String
  }
  type Query {
    _dummy: String
    getUserById(id: ID!): User
    getUserByName(username: String!): User
  }
  type Mutation {
    createUser(registerInput: RegisterInput): User
  }
`;

module.exports = typeDefs;
