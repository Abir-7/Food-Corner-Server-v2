import mongoose from "mongoose";

export interface IRating {
  product: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  customer: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
}

export interface IRatingUs {
  rating: number;
  comment: string;
  customer: mongoose.Types.ObjectId;
}
