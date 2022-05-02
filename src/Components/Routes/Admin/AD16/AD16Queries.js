import { gql } from "apollo-boost";

export const GET_SUB_MENU_FOR_PRODUCT = gql`
  query getSubMenuForProduct {
    getSubMenuForProduct {
      _id
      name
      useYn
      subMenu {
        _id
        name
      }
    }
  }
`;

export const GET_PRODUCTDETAIL = gql`
  query getProductDetail($id: String!) {
    getProductDetail(id: $id) {
      _id
      categoryList {
        _id
        name
        parentMenu {
          _id
        }
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
      isDelete
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $categoryList: [String!]!
    $manager: String!
    $productType: String!
    $buildingType: String!
    $buildingUse: String!
    $address: String!
    $roadAddress: String!
    $detailAddress: String!
    $viewAddress: String!
    $addressLat: String!
    $addressLng: String!
    $subwayTime: String!
    $subwayTime2: String!
    $subwayCarTime: String!
    $subwayCarTime2: String!
    $subwayName: String!
    $subwayName2: String!
    $isMonthly: Boolean!
    $monthlyDeposit: String!
    $monthlyDepositUnit: String!
    $monthlyPrice: String!
    $monthlyPriceUnit: String!
    $isMonthlyCheck: Boolean!
    $isJeonse: Boolean!
    $jeonseDeposit: String!
    $jeonseDepositUnit: String!
    $isJeonseCheck: Boolean!
    $isTrading: Boolean!
    $tradingPrice: String!
    $tradingPriceUnit: String!
    $isTradingCheck: Boolean!
    $isManagementFee: Boolean!
    $managementFee: String!
    $managementFeeUnit: String!
    $isRightFee: Boolean!
    $rightFee: String!
    $rightFeeUnit: String!
    $pyeongPrice: String
    $pyeongPriceUnit: String
    $totalFloor: String!
    $floor: String!
    $realArea: String!
    $contractArea: String!
    $dedicatedArea: String!
    $groundArea: String
    $isParking: Boolean!
    $parkingNumber: String!
    $totalParkingNumber: String!
    $parkType1: String!
    $parkType2: String!
    $isElevator: Boolean!
    $elevatorNumber: String!
    $isHeating: Boolean!
    $heatingType: String!
    $moveInDate: String!
    $entranceDirection: String!
    $useApprovalDate: String!
    $restroom: String!
    $usage: String!
    $roomNumber: String!
    $isCeiling: Boolean!
    $title: String!
    $description: String!
    $listTitle: String!
    $listSubTitle: String!
    $additionalContent: String!
    $content: String!
    $privateAddress: String!
    $privateTel: String!
    $privateTel2: String!
    $memo: String!
    $privateRemark: String!
    $thumbnailPath: String!
    $detailImagePaths: [String!]!
  ) {
    createProduct(
      categoryList: $categoryList
      manager: $manager
      productType: $productType
      buildingUse: $buildingUse
      buildingType: $buildingType
      address: $address
      roadAddress: $roadAddress
      detailAddress: $detailAddress
      viewAddress: $viewAddress
      addressLat: $addressLat
      addressLng: $addressLng
      subwayTime: $subwayTime
      subwayTime2: $subwayTime2
      subwayCarTime: $subwayCarTime
      subwayCarTime2: $subwayCarTime2
      subwayName: $subwayName
      subwayName2: $subwayName2
      isMonthly: $isMonthly
      monthlyDeposit: $monthlyDeposit
      monthlyDepositUnit: $monthlyDepositUnit
      monthlyPrice: $monthlyPrice
      monthlyPriceUnit: $monthlyPriceUnit
      isMonthlyCheck: $isMonthlyCheck
      isJeonse: $isJeonse
      jeonseDeposit: $jeonseDeposit
      jeonseDepositUnit: $jeonseDepositUnit
      isJeonseCheck: $isJeonseCheck
      isTrading: $isTrading
      tradingPrice: $tradingPrice
      tradingPriceUnit: $tradingPriceUnit
      isTradingCheck: $isTradingCheck
      isManagementFee: $isManagementFee
      managementFee: $managementFee
      managementFeeUnit: $managementFeeUnit
      isRightFee: $isRightFee
      rightFee: $rightFee
      rightFeeUnit: $rightFeeUnit
      pyeongPrice: $pyeongPrice
      pyeongPriceUnit: $pyeongPriceUnit
      totalFloor: $totalFloor
      floor: $floor
      realArea: $realArea
      contractArea: $contractArea
      dedicatedArea: $dedicatedArea
      groundArea: $groundArea
      isParking: $isParking
      parkingNumber: $parkingNumber
      totalParkingNumber: $totalParkingNumber
      parkType1: $parkType1
      parkType2: $parkType2
      isElevator: $isElevator
      elevatorNumber: $elevatorNumber
      isHeating: $isHeating
      heatingType: $heatingType
      moveInDate: $moveInDate
      entranceDirection: $entranceDirection
      useApprovalDate: $useApprovalDate
      restroom: $restroom
      usage: $usage
      roomNumber: $roomNumber
      isCeiling: $isCeiling
      title: $title
      description: $description
      listTitle: $listTitle
      listSubTitle: $listSubTitle
      additionalContent: $additionalContent
      content: $content
      privateAddress: $privateAddress
      privateTel: $privateTel
      privateTel2: $privateTel2
      memo: $memo
      privateRemark: $privateRemark
      thumbnailPath: $thumbnailPath
      detailImagePaths: $detailImagePaths
    )
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id: String!
    $categoryList: [String!]!
    $productType: String!
    $buildingType: String!
    $buildingUse: String!
    $address: String!
    $roadAddress: String!
    $detailAddress: String!
    $viewAddress: String!
    $addressLat: String!
    $addressLng: String!
    $subwayTime: String!
    $subwayTime2: String!
    $subwayCarTime: String!
    $subwayCarTime2: String!
    $subwayName: String!
    $subwayName2: String!
    $isMonthly: Boolean!
    $monthlyDeposit: String!
    $monthlyDepositUnit: String!
    $monthlyPrice: String!
    $monthlyPriceUnit: String!
    $isMonthlyCheck: Boolean!
    $isJeonse: Boolean!
    $jeonseDeposit: String!
    $jeonseDepositUnit: String!
    $isJeonseCheck: Boolean!
    $isTrading: Boolean!
    $tradingPrice: String!
    $tradingPriceUnit: String!
    $isTradingCheck: Boolean!
    $isManagementFee: Boolean!
    $managementFee: String!
    $managementFeeUnit: String!
    $isRightFee: Boolean!
    $rightFee: String!
    $rightFeeUnit: String!
    $pyeongPrice: String
    $pyeongPriceUnit: String
    $totalFloor: String!
    $floor: String!
    $realArea: String!
    $contractArea: String!
    $dedicatedArea: String!
    $groundArea: String
    $isParking: Boolean!
    $parkingNumber: String!
    $totalParkingNumber: String!
    $parkType1: String!
    $parkType2: String!
    $isElevator: Boolean!
    $elevatorNumber: String!
    $isHeating: Boolean!
    $heatingType: String!
    $moveInDate: String!
    $entranceDirection: String!
    $useApprovalDate: String!
    $restroom: String!
    $usage: String!
    $roomNumber: String!
    $isCeiling: Boolean!
    $title: String!
    $description: String!
    $listTitle: String!
    $listSubTitle: String!
    $additionalContent: String!
    $content: String!
    $privateAddress: String!
    $privateTel: String!
    $privateTel2: String!
    $memo: String!
    $privateRemark: String!
    $thumbnailPath: String!
    $detailImagePaths: [String!]!
  ) {
    updateProduct(
      id: $id
      categoryList: $categoryList
      productType: $productType
      buildingUse: $buildingUse
      buildingType: $buildingType
      address: $address
      roadAddress: $roadAddress
      detailAddress: $detailAddress
      viewAddress: $viewAddress
      addressLat: $addressLat
      addressLng: $addressLng
      subwayTime: $subwayTime
      subwayTime2: $subwayTime2
      subwayCarTime: $subwayCarTime
      subwayCarTime2: $subwayCarTime2
      subwayName: $subwayName
      subwayName2: $subwayName2
      isMonthly: $isMonthly
      monthlyDeposit: $monthlyDeposit
      monthlyDepositUnit: $monthlyDepositUnit
      monthlyPrice: $monthlyPrice
      monthlyPriceUnit: $monthlyPriceUnit
      isMonthlyCheck: $isMonthlyCheck
      isJeonse: $isJeonse
      jeonseDeposit: $jeonseDeposit
      jeonseDepositUnit: $jeonseDepositUnit
      isJeonseCheck: $isJeonseCheck
      isTrading: $isTrading
      tradingPrice: $tradingPrice
      tradingPriceUnit: $tradingPriceUnit
      isTradingCheck: $isTradingCheck
      isManagementFee: $isManagementFee
      managementFee: $managementFee
      managementFeeUnit: $managementFeeUnit
      isRightFee: $isRightFee
      rightFee: $rightFee
      rightFeeUnit: $rightFeeUnit
      pyeongPrice: $pyeongPrice
      pyeongPriceUnit: $pyeongPriceUnit
      totalFloor: $totalFloor
      floor: $floor
      realArea: $realArea
      contractArea: $contractArea
      dedicatedArea: $dedicatedArea
      groundArea: $groundArea
      isParking: $isParking
      parkingNumber: $parkingNumber
      totalParkingNumber: $totalParkingNumber
      parkType1: $parkType1
      parkType2: $parkType2
      isElevator: $isElevator
      elevatorNumber: $elevatorNumber
      isHeating: $isHeating
      heatingType: $heatingType
      moveInDate: $moveInDate
      entranceDirection: $entranceDirection
      useApprovalDate: $useApprovalDate
      restroom: $restroom
      usage: $usage
      roomNumber: $roomNumber
      isCeiling: $isCeiling
      title: $title
      description: $description
      listTitle: $listTitle
      listSubTitle: $listSubTitle
      additionalContent: $additionalContent
      content: $content
      privateAddress: $privateAddress
      privateTel: $privateTel
      privateTel2: $privateTel2
      memo: $memo
      privateRemark: $privateRemark
      thumbnailPath: $thumbnailPath
      detailImagePaths: $detailImagePaths
    )
  }
`;
