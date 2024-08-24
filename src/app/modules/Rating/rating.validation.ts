import mongoose from "mongoose";
import { z } from "zod";

export const zodRatingSchema = z
  .object({
    body: z.object({
      product: z
        .instanceof(mongoose.Types.ObjectId)
        .refine((val) => val instanceof mongoose.Types.ObjectId, {
          message: "Invalid product ID",
        }),
      rating: z
        .number({
          required_error: "Rating is required",
          invalid_type_error: "Rating must be a number",
        })
        .min(1, { message: "Rating must be at least 1" })
        .max(5, { message: "Rating must be at most 5" }),
    }),
    comment: z.string().optional(),
  })
  .strict();
