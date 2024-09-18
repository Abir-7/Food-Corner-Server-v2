import mongoose from "mongoose";

export interface IOrder {
  customerId: mongoose.Types.ObjectId;
  items: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    size: string;
  }[];
  transectionId: string;
  total: {
    totalPrice: number;
    discount: number;
    subTotal: number;
  };
  isCancel: boolean;
  paymentStatus: "paid" | "processing";
  delivaryStatus: "pending" | "onGoing" | "delivered";
}
