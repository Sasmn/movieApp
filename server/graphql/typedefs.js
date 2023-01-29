const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date
  type User {
    username: String
    email: String
    password: String
    token: String
  }
  type Genre {
    description: String
  }
  type Rating {
    score: Float
    count: Int
  }
  type Date {
    day: Int
    month: Int
    year: Int
  }
  type Actor {
    name: String
    img: String
  }
  type FullMovie {
    id: String
    title: String
    img: String
    genres: [Genre]
    rating: Rating
    releaseDate: Date
    length: Int
    plot: String
    actors: [Actor]
  }
  type MiniMovie {
    id: String
    title: String
    img: String
    releaseDate: Date
  }
  type MovieList {
    type: String
    movies: [MiniMovie]
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
    getMovies(apiInput: ApiInput): [MiniMovie]
    getMovie(id: String): FullMovie
  }
  type Mutation {
    createUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }
`;

module.exports = typeDefs;
