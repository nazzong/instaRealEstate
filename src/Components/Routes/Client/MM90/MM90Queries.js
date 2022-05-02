import { gql } from "apollo-boost";

export const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      _id
      email
    }
  }
`;

export const GET_USER_BY_MOBILE = gql`
  query getUserByMobile($mobile: String!) {
    getUserByMobile(mobile: $mobile) {
      _id
      mobile
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($email: String!, $name: String!, $mobile: String!) {
    createUser(email: $email, name: $name, mobile: $mobile)
  }
`;
