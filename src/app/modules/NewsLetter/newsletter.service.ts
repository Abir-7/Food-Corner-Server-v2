import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";
import { NewsLetter } from "./newsletter.model";

const saveNewsletterIntoDb = async (data: {
  userEmail: string;
  isDiscountApplied: boolean;
}) => {
  const isAlreadyApplied = await NewsLetter.findOne({
    userEmail: data.userEmail,
  });
  if (isAlreadyApplied) {
    throw new AppError(httpStatus.BAD_REQUEST, "You have allready subcribed");
  }
  const result = await NewsLetter.create(data);
  return result;
};

const getNewsletterFormDb = async (userEmail: string) => {
  const result = await NewsLetter.findOne({ userEmail: userEmail });
  return result;
};
export const newsletterService = {
  saveNewsletterIntoDb,
  getNewsletterFormDb,
};
