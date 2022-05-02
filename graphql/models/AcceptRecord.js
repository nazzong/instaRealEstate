import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AcceptRecord = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`AcceptRecord`, AcceptRecord, `AcceptRecord`);
