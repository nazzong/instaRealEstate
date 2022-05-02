import { gql } from "apollo-boost";

export const GET_FOOTERINFO = gql`
  query getFooterInfo {
    getFooterInfo {
      _id
      cheifName
      businessName
      businessNumber
      tel
      email
      address
      privacyOfficer
      officeHours
    }
  }
`;

export const MODIFY_FOOTERINFO = gql`
  mutation modifyFooterInfo(
    $id: String!
    $cheifName: String!
    $businessName: String!
    $businessNumber: String!
    $tel: String!
    $email: String!
    $address: String!
    $privacyOfficer: String!
    $officeHours: String!
  ) {
    modifyFooterInfo(
      id: $id
      cheifName: $cheifName
      businessName: $businessName
      businessNumber: $businessNumber
      tel: $tel
      email: $email
      address: $address
      privacyOfficer: $privacyOfficer
      officeHours: $officeHours
    )
  }
`;
