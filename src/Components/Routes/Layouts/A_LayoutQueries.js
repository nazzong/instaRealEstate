import { gql } from "apollo-boost";

export const GET_ADMIN_USER_LOGIN_RESULT = gql`
  query getAdminUserLoginResult($userId: String!, $password: String!) {
    getAdminUserLoginResult(userId: $userId, password: $password) {
      _id
      right
    }
  }
`;

export const GET_PRODUCT_ALL = gql`
  query getProductAll {
    getProductAll {
      _id
      categoryList {
        _id
        name
        parentMenu {
          _id
          name
        }
      }
      viewAddress
      contractArea
      isMonthly
      monthlyDeposit
      monthlyDepositUnit
      monthlyPrice
      monthlyPriceUnit
      isJeonse
      jeonseDeposit
      jeonseDepositUnit
      isTrading
      tradingPrice
      tradingPriceUnit
      listTitle
      listSubTitle
      thumbnailPath
      detailImagePaths
      star
      isComplete
    }
  }
`;

export const UPDATE_PRODUCT_IMAGE_PATHS = gql`
  mutation updateProductImagePaths(
    $id: String!
    $detailImagePaths: [String!]!
  ) {
    updateProductImagePaths(id: $id, detailImagePaths: $detailImagePaths)
  }
`;
