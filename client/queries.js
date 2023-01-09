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
