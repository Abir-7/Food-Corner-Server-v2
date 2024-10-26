import { model, Schema } from "mongoose";
import { INewsletter } from "./newsletter.interface";

const newsLetterSchema = new Schema<INewsletter>({
  userEmail: {
    type: String,
    required: [true, "User email is required."],
  },
  isDiscountApplied: {
    type: Boolean,
    default: false,
  },
});

export const NewsLetter = model<INewsletter>("NewsLetter", newsLetterSchema);
