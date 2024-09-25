import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderService } from "./order.service";
import { IAuthUserInfo } from "../../interface/global.interface";

const orderProduct = catchAsync(async (req, res) => {
  const result = await orderService.createOrderIntoDB(
    req.body,
    req.user as JwtPayload & { role: string; userEmail: string }
  );
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Order placed successfully",
  });
});

const getAllorder = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await orderService.getAllOrderFromDB(query);
  sendResponse(res, {
    data: result.results,
    statusCode: 200,
    success: true,
    message: "All Order is fetched successfully",
    meta: result.meta,
  });
});
const getPendingOrder = catchAsync(async (req, res) => {
  const result = await orderService.getAllPendingOrderFromDB();
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "All Pending Orders are fetched successfully",
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await orderService.updateOrderFromDB(id, status);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Order is updated successfully",
  });
});

const getUsersAllOrder = catchAsync(async (req, res) => {
  const query = req.query;
  const userData = req.user as JwtPayload & IAuthUserInfo;
  const result = await orderService.getUsersOrderFromDB(userData, query);
  sendResponse(res, {
    data: result.results,
    statusCode: 200,
    success: true,
    message: "User Orders are fetched successfully",
    meta: result.meta,
  });
});

const getUsersAllPendingOrder = catchAsync(async (req, res) => {
  const query = req.query;
  const userData = req.user as JwtPayload & IAuthUserInfo;
  const result = await orderService.getUsersPendingOrderFromDB(userData, query);
  sendResponse(res, {
    data: result.results,
    statusCode: 200,
    success: true,
    message: "User Pending Orders are fetched successfully",
    meta: result.meta,
  });
});

export const orderController = {
  orderProduct,
  getAllorder,
  getUsersAllOrder,
  getPendingOrder,
  updateOrder,
  getUsersAllPendingOrder,
};
