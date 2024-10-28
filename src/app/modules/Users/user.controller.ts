import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import { IAuthUserInfo } from "../../interface/global.interface";
import { User } from "./user.model";

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

const verifyEmail = catchAsync(async (req, res) => {
  const { token } = req.query;
  console.log(token, "gg");
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    console.log(user, "in");
    return res.status(400).send(`
 <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color:#fe3e3e ; /* Red background */
        margin: 0;
      }
      .container {
        text-align: center;
        background-color:#ffffff; /* Slightly lighter red for contrast */
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        max-width: 500px;
      }
      h1 {
        color: #ff2f2f; /* White text for contrast */
      }
      p {
        color: #ff2f2f; /* White text for contrast */
      }
      .button {
        display: inline-block;
        margin-top: 15px;
        padding: 10px 20px;
        background-color: #ff2f2f; /* Darker red for button */
        color: #ffffff; /* White text color */
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Verification Failed</h1>
      <p>Token Not Matched!!</p>
      <a href="https://food-corner-v2.netlify.app" class="button">Return to Homepage</a>
    </div>
  </body>
</html>

    `);
  }

  await User.findOneAndUpdate(
    { verificationToken: token },
    { isVerified: true, verificationToken: "" },
    { new: true }
  );

  return res.status(200).send(`
    <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background-color: #ff8235; }
            .container { text-align: center; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); max-width: 400px; }
            h1 { color: #ff8235; }
            p { color:  #ff8235; }
            .button { display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #ff8235; color: #ffffff; text-decoration: none; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Email Verified Successfully!</h1>
            <p>Your email has been verified. You can now log in to your account.</p>
            <a href="https://food-corner-v2.netlify.app/user-login" class="button">Go to Login</a>
          </div>
        </body>
      </html>
  `);
});

export const userController = {
  createCustomer,
  createAdmin,
  getUserInfo,
  verifyEmail,
};
