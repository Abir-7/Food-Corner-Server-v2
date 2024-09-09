import { JwtPayload } from "jsonwebtoken";
import { IRating } from "./rating.interface";
import { Rating } from "./rating.model";
import { IAuthUserInfo } from "../../interface/global.interface";
import { Customer } from "../Customers/custommer.model";
import { AppError } from "../../Errors/AppError";
import httpStatus from "http-status";
import { Product } from "../MenuItem/item.model";

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
  const result = await Rating.create(data);
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

export const ratingService = {
  addRatingIntoDb,
  allRatingFromDb,
  userRatingFromDb,
};
