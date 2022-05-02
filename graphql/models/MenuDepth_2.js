import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MenuDepth_2 = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    parentMenu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `MenuDepth_1`,
    },
    sort: {
      type: Number,
      required: true,
    },
    useYn: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`MenuDepth_2`, MenuDepth_2, `MenuDepth_2`);
