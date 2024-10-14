import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { contactUsService } from "./contact.service";

const saveMsg = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await contactUsService.saveMsgIntoDb(data);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Msg is sent to admin",
  });
});

const getAllMsg = catchAsync(async (req, res) => {
  const result = await contactUsService.getAllMsgIntoDb();
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Msg are fetched to admin",
  });
});

const replyMsg = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log(id, data, "id");
  const result = await contactUsService.replyMsgIntoDb(data, id);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Msg is sent to user",
  });
});

export const contactUsController = {
  saveMsg,
  getAllMsg,
  replyMsg,
};
