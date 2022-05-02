import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Popup = new Schema(
  {
    imagePath: {
      type: String,
      required: true,
    },
    useYn: {
      type: Boolean,
      required: true,
    },
    sort: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`Popup`, Popup, `Popup`);
