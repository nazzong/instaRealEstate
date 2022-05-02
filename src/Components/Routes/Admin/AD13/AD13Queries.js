import { gql } from "apollo-boost";

export const GET_USER = gql`
  query getUser {
    getUser {
      _id
      name
      email
      mobile
      createdAt
    }
  }
`;

export const GET_USER_SEARCH = gql`
  query getUserSearch($searchValue: String!) {
    getUserSearch(searchValue: $searchValue) {
      _id
      name
      email
      mobile
      createdAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id)
  }
`;

export const SEND_USER_MESSAGE = gql`
  mutation sendUserMessage($user: [String!]!, $type: String!, $text: String!) {
    sendUserMessage(user: $user, type: $type, text: $text)
  }
`;
