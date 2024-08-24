import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ratingService } from "./rating.service";
import { IAuthUserInfo } from "../../interface/global.interface";

const addRating = catchAsync(async (req, res) => {
  const data = req.body;
  const auth = req.user as JwtPayload & IAuthUserInfo;
  const result = await ratingService.addRatingIntoDb(data, auth);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Rating is added.",
  });
});

const allRating = catchAsync(async (req, res) => {
  const result = await ratingService.allRatingFromDb();
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Rating is added.",
  });
});

const userRating = catchAsync(async (req, res) => {
  const auth = req.user as JwtPayload & IAuthUserInfo;
  const result = await ratingService.userRatingFromDb(auth);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Rating is added.",
  });
});

export const ratingController = {
  addRating,
  allRating,
  userRating,
};
