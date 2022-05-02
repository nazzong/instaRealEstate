import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NoticeBoard = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
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
    hit: {
      type: Number,
      required: true,
      default: 0,
    },
    deletedAt: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`NoticeBoard`, NoticeBoard, `NoticeBoard`);
