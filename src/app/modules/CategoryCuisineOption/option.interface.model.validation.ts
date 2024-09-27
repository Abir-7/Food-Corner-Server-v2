import { model, Schema } from "mongoose";
import { z } from "zod";
// category interface
export interface ICategory {
  category: string;
}
// category mongoose schema
const categorySchema = new Schema<ICategory>({
  category: {
    type: String,
    required: [true, "Category is required"],
    minlength: [3, "Category must be at least 3 characters long"],
    maxlength: [50, "Category must be at most 50 characters long"],
  },
});
export const Categories = model<ICategory>("Categories", categorySchema);
// category zod schema
export const categoryZodSchema = z.object({
  category: z
    .string({ required_error: "Category is required" })
    .min(3, { message: "Category must be at least 3 characters long" })
    .max(50, { message: "Category must be at most 50 characters long" }),
});

// cuisine interface
export interface ICuisine {
  cuisine: string;
}
// cuisine mongoose schema
const cuisineSchema = new Schema<ICuisine>({
  cuisine: {
    type: String,
    required: [true, "Category is required"],
    minlength: [3, "Category must be at least 3 characters long"],
    maxlength: [50, "Category must be at most 50 characters long"],
  },
});
export const Cuisines = model<ICuisine>("Cuisines", cuisineSchema);
// cuisine zod schema
export const cusineZodSchema = z.object({
  cuisine: z
    .string({ required_error: "Category is required" })
    .min(3, { message: "Category must be at least 3 characters long" })
    .max(50, { message: "Category must be at most 50 characters long" }),
});
