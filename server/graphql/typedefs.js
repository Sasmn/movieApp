const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    username: String
    email: String
    password: String
    token: String
  }
  type Genre {
    description: String
  }
  type Movie {
    id: String
    title: String
    img: String
  }
  type MovieList {
    type: String
    movies: [Movie]
  }
  input ApiInput {
    list: String
    genre: String
    page: Int
  }
  input RegisterInput {
    username: String
    email: String
    password: String
    confirmPassword: String
  }
  input LoginInput {
    username: String
    password: String
  }
  type Query {
    _dummy: String
    getUserById(id: ID!): User
    getUserByName(username: String!): User
    getAllUser: [User]
    getGenres: [Genre]
    getIndexMovies: [MovieList]
    getMovies(apiInput: ApiInput): [Movie]
    getMovie(id: String): Movie
  }
  type Mutation {
    createUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }
`;

module.exports = typeDefs;
