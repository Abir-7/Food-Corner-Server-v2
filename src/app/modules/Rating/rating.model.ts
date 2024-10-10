import { model, Schema } from "mongoose";
import { IRating, IRatingUs } from "./rating.interface";

const ratingSchema = new Schema<IRating>(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: [true, "Product ID is required"],
      ref: "Products",
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
    },
    comment: {
      type: String,
    },
    customer: {
      type: Schema.Types.ObjectId,
      required: [true, "Customer ID is required"],
      ref: "Customer",
    },
    orderId: {
      type: Schema.Types.ObjectId,
      required: [true, "Order ID is required"],
      ref: "Orders",
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export const Rating = model<IRating>("Rating", ratingSchema);

const ratingUsSchema = new Schema<IRatingUs>(
  {
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
    },
    comment: {
      type: String,
    },
    customer: {
      type: Schema.Types.ObjectId,
      required: [true, "Customer ID is required"],
      ref: "Customer",
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export const RatingUs = model<IRatingUs>("RatingUs", ratingUsSchema);
