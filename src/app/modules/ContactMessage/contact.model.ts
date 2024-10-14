import { model, Schema } from "mongoose";
import { IContactUs } from "./contact.interface";

const ContactUsSchema = new Schema<IContactUs>(
  {
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isReplied: {
      type: Boolean,
      default: false,
    },
    repliedMsg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const ContactUs = model<IContactUs>("ContactUs", ContactUsSchema);
