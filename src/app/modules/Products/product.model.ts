import { model, Schema } from "mongoose";
import { IProduct, ProductModel } from "./product.interface";
import { productAvailableFor } from "./product.const";

const productSchema = new Schema<IProduct, ProductModel>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title must be less than 100 characters long"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
    },
    category: {
      type: String,
      enum: ["Rice"],
      required: [true, "Category is required"],
    },
    availableFor: {
      type: String,
      enum: productAvailableFor,
      required: [true, "Available time is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    status: {
      inStock: {
        type: Boolean,
        default: true,
      },
      availableQuantity: {
        type: Number,
        required: [true, "Available Quantity is required"],
      },
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.statics.isProductExist = async function (id: string) {
  const existingProduct = await Product.findOne({ _id: id });
  return existingProduct;
};

productSchema.statics.isProductDeleted = async function (id: string) {
  const existingProduct = await Product.findOne({ _id: id });
  if (existingProduct?.isDeleted === true) {
    return true;
  } else {
    return false;
  }
};

export const Product = model<IProduct, ProductModel>("Products", productSchema);
