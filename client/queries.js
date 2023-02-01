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
        releaseDate {
          day
          month
          year
        }
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
      releaseDate {
        day
        month
        year
      }
    }
  }
`;

export const GET_MOVIE = gql`
  query GetMovie($id: String) {
    getMovie(id: $id) {
      title
      id
      img
      plot
      length
      rating {
        count
        score
      }
      releaseDate {
        day
        month
        year
      }
      genres {
        description
      }
      actors {
        name
        img
      }
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
  query GetAllCommentsByMovieID($movieID: String!) {
    getAllCommentsByMovieID(movieID: $movieID) {
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
      date {
        day
        month
        year
      }
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
  mutation DeleteComment($id: ID!, $username: String) {
    deleteComment(id: $id, username: $username) {
      _id
      username
      movieID
      body
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation EditComment($editCommentId: ID!, $body: String, $username: String!) {
    editComment(id: $editCommentId, body: $body, username: $username) {
      _id
      username
      movieID
      body
    }
  }
`;
