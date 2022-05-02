import { gql } from "apollo-boost";

export const GET_ESTATE = gql`
  query getEstate {
    getEstate {
      _id
      name
      address
      detailAddress
      location
      tel
      fax
      description
      managerRank
      managerName
      managerTel
      managerEmail
      managerThumbnail
    }
  }
`;

export const MODIFY_ESTATE = gql`
  mutation modifyEstate(
    $id: String!
    $name: String!
    $address: String!
    $detailAddress: String!
    $location: String!
    $tel: String!
    $fax: String!
    $description: String!
    $managerRank: String!
    $managerName: String!
    $managerTel: String!
    $managerEmail: String!
    $managerThumbnail: String!
  ) {
    modifyEstate(
      id: $id
      name: $name
      address: $address
      detailAddress: $detailAddress
      location: $location
      tel: $tel
      fax: $fax
      description: $description
      managerRank: $managerRank
      managerName: $managerName
      managerTel: $managerTel
      managerEmail: $managerEmail
      managerThumbnail: $managerThumbnail
    )
  }
`;
