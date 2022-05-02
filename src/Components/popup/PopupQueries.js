import { gql } from "apollo-boost";

export const GET_POPUP = gql`
  query getPopup {
    getPopup {
      _id
      imagePath
      useYn
    }
  }
`;
