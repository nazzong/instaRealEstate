import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogLink = new Schema(
  {
    link: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`BlogLink`, BlogLink, `BlogLink`);
