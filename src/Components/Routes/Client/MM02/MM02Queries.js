import { gql } from "apollo-boost";

export const GET_PRODUCTDETAIL = gql`
  query getProductDetail($id: String!) {
    getProductDetail(id: $id) {
      _id
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
      subwayTime
      subwayTime2
      subwayCarTime
      subwayCarTime2
      subwayName
      subwayName2
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
      pyeongPrice
      pyeongPriceUnit
      totalFloor
      floor
      realArea
      contractArea
      dedicatedArea
      groundArea
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

export const UPDATE_PRODUCT_HIT = gql`
  mutation updateProductHit($id: String!, $hit: Int!) {
    updateProductHit(id: $id, hit: $hit)
  }
`;

export const UPDATE_PRODUCT_STAR = gql`
  mutation updateProductStar($id: String!, $star: Int!) {
    updateProductStar(id: $id, star: $star)
  }
`;
