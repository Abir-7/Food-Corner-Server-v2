import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { customerService } from "./customer.service";
import { IAuthUserInfo } from "../../interface/global.interface";

const updateCustomer = catchAsync(async (req, res) => {
  const userData = req.user as JwtPayload & IAuthUserInfo;
  const data = req.body;
  const result = await customerService.updateCustomerFromDB(userData, data);

  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "User updated Successfully",
  });
});

export const customerController = {
  updateCustomer,
};
