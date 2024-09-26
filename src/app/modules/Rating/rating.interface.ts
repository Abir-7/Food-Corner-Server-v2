import mongoose from "mongoose";

export interface IRating {
  product: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  customer: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
}
