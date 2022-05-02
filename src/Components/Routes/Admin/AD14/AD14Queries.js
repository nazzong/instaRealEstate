import { gql } from "apollo-boost";

export const GET_ADMIN_USER = gql`
  query getAdminUser {
    getAdminUser {
      _id
      userId
      password
      rank
      name
      mobile
      address
      securityNumber
      filePath
      right
      createdAt
    }
  }
`;

export const GET_ADMIN_USER_SEARCH = gql`
  query getAdminUserSearch($searchValue: String!) {
    getAdminUserSearch(searchValue: $searchValue) {
      _id
      userId
      password
      rank
      name
      mobile
      address
      securityNumber
      filePath
      right
      createdAt
    }
  }
`;

export const DELETE_ADMIN_USER = gql`
  mutation deleteAdminUser($id: String!) {
    deleteAdminUser(id: $id)
  }
`;

export const CREATE_ADMIN_USER = gql`
  mutation createAdminUser(
    $userId: String!
    $password: String!
    $rank: String!
    $name: String!
    $mobile: String!
    $address: String!
    $securityNumber: String!
    $filePath: String!
  ) {
    createAdminUser(
      userId: $userId
      password: $password
      rank: $rank
      name: $name
      mobile: $mobile
      address: $address
      securityNumber: $securityNumber
      filePath: $filePath
    )
  }
`;

export const UPDATE_ADMIN_USER = gql`
  mutation updateAdminUser(
    $id: String!
    $rank: String!
    $name: String!
    $mobile: String!
    $address: String!
    $securityNumber: String!
    $filePath: String!
  ) {
    updateAdminUser(
      id: $id
      rank: $rank
      name: $name
      mobile: $mobile
      address: $address
      securityNumber: $securityNumber
      filePath: $filePath
    )
  }
`;
