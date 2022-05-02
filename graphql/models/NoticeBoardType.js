import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NoticeBoardType = new Schema(
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

export default mongoose.model(
  `NoticeBoardType`,
  NoticeBoardType,
  `NoticeBoardType`
);
