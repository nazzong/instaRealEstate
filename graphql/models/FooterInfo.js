import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FooterInfo = new Schema(
  {
    cheifName: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    businessNumber: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    privacyOfficer: {
      type: String,
      required: true,
    },
    officeHours: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`FooterInfo`, FooterInfo, `FooterInfo`);
