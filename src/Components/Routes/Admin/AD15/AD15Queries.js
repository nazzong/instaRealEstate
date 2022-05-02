import { gql } from "apollo-boost";

export const GET_PRODUCT_FOR_ADMIN = gql`
  query getProductForAdmin(
    $id: String!
    $currentPage: Int!
    $limit: Int!
    $searchType: String!
    $searchKeyword: String!
    $searchProductType: String!
    $searchTab: String!
    $searchOrder: String!
  ) {
    getProductForAdmin(
      id: $id
      currentPage: $currentPage
      limit: $limit
      searchType: $searchType
      searchKeyword: $searchKeyword
      searchProductType: $searchProductType
      searchTab: $searchTab
      searchOrder: $searchOrder
    ) {
      _id
      manager {
        _id
        rank
        name
        right
      }
      productNo
      productType
      buildingType
      buildingUse
      address
      roadAddress
      detailAddress
      viewAddress
      addressLat
      addressLng
      isMonthly
      monthlyDeposit
      monthlyDepositUnit
      monthlyPrice
      monthlyPriceUnit
      isMonthlyCheck
      isJeonse
      jeonseDeposit
      jeonseDepositUnit
      isJeonseCheck
      isTrading
      tradingPrice
      tradingPriceUnit
      isTradingCheck
      isManagementFee
      managementFee
      managementFeeUnit
      isRightFee
      rightFee
      rightFeeUnit
      totalFloor
      floor
      realArea
      contractArea
      dedicatedArea
      isParking
      parkingNumber
      totalParkingNumber
      parkType1
      parkType2
      isElevator
      elevatorNumber
      isHeating
      heatingType
      moveInDate
      entranceDirection
      useApprovalDate
      restroom
      usage
      roomNumber
      title
      description
      listTitle
      listSubTitle
      additionalContent
      content
      memo
      privateAddress
      privateTel
      privateTel2
      privateRemark
      thumbnailPath
      detailImagePaths
      hit
      star
      status
      isBest
      isComplete
      isView
      isMap
      isOpen
      isDelete
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const GET_PRODUCT_TOTAL_PAGE_FOR_ADMIN = gql`
  query getProductTotalPageForAdmin(
    $id: String!
    $limit: Int!
    $searchType: String!
    $searchKeyword: String!
    $searchProductType: String!
    $searchTab: String!
    $searchOrder: String!
  ) {
    getProductTotalPageForAdmin(
      id: $id
      limit: $limit
      searchType: $searchType
      searchKeyword: $searchKeyword
      searchProductType: $searchProductType
      searchTab: $searchTab
      searchOrder: $searchOrder
    )
  }
`;

export const GET_PRODUCT_TOTAL_PAGE_ONLY_CNT_FOR_ADMIN = gql`
  query getProductTotalPageOnlyCntForAdmin(
    $id: String!
    $searchType: String!
    $searchKeyword: String!
    $searchProductType: String!
    $searchOrder: String!
  ) {
    getProductTotalPageOnlyCntForAdmin(
      id: $id
      searchType: $searchType
      searchKeyword: $searchKeyword
      searchProductType: $searchProductType
      searchOrder: $searchOrder
    ) {
      cnt
      tabCount01
      tabCount02
      tabCount03
      tabCount04
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String!) {
    deleteProduct(id: $id)
  }
`;

export const UPDATE_PRODUCT_VIEW = gql`
  mutation updateProductView($id: String!, $isView: Boolean!) {
    updateProductView(id: $id, isView: $isView)
  }
`;

export const UPDATE_PRODUCT_MAP = gql`
  mutation updateProductMap($id: String!, $isMap: Boolean!) {
    updateProductMap(id: $id, isMap: $isMap)
  }
`;

export const UPDATE_PRODUCT_COMPLETE = gql`
  mutation updateProductComplete($id: String!, $isComplete: Boolean!) {
    updateProductComplete(id: $id, isComplete: $isComplete)
  }
`;
