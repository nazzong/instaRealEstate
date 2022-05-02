import { gql } from "apollo-boost";

export const GET_TOTAL_ADMIN_USER = gql`
  query getTotalAdminUser {
    getTotalAdminUser {
      _id
      rank
      name
    }
  }
`;

export const GET_TOTAL_PRODUCT_FOR_ADMIN = gql`
  query getTotalProductForAdmin(
    $searchType: String!
    $searchKeyword: String!
    $searchProductType: String!
  ) {
    getTotalProductForAdmin(
      searchType: $searchType
      searchKeyword: $searchKeyword
      searchProductType: $searchProductType
    ) {
      _id
      manager {
        _id
        name
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
      isOpen
      isMap
      isDelete
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String!) {
    deleteProduct(id: $id)
  }
`;

export const UPDATE_PRODUCT_MANAGER = gql`
  mutation updateProductManager($id: String!, $manager: String!) {
    updateProductManager(id: $id, manager: $manager)
  }
`;

export const UPDATE_PRODUCT_STATUS = gql`
  mutation updateProductStatus($id: String!, $status: Int!) {
    updateProductStatus(id: $id, status: $status)
  }
`;

export const UPDATE_PRODUCT_VIEW = gql`
  mutation updateProductView($id: String!, $isView: Boolean!) {
    updateProductView(id: $id, isView: $isView)
  }
`;

export const UPDATE_PRODUCT_OPEN = gql`
  mutation updateProductOpen($id: String!, $isOpen: Boolean!) {
    updateProductOpen(id: $id, isOpen: $isOpen)
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

export const UPDATE_PRODUCT_BEST = gql`
  mutation updateProductBest($id: String!, $isBest: Boolean!) {
    updateProductBest(id: $id, isBest: $isBest)
  }
`;
