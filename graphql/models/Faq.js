import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Faq = new Schema(
  {
    sort: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`Faq`, Faq, `Faq`);
