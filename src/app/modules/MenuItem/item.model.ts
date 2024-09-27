import { model, Schema } from "mongoose";
import { IProduct, ProductModel } from "./item.interface";

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
      minlength: [5, "Description must be at least 10 characters long"],
    },
    category: {
      type: Schema.Types.ObjectId,
      required: [true, "Category is required"],
      ref: "Categories",
    },
    photo: {
      type: String,
      required: [true, "Photo is required"],
    },
    availableFor: {
      breakfast: {
        type: Boolean,
        required: [true, "Breakfast availability is required"],
      },
      lunch: {
        type: Boolean,
        required: [true, "Lunch availability is required"],
      },
      dinner: {
        type: Boolean,
        required: [true, "Dinner availability is required"],
      },
    },
    price: [
      {
        price: {
          type: Number,
          required: [true, "Price is required"],
          min: [0, "Price must be a positive number"],
        },
        size: {
          type: String,
          required: [true, "Size is required"],
        },
      },
    ],
    inStock: {
      type: Boolean,
      default: true,
    },
    limitedStatus: {
      quantity: {
        type: Number,
        default: null,
      },
      isLimited: {
        type: Boolean,
        required: [true, "Is Limited is required"],
        default: false,
      },
    },
    cuisine: {
      type: Schema.Types.ObjectId,
      required: [true, "Cuisine is required"],
      ref: "Cuisines",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    rating: {
      averageRating: {
        type: Number,
        default: 0,
      },
      ratingCount: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Virtual field for average rating

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
