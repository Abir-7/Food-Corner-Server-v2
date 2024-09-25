import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  adminDashboardInfoFromDB,
  userDashboardInfoFromDB,
} from "./dashboard.service";

export const dashboardInfoAdmin = catchAsync(async (req, res) => {
  const result = await adminDashboardInfoFromDB();
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Dashboard Info are fetched successfully",
  });
});

export const dashboardInfoUser = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await userDashboardInfoFromDB(
    user as JwtPayload & { userEmail: string; role: string }
  );
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Dashboard Info are fetched successfully",
  });
});
