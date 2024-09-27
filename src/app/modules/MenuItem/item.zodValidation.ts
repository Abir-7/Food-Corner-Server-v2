import { z } from "zod";

export const zodProductSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Product title is required.",
      invalid_type_error: "Product title must be a string.",
    }),
    description: z.string({
      required_error: "Product description is required.",
      invalid_type_error: "Product description must be a string.",
    }),
    category: z.string({
      required_error: "Category is required.",
      invalid_type_error: "Category must be a string (ObjectId).",
    }),
    price: z.array(
      z.object({
        price: z.number({
          required_error: "Price is required.",
          invalid_type_error: "Price must be a number.",
        }),
        size: z.string({
          required_error: "Size is required.",
          invalid_type_error: "Size must be a string.",
        }),
      })
    ),
    cuisine: z.string({
      required_error: "Cuisine is required.",
      invalid_type_error: "Cuisine must be a string.",
    }),

    availableFor: z.object({
      breakfast: z.boolean({
        required_error: "Breakfast availability is required.",
      }),
      lunch: z.boolean({
        required_error: "Lunch availability is required.",
      }),
      dinner: z.boolean({
        required_error: "Dinner availability is required.",
      }),
    }),
    photo: z.string({
      required_error: "Photo URL is required.",
      invalid_type_error: "Photo must be a string.",
    }),
    limitedStatus: z
      .object({
        quantity: z
          .number({
            required_error: "Quantity is required.",
            invalid_type_error: "Quantity must be a number.",
          })
          .optional(),
      })
      .optional(),
  }),
});

export const zodProductUpdateSchema = z.object({
  body: z.object({
    limitedStatus: z
      .object({
        quantity: z.number({
          required_error: "Quantity is required.",
          invalid_type_error: "Quantity must be a number.",
        }),
      })
      .optional(),
    photo: z
      .string({
        required_error: "Photo URL is required.",
        invalid_type_error: "Photo must be a string.",
      })
      .optional(),
    availableFor: z
      .object({
        breakfast: z.boolean({
          required_error: "Breakfast availability is required.",
        }),
        lunch: z.boolean({
          required_error: "Lunch availability is required.",
        }),
        dinner: z.boolean({
          required_error: "Dinner availability is required.",
        }),
      })
      .optional(),
    price: z
      .array(
        z.object({
          price: z.number({
            required_error: "Price is required.",
            invalid_type_error: "Price must be a number.",
          }),
          size: z.string({
            required_error: "Size is required.",
            invalid_type_error: "Size must be a string.",
          }),
        })
      )
      .optional(),
  }),
  inStock: z.boolean().optional(),
});
