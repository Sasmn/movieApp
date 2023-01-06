import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  query getUserByName($username: String!) {
    getUserByName(username: $username) {
      username
      email
      password
      token
    }
  }
`;
