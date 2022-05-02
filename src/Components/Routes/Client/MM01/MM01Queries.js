import { gql } from "apollo-boost";

export const GET_MENU_BY_ID = gql`
  query getMenuById($id: String) {
    getMenuById(id: $id) {
      _id
      name
      link
    }
  }
`;

export const GET_SUB_MENU_BY_ID = gql`
  query getSubMenuById($id: String) {
    getSubMenuById(id: $id) {
      _id
      name
      link
      parentMenu {
        _id
        name
      }
    }
  }
`;

export const GET_PRODUCT_BY_MENU = gql`
  query getProductByMenu(
    $pmenu: String
    $cmenu: String
    $currentPage: Int!
    $limit: Int!
  ) {
    getProductByMenu(
      pmenu: $pmenu
      cmenu: $cmenu
      currentPage: $currentPage
      limit: $limit
    ) {
      _id
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

export const GET_PRODUCT_BY_MENU_FOR_INFINITE = gql`
  query getProductByMenuForInfinite(
    $limit: Int!
    $pmenu: String
    $cmenu: String
  ) {
    getProductByMenuForInfinite(limit: $limit, pmenu: $pmenu, cmenu: $cmenu) {
      _id
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

export const GET_PRODUCT_TOTALPAGE = gql`
  query getProductTotalPage($pmenu: String, $cmenu: String, $limit: Int!) {
    getProductTotalPage(pmenu: $pmenu, cmenu: $cmenu, limit: $limit)
  }
`;

export const GET_PRODUCT_TOTALPAGE_ONLY_CNT = gql`
  query getProductTotalPageOnlyCnt($pmenu: String, $cmenu: String) {
    getProductTotalPageOnlyCnt(pmenu: $pmenu, cmenu: $cmenu)
  }
`;

export const UPDATE_PRODUCT_STAR = gql`
  mutation updateProductStar($id: String!, $star: Int!) {
    updateProductStar(id: $id, star: $star)
  }
`;
