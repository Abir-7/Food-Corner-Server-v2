import { JwtPayload } from "jsonwebtoken";
import { IRating } from "./rating.interface";
import { Rating, RatingUs } from "./rating.model";
import { IAuthUserInfo } from "../../interface/global.interface";
import { Customer } from "../Customers/custommer.model";
import { AppError } from "../../Errors/AppError";
import httpStatus from "http-status";
import { Product } from "../MenuItem/item.model";
import mongoose from "mongoose";

const addRatingIntoDb = async (
  data: IRating,
  auth: JwtPayload & IAuthUserInfo
) => {
  const product = await Product.findById(data.product);
  if (!product) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "you can not add review. Product not found."
    );
  }
  const user = await Customer.findOne({ email: auth.userEmail });
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "you can not add review. User not found."
    );
  }
  data.customer = user?._id;

  const isRatingForSameProduct = await Rating.find({
    product: data.product,
    orderId: data.orderId,
  });

  if (isRatingForSameProduct.length > 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You already added review to this product."
    );
  }

  const result = await Rating.create(data);

  const result2 = await Rating.aggregate([
    {
      $match: {
        product: new mongoose.Types.ObjectId(data.product), // Match the specific product ID
      },
    },
    {
      $group: {
        _id: null, // Group by null to get overall average
        averageRating: { $avg: "$rating" }, // Calculate average rating
        ratingCount: { $sum: 1 },
      },
    },
  ]);

  await Product.findByIdAndUpdate(data.product, {
    rating: {
      averageRating: result2.length > 0 ? result2[0].averageRating : 0,
      ratingCount: result2.length > 0 ? result2[0].ratingCount : 0,
    },
  });
  return result;
};

const allRatingFromDb = async () => {
  const result = await Rating.find();
  return result;
};
const userRatingFromDb = async (auth: JwtPayload & IAuthUserInfo) => {
  const user = await Customer.findOne({ email: auth.userEmail });
  const result = await Rating.find({ customer: user?._id });
  return result;
};

const createRatingUsIntoDb = async (
  data: { rating: number; comment: string },
  auth: JwtPayload & IAuthUserInfo
) => {
  const customer = await Customer.findOne({ email: auth.userEmail });

  if (!customer) {
    throw new AppError(httpStatus.BAD_REQUEST, "Customar Not Found");
  }

  const result = await RatingUs.create({ ...data, customer: customer?._id });
  return result;
};

const getRatingUsFromDb = async () => {
  const result = await RatingUs.find().populate("customer").sort("-createdAt");
  return result;
};

export const ratingService = {
  addRatingIntoDb,
  allRatingFromDb,
  userRatingFromDb,
  createRatingUsIntoDb,
  getRatingUsFromDb,
};
