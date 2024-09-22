import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: [true, "Customer ID is required"],
      ref: "Customer",
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: [true, "Product ID is required"],
          ref: "Products",
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
        },
        size: {
          type: String,
          required: [true, "Size is required"],
        },
      },
    ],
    transectionId: {
      type: String,
      required: [true, "Transaction ID is required"],
    },
    total: {
      totalPrice: {
        type: Number,
        required: [true, "Total price is required"],
      },
      discount: {
        type: Number,
        required: [true, "Discount is required"],
      },
      subTotal: {
        type: Number,
        required: [true, "Subtotal is required"],
      },
    },
    isCancel: {
      type: Boolean,
      default: false,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "processing"],
      default: "processing",
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "onGoing", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Orders", orderSchema);
