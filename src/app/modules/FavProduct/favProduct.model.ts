import { model, Schema } from "mongoose";
import { IFavProduct } from "./favProduct.interface";

const FavProductSchema = new Schema({
  products: {
    type: [Schema.Types.ObjectId],
    required: [true, "Products are required"],
    validate: {
      validator: function (v: Schema.Types.ObjectId[]) {
        return v.length > 0;
      },
      message: "There must be at least one product",
    },
    ref: "Products",
  },
  customerId: {
    type: Schema.Types.ObjectId,
    required: [true, "Customer ID is required"],
    ref: "Customer",
  },
});

export const FavouriteProduct = model<IFavProduct>(
  "FavouriteProduct",
  FavProductSchema
);
