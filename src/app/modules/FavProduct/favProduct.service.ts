import { JwtPayload } from "jsonwebtoken";

import { IAuthUserInfo } from "../../interface/global.interface";
import { Customer } from "../Customers/custommer.model";
import { FavouriteProduct } from "./favProduct.model";
import { Types } from "mongoose";

import { AppError } from "../../Errors/AppError";
import httpStatus from "http-status";

const addFavProductIntoDb = async (
  data: {
    product: Types.ObjectId;
    customerEmail: string;
  },
  userData: JwtPayload & IAuthUserInfo
) => {
  //checking user
  const getUser = await Customer.findOne({ email: data.customerEmail });
  if (getUser?.email !== userData.userEmail) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can not add item to Favourite."
    );
  }
  // check if product already listed
  const existingFavProduct = await FavouriteProduct.findOne({
    customerId: getUser._id,
  });

  if (
    existingFavProduct &&
    existingFavProduct.products.includes(data.product)
  ) {
    throw new AppError(
      httpStatus.CONFLICT, // HTTP status code for conflict
      "Product is already in your favorites."
    );
  }
  // add product to favourite
  const result = await FavouriteProduct.findOneAndUpdate(
    {
      customerId: getUser?._id,
    },
    { $addToSet: { products: data.product } },
    { upsert: true, new: true }
  );
  return result;
};

const getUsersFavItemFromDb = async (userData: JwtPayload & IAuthUserInfo) => {
  const getUser = await Customer.findOne({ email: userData.userEmail });
  const result = await FavouriteProduct.findOne({ customerId: getUser?._id })
    .populate("products")
    .populate("customerId");
  return result;
};

export const favProductService = {
  addFavProductIntoDb,
  getUsersFavItemFromDb,
};
