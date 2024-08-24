import { z } from "zod";

export const zodOrderSchema = z.object({
  customerId: z.string({
    required_error: "Customer Id is required",
    invalid_type_error: "Customer Id must be string",
  }),
  items: z.array(
    z.object({
      productId: z.string({
        required_error: "Items are required",
        invalid_type_error: "Items id must be string",
      }),
      quantity: z.number({
        required_error: "Item quantity are required",
        invalid_type_error: "Items quantity must be number",
      }),
    })
  ),
  transectionId: z.string({
    required_error: "Transaction ID is required",
    invalid_type_error: "Transaction ID must be a string",
  }),
  totalPrice: z.number({
    required_error: "Total price is required",
    invalid_type_error: "Total price must be a number",
  }),
  isCancel: z
    .boolean({
      required_error: "Cancellation status is required",
      invalid_type_error: "Cancellation status must be a boolean",
    })
    .optional(),
  status: z
    .enum(["pending", "onGoing", "delivered"], {
      required_error: "Status is required",
      invalid_type_error:
        "Status must be one of 'pending', 'onGoing', or 'delivered'",
    })
    .optional(),
});
