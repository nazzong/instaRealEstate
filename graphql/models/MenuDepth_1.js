import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MenuDepth_1 = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    subMenu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: `MenuDepth_2`,
      },
    ],
    sort: {
      type: Number,
      required: true,
    },
    useYn: {
      type: Boolean,
      required: true,
      default: true,
    },
    isProduct: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`MenuDepth_1`, MenuDepth_1, `MenuDepth_1`);
