import mongoose, { Document, Schema } from "mongoose";

export type EnquiryType =
  | "buy"
  | "rent"
  | "sell"
  | "invest"
  | "other";

export type EnquiryStatus =
  | "new"
  | "contacted"
  | "in-progress"
  | "closed";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  enquiryType: EnquiryType;
  budget?: string;
  preferredLocation?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    enquiryType: {
      type: String,
      enum: ["buy", "rent", "sell", "invest", "other"],
      required: true,
    },

    budget: {
      type: String,
      trim: true,
    },

    preferredLocation: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "in-progress", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model<IEnquiry>(
  "Enquiry",
  enquirySchema
);

export default Enquiry;