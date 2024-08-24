import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderService } from "./order.service";
import { IAuthUserInfo } from "../../interface/global.interface";

const orderProduct = catchAsync(async (req, res) => {
  const result = await orderService.createOrderIntoDB(req.body);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Order placed successfully",
  });
});

const getAllorder = catchAsync(async (req, res) => {
  const result = await orderService.getAllOrderFromDB();
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "All Order is fetched successfully",
  });
});

const getUsersAllOrder = catchAsync(async (req, res) => {
  const userData = req.user as JwtPayload & IAuthUserInfo;
  const result = await orderService.getUsersOrderFromDB(userData);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "User Orders are fetched successfully",
  });
});

export const orderController = {
  orderProduct,
  getAllorder,
  getUsersAllOrder,
};
