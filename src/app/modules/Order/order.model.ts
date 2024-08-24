import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: [true, "Customer ID is required."],
      ref: "Customer",
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: [true, "At least one item is required."],
          ref: "Products",
        },
        quantity: {
          type: Number,
          required: true,
        },
        _id: false,
      },
    ],
    transectionId: {
      type: String,
      required: [true, "Transaction ID is required."],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required."],
    },
    isCancel: {
      type: Boolean,
      required: [true, "Cancellation status is required."],
      default: false,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "onGoing", "delivered"],
        message: "Status must be either 'pending', 'onGoing', or 'delivered'.",
      },
      required: [true, "Order status is required."],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Orders", orderSchema);
