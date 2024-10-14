import { z } from "zod";

export const contactUsValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});
export const contactUsRepliedValidationSchema = z.object({
  repliedMsg: z.string(),
});
