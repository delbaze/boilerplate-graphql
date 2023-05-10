import { gql } from "@apollo/client";

export const LIST_BOOKS = gql`
  query Login($infos: UserLogin!) {
    login(infos: $infos) {
      token
      email
    }
  }
`;

export const CHECK_TOKEN = gql`
  query CheckToken {
    checkToken
  }
`;
