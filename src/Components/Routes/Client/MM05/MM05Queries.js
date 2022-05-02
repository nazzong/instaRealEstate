import { gql } from "apollo-boost";

export const GET_PRODUCT_SEARCH = gql`
  query getProductSearch(
    $searchValue: String!
    $currentPage: Int!
    $limit: Int!
  ) {
    getProductSearch(
      searchValue: $searchValue
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

export const GET_PRODUCT_FOR_INFINITE = gql`
  query getProductForInfinite($limit: Int!, $searchValue: String!) {
    getProductForInfinite(limit: $limit, searchValue: $searchValue) {
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

export const GET_PRODUCT_SEARCH_TOTALPAGE = gql`
  query getProductSearchTotalPage($searchValue: String!, $limit: Int!) {
    getProductSearchTotalPage(searchValue: $searchValue, limit: $limit)
  }
`;

export const GET_PRODUCT_SEARCH_TOTALPAGE_ONLY_CNT = gql`
  query getProductSearchTotalPageOnlyCnt($searchValue: String!) {
    getProductSearchTotalPageOnlyCnt(searchValue: $searchValue)
  }
`;

export const UPDATE_PRODUCT_STAR = gql`
  mutation updateProductStar($id: String!, $star: Int!) {
    updateProductStar(id: $id, star: $star)
  }
`;
