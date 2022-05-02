import { gql } from "apollo-boost";

export const GET_FOOTER_INFO = gql`
  query getFooterInfo {
    getFooterInfo {
      cheifName
      businessName
      businessNumber
      tel
      email
      address
      privacyOfficer
    }
  }
`;

export const GET_ALLMENUS = gql`
  query getHeaderMenus {
    getHeaderMenus {
      name
      link
      isProduct
      subMenu {
        name
        link
      }
    }
  }
`;

export const GET_BLOGLINK = gql`
  query getBlogLink {
    getBlogLink {
      _id
      link
    }
  }
`;
