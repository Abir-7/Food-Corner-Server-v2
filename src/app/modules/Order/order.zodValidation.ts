import { z } from "zod";

export const zodOrderSchema = z
  .object({
    customerId: z.string({
      required_error: "Customer Id is required",
      invalid_type_error: "Customer Id must be string",
    }),
    items: z.array(
      z.object({
        productId: z.string({
          required_error: "Product ID is required",
          invalid_type_error: "Product ID must be string",
        }),
        quantity: z.number({
          required_error: "Item quantity is required",
          invalid_type_error: "Item quantity must be number",
        }),
        size: z.string({
          required_error: "Item size is required",
          invalid_type_error: "Item size must be string",
        }),
      })
    ),
    total: z.object({
      totalPrice: z.number({
        required_error: "Total price is required",
        invalid_type_error: "Total price must be a number",
      }),
      discount: z.number({
        required_error: "Discount is required",
        invalid_type_error: "Discount must be a number",
      }),
      subTotal: z.number({
        required_error: "Subtotal is required",
        invalid_type_error: "Subtotal must be a number",
      }),
    }),
  })
  .strict();
