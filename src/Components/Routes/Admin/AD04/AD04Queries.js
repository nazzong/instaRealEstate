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

export const MODIFY_POPUP = gql`
  mutation modifyPopup($id: String!, $imagePath: String!) {
    modifyPopup(id: $id, imagePath: $imagePath)
  }
`;

export const MODIFY_POPUP_STATUS = gql`
  mutation modifyPopupStatus($id: String!, $status: Boolean!) {
    modifyPopupStatus(id: $id, status: $status)
  }
`;
