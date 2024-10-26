import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { newsletterService } from "./newsletter.service";

const saveNewsletter = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await newsletterService.saveNewsletterIntoDb({
    ...data,
    isDiscountApplied: false,
  });
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Successfull",
  });
});

const getNewsletterInfo = catchAsync(async (req, res) => {
  const data = req.user;
  const result = await newsletterService.getNewsletterFormDb(data?.userEmail);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Newsletter info fetched",
  });
});

export const newsletterController = {
  saveNewsletter,
  getNewsletterInfo,
};
