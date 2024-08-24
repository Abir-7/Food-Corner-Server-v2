import mongoose from "mongoose";

export interface IOrder {
  customerId: mongoose.Types.ObjectId;
  items: { productId: mongoose.Types.ObjectId; quantity: number }[];
  transectionId: string;
  totalPrice: number;
  isCancel: boolean;
  status: "pending" | "onGoing" | "delivered";
}
