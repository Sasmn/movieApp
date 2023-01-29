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
  query GetMovie($id: String) {
    getMovie(id: $id) {
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

export const GET_COMMENTS_MOVIE = gql`
  query GetAllCommentsByMovieID($movieId: String!) {
    getAllCommentsByMovieID(movieID: $movieId) {
      _id
      username
      movieID
      body
    }
  }
`;

export const GET_COMMENTS_USER = gql`
  query GetAllCommentsByUsername($username: String!) {
    getAllCommentsByUsername(username: $username) {
      _id
      username
      movieID
      body
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($commentInput: CommentInput) {
    createComment(commentInput: $commentInput) {
      _id
      username
      movieID
      body
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($deleteCommentId2: ID!) {
    deleteComment(id: $deleteCommentId2) {
      _id
      username
      movieID
      body
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation EditComment($editCommentId: ID!, $body: String) {
    editComment(id: $editCommentId, body: $body) {
      _id
      username
      movieID
      body
    }
  }
`;
