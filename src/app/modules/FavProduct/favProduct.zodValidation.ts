import { z } from "zod";

// Define the schema with custom error messages
export const zodFavProductSchema = z.object({
  body: z.object({
    products: z.string({
      required_error: "Product ID is required",
      invalid_type_error: "Product ID must be a valid string",
    }),
    customerId: z.string({
      required_error: "Customer ID is required",
      invalid_type_error: "Customer ID must be a valid string",
    }),
  }),
});
