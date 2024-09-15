import { z } from "zod";
import { productAvailableFor, productCategory } from "./item.const";

export const zodProductSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Product title is required.",
      invalid_type_error: "Product title must be string.",
    }),
    description: z.string({
      required_error: "Product description is required.",
      invalid_type_error: "Product description must be string.",
    }),
    category: z.enum(productCategory, {
      required_error: "Category is required.",
      invalid_type_error: "Category must be string.",
    }),
    price: z.array(
      z.object({
        price: z
          .string({
            required_error: "Price is required.",
            invalid_type_error: "Price must be number.",
          })
          .regex(/^\d+$/, {
            message: "Price must be a number.",
          }),
        size: z.string({
          required_error: "Size is required.",
          invalid_type_error: "Size must be number.",
        }),
      })
    ),
    cuisine: z.string({
      required_error: "Cuisine is required.",
      invalid_type_error: "Cuisine must be string.",
    }),
    status: z.object({
      inStock: z.boolean().optional(),
      availableQuantity: z.union(
        [
          z
            .number()
            .nonnegative({
              message: "Available quantity must be a non-negative number",
            }),
          z.literal("nolimit"),
        ],
        { message: "Available quantity must be a number or 'nolimit'" }
      ),
    }),
    availableFor: z.object({
      Breakfast: z.boolean({
        required_error: "Breakfast availability is required.",
      }),
      Dinner: z.boolean({
        required_error: "Dinner availability is required.",
      }),
      Lunch: z.boolean({
        required_error: "Lunch availability is required.",
      }),
    }),
  }),
});

export const zodProductUpdateSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Product title is required.",
        invalid_type_error: "Product title must be string.",
      })
      .optional(),
    description: z
      .string({
        required_error: "Product description is required.",
        invalid_type_error: "Product description must be string.",
      })
      .optional(),
    category: z.enum(productCategory).optional(),
    price: z.number().optional(),
    status: z
      .object({
        inStock: z
          .boolean({ invalid_type_error: "InStock must be a boolean" })
          .optional(),
        availableQuantity: z
          .number({
            required_error: "Quantity is required",
            invalid_type_error: "Quantity must be a number",
          })
          .optional(),
      })
      .optional(),
    availableFor: z.enum(productAvailableFor).optional(),
  }),
});
