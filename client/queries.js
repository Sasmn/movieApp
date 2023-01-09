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
