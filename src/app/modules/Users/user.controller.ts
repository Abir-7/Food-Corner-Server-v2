import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import { IAuthUserInfo } from "../../interface/global.interface";

const createCustomer = catchAsync(async (req, res) => {
  const { password, customer } = req.body;
  const result = await userService.createCustomerIntoDb(customer, password);

  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "User Created Successfully",
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body;
  const authData = req.user as JwtPayload & { userEmail: string; role: string };
  const result = await userService.createAdminIntoDb(admin, password, authData);

  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Admin Created Successfully",
  });
});

const getUserInfo = catchAsync(async (req, res) => {
  const userData = req.user as JwtPayload & IAuthUserInfo;

  const result = await userService.getUserInfoFromDb(userData);

  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Customer info is fetched successfully",
  });
});

export const userController = {
  createCustomer,
  createAdmin,
  getUserInfo,
};
