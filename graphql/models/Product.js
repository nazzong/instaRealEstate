import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    productNo: {
      type: String,
      required: true,
    },
    categoryList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: `MenuDepth_2`,
      },
    ],
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `AdminUser`,
    },
    productType: {
      type: String,
      required: true,
    },
    buildingType: {
      type: String,
      required: false,
    },
    buildingUse: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    roadAddress: {
      type: String,
      required: false,
      default: "-",
    },
    detailAddress: {
      type: String,
      required: false,
    },
    viewAddress: {
      type: String,
      required: true,
    },
    addressLat: {
      type: String,
      required: true,
    },
    addressLng: {
      type: String,
      required: true,
    },
    subwayTime: {
      type: String,
      required: false,
    },
    subwayTime2: {
      type: String,
      required: false,
    },
    subwayCarTime: {
      type: String,
      required: false,
    },
    subwayCarTime2: {
      type: String,
      required: false,
    },
    subwayName: {
      type: String,
      required: false,
    },
    subwayName2: {
      type: String,
      required: false,
    },
    isMonthly: {
      type: Boolean,
      required: true,
    },
    monthlyDeposit: {
      type: String,
      required: false,
    },
    monthlyDepositUnit: {
      type: String,
      required: false,
    },
    monthlyPrice: {
      type: String,
      required: false,
    },
    monthlyPriceUnit: {
      type: String,
      required: false,
    },
    isMonthlyCheck: {
      type: Boolean,
      required: true,
    },
    isJeonse: {
      type: Boolean,
      required: true,
    },
    jeonseDeposit: {
      type: String,
      required: false,
    },
    jeonseDepositUnit: {
      type: String,
      required: false,
    },
    isJeonseCheck: {
      type: Boolean,
      required: true,
    },
    isTrading: {
      type: Boolean,
      required: true,
    },
    tradingPrice: {
      type: String,
      required: false,
    },
    tradingPriceUnit: {
      type: String,
      required: false,
    },
    isTradingCheck: {
      type: Boolean,
      required: true,
    },
    isManagementFee: {
      type: Boolean,
      required: true,
    },
    managementFee: {
      type: String,
      required: false,
    },
    managementFeeUnit: {
      type: String,
      required: false,
    },
    isRightFee: {
      type: Boolean,
      required: true,
    },
    rightFee: {
      type: String,
      required: false,
    },
    rightFeeUnit: {
      type: String,
      required: false,
    },
    pyeongPrice: {
      type: String,
      required: false,
    },
    pyeongPriceUnit: {
      type: String,
      required: false,
    },
    totalFloor: {
      type: String,
      required: true,
    },
    floor: {
      type: String,
      required: true,
    },
    realArea: {
      type: String,
      required: false,
    },
    contractArea: {
      type: String,
      required: true,
    },
    dedicatedArea: {
      type: String,
      required: true,
    },
    groundArea: {
      type: String,
      required: false,
    },
    isParking: {
      type: Boolean,
      required: true,
    },
    parkingNumber: {
      type: String,
      required: false,
    },
    totalParkingNumber: {
      type: String,
      required: false,
    },
    parkType1: {
      type: String,
      required: false,
      default: "-",
    },
    parkType2: {
      type: String,
      required: false,
      default: "-",
    },
    isElevator: {
      type: Boolean,
      required: true,
    },
    elevatorNumber: {
      type: String,
      required: false,
    },
    isHeating: {
      type: Boolean,
      required: true,
      default: false,
    },
    heatingType: {
      type: String,
      required: true,
    },
    moveInDate: {
      type: String,
      required: true,
    },
    entranceDirection: {
      type: String,
      required: true,
    },
    useApprovalDate: {
      type: String,
      required: true,
    },
    restroom: {
      type: String,
      required: true,
    },
    usage: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    isCeiling: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    listTitle: {
      type: String,
      required: true,
    },
    listSubTitle: {
      type: String,
      required: true,
    },
    additionalContent: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    memo: {
      type: String,
      required: false,
    },
    privateAddress: {
      type: String,
      required: false,
    },
    privateTel: {
      type: String,
      required: false,
    },
    privateTel2: {
      type: String,
      required: false,
    },
    privateRemark: {
      type: String,
      required: false,
    },
    thumbnailPath: {
      type: String,
      required: false,
    },
    detailImagePaths: {
      type: [String],
      required: false,
    },
    hit: {
      type: Number,
      required: true,
      default: 0,
    },
    star: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
    isBest: {
      type: Boolean,
      required: true,
      default: false,
    },
    isComplete: {
      type: Boolean,
      required: true,
      default: false,
    },
    isView: {
      type: Boolean,
      required: true,
      default: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
      default: true,
    },
    isMap: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDelete: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: String,
      required: true,
      default: "-",
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`Product`, Product, `Product`);
