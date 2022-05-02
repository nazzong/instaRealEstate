import { gql } from "apollo-boost";

export const GET_MAINBANNER = gql`
  query getMainBanner {
    getMainBanner {
      _id
      imagePath
      content
      title
    }
  }
`;

export const GET_PRODUCT_BY_BEST = gql`
  query getProductByBest {
    getProductByBest {
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

export const GET_PRODUCT = gql`
  query getProduct($searchValue: String!) {
    getProduct(searchValue: $searchValue) {
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

export const GET_PRODUCT_FOR_MAIN = gql`
  query getProductForMain(
    $mainLimit: Int!
    $currentPage: Int!
    $limit: Int!
    $category: String!
    $moreCategory: String!
    $moreLimit: Int!
    $filterTab: Int!
    $starList: [String!]!
    $type: String!
    $monthStart: Int!
    $monthEnd: Int!
    $monthLimit: Boolean!
    $depositStart: Int!
    $depositEnd: Int!
    $depositLimit: Boolean!
    $tradingStart: Int!
    $tradingEnd: Int!
    $tradingLimit: Boolean!
    $rightFeeStart: Int!
    $rightFeeEnd: Int!
    $rightFeeLimit: Boolean!
    $isRightFee: Boolean!
    $contractAreaStart: Int!
    $contractAreaEnd: Int!
    $contractAreaLimit: Boolean!
    $floor: String!
    $isParking: String!
    $isElevator: String!
    $restroom1: String!
    $restroom2: String!
    $isCeiling: Boolean!
    $buildingUse: String!
    $productType: String!
  ) {
    getProductForMain(
      mainLimit: $mainLimit
      currentPage: $currentPage
      limit: $limit
      category: $category
      moreCategory: $moreCategory
      moreLimit: $moreLimit
      filterTab: $filterTab
      starList: $starList
      type: $type
      monthStart: $monthStart
      monthEnd: $monthEnd
      monthLimit: $monthLimit
      depositStart: $depositStart
      depositEnd: $depositEnd
      depositLimit: $depositLimit
      tradingStart: $tradingStart
      tradingEnd: $tradingEnd
      tradingLimit: $tradingLimit
      rightFeeStart: $rightFeeStart
      rightFeeEnd: $rightFeeEnd
      rightFeeLimit: $rightFeeLimit
      isRightFee: $isRightFee
      contractAreaStart: $contractAreaStart
      contractAreaEnd: $contractAreaEnd
      contractAreaLimit: $contractAreaLimit
      floor: $floor
      isParking: $isParking
      isElevator: $isElevator
      restroom1: $restroom1
      restroom2: $restroom2
      isCeiling: $isCeiling
      buildingUse: $buildingUse
      productType: $productType
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

export const GET_PRODUCT_TOTALPAGE_FOR_MAIN = gql`
  query getProductTotalPageForMain(
    $limit: Int!
    $category: String!
    $filterTab: Int!
    $starList: [String!]!
    $type: String!
    $monthStart: Int!
    $monthEnd: Int!
    $monthLimit: Boolean!
    $depositStart: Int!
    $depositEnd: Int!
    $depositLimit: Boolean!
    $tradingStart: Int!
    $tradingEnd: Int!
    $tradingLimit: Boolean!
    $rightFeeStart: Int!
    $rightFeeEnd: Int!
    $rightFeeLimit: Boolean!
    $isRightFee: Boolean!
    $contractAreaStart: Int!
    $contractAreaEnd: Int!
    $contractAreaLimit: Boolean!
    $floor: String!
    $isParking: String!
    $isElevator: String!
    $restroom1: String!
    $restroom2: String!
    $isCeiling: Boolean!
    $buildingUse: String!
    $productType: String!
  ) {
    getProductTotalPageForMain(
      limit: $limit
      category: $category
      filterTab: $filterTab
      starList: $starList
      type: $type
      monthStart: $monthStart
      monthEnd: $monthEnd
      monthLimit: $monthLimit
      depositStart: $depositStart
      depositEnd: $depositEnd
      depositLimit: $depositLimit
      tradingStart: $tradingStart
      tradingEnd: $tradingEnd
      tradingLimit: $tradingLimit
      rightFeeStart: $rightFeeStart
      rightFeeEnd: $rightFeeEnd
      rightFeeLimit: $rightFeeLimit
      isRightFee: $isRightFee
      contractAreaStart: $contractAreaStart
      contractAreaEnd: $contractAreaEnd
      contractAreaLimit: $contractAreaLimit
      floor: $floor
      isParking: $isParking
      isElevator: $isElevator
      restroom1: $restroom1
      restroom2: $restroom2
      isCeiling: $isCeiling
      buildingUse: $buildingUse
      productType: $productType
    )
  }
`;

export const GET_PRODUCT_TOTALPAGE_ONLY_CNT_FOR_MAIN = gql`
  query getProductTotalPageOnlyCntForMain(
    $category: String!
    $filterTab: Int!
    $starList: [String!]!
    $type: String!
    $monthStart: Int!
    $monthEnd: Int!
    $monthLimit: Boolean!
    $depositStart: Int!
    $depositEnd: Int!
    $depositLimit: Boolean!
    $tradingStart: Int!
    $tradingEnd: Int!
    $tradingLimit: Boolean!
    $rightFeeStart: Int!
    $rightFeeEnd: Int!
    $rightFeeLimit: Boolean!
    $isRightFee: Boolean!
    $contractAreaStart: Int!
    $contractAreaEnd: Int!
    $contractAreaLimit: Boolean!
    $floor: String!
    $isParking: String!
    $isElevator: String!
    $restroom1: String!
    $restroom2: String!
    $isCeiling: Boolean!
    $buildingUse: String!
    $productType: String!
  ) {
    getProductTotalPageOnlyCntForMain(
      category: $category
      filterTab: $filterTab
      starList: $starList
      type: $type
      monthStart: $monthStart
      monthEnd: $monthEnd
      monthLimit: $monthLimit
      depositStart: $depositStart
      depositEnd: $depositEnd
      depositLimit: $depositLimit
      tradingStart: $tradingStart
      tradingEnd: $tradingEnd
      tradingLimit: $tradingLimit
      rightFeeStart: $rightFeeStart
      rightFeeEnd: $rightFeeEnd
      rightFeeLimit: $rightFeeLimit
      isRightFee: $isRightFee
      contractAreaStart: $contractAreaStart
      contractAreaEnd: $contractAreaEnd
      contractAreaLimit: $contractAreaLimit
      floor: $floor
      isParking: $isParking
      isElevator: $isElevator
      restroom1: $restroom1
      restroom2: $restroom2
      isCeiling: $isCeiling
      buildingUse: $buildingUse
      productType: $productType
    )
  }
`;

export const ADD_ACCEPT_RECORD = gql`
  mutation addAcceptRecord($date: String!) {
    addAcceptRecord(date: $date)
  }
`;

export const UPDATE_PRODUCT_STAR = gql`
  mutation updateProductStar($id: String!, $star: Int!) {
    updateProductStar(id: $id, star: $star)
  }
`;

export const GET_ALLMENUS = gql`
  query getHeaderMenus {
    getHeaderMenus {
      _id
      name
      link
      isProduct
      subMenu {
        _id
        name
        link
      }
    }
  }
`;
