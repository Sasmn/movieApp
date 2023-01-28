import { gql } from "graphql-tag";

export const CREATE_USER = gql`
  mutation CreateUser($registerInput: RegisterInput) {
    createUser(registerInput: $registerInput) {
      username
      email
      password
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      username
      email
      password
      token
    }
  }
`;

export const GET_INDEX_MOVIES = gql`
  query GetIndexMovies {
    getIndexMovies {
      type
      movies {
        id
        title
        img
      }
    }
  }
`;

export const GET_MOVIES = gql`
  query GetMovies($apiInput: ApiInput) {
    getMovies(apiInput: $apiInput) {
      id
      title
      img
    }
  }
`;

export const GET_MOVIE = gql`
  query GetMovie($getMovieId: String) {
    getMovie(id: $getMovieId) {
      id
      img
      title
    }
  }
`;

export const GET_GENRES = gql`
  query GetGenres {
    getGenres {
      description
    }
  }
`;
