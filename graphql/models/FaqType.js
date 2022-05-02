import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FaqType = new Schema(
  {
    typeName: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`FaqType`, FaqType, `FaqType`);
