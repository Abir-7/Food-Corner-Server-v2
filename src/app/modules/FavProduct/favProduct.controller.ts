import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { favProductService } from "./favProduct.service";
import { JwtPayload } from "jsonwebtoken";
import { IAuthUserInfo } from "../../interface/global.interface";

const addFavProduct: RequestHandler = catchAsync(async (req, res) => {
  const userData = req.user as JwtPayload & IAuthUserInfo;
  const data = req.body;
  const result = await favProductService.addFavProductIntoDb(data, userData);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Product added as favourite",
  });
});

const getUsersFavItem = catchAsync(async (req, res) => {
  const result = await favProductService.getUsersFavItemFromDb(
    req.user as JwtPayload & IAuthUserInfo
  );
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Users favourite items are fetche successfullyd",
  });
});

export const favProductController = {
  addFavProduct,
  getUsersFavItem,
};
