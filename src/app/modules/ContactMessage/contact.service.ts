import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";
import { sendMail } from "../../utils/nodeMailer";
import { ContactUs } from "./contact.model";

const saveMsgIntoDb = async (data: { email: string; message: string }) => {
  const result = await ContactUs.create(data);
  return result;
};

const getAllMsgIntoDb = async () => {
  const result = await ContactUs.find({ isReplied: false });
  return result;
};

const replyMsgIntoDb = async (data: { repliedMsg: string }, id: string) => {
  const userEmail = await ContactUs.findOne({ _id: id });
  if (!userEmail) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Email Not Found");
  }
  const result = await ContactUs.findByIdAndUpdate(
    { _id: id },
    { ...data, isReplied: true },
    { new: true }
  );
  await sendMail({
    subject: userEmail?.message,
    text: data?.repliedMsg,
    to: userEmail?.email,
    html: "",
  });
  return result;
};

export const contactUsService = {
  saveMsgIntoDb,
  getAllMsgIntoDb,
  replyMsgIntoDb,
};
