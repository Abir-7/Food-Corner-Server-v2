import mongoose from "mongoose";

export interface IFavProduct {
  products: mongoose.Types.ObjectId[];
  customerId: mongoose.Types.ObjectId;
}
