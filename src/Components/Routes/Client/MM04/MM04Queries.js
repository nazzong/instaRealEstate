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
