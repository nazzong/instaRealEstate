import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
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
      required: true,
      default: "-",
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`User`, User, `User`);
