import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await authService.userLogin(data);

  sendResponse(res, {
    data: { token: result },
    statusCode: 200,
    success: true,
    message: "User Login successfull",
  });
});

export const authController = { loginUser };
