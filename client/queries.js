import { gql } from "apollo-server";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      value
    }
  }
`;
