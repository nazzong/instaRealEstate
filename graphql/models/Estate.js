import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Estate = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    detailAddress: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    tel: {
      type: String,
      required: false,
    },
    fax: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    managerRank: {
      type: String,
      required: false,
    },
    managerName: {
      type: String,
      required: false,
    },
    managerTel: {
      type: String,
      required: false,
    },
    managerEmail: {
      type: String,
      required: false,
    },
    managerThumbnail: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`Estate`, Estate, `Estate`);
