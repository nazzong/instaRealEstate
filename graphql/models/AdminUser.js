import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdminUser = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    securityNumber: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    right: {
      type: Number,
      required: true,
      default: 2,
    },
    productList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Product`,
      },
    ],
    createdAt: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletedAt: {
      type: String,
      required: false,
      default: "-",
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`AdminUser`, AdminUser, `AdminUser`);
