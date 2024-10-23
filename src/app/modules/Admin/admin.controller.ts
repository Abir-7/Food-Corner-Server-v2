import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminService } from "./admin.service";

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await adminService.getAllAdminFromDb();
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "All admin are fetched Successfully",
  });
});

const blockAdmin = catchAsync(async (req, res) => {
  const authEmail = req?.user?.userEmail;
  const { id } = req.params;

  const result = await adminService.blockAdminFromDb(id, authEmail);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Admin has been blocked",
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const authEmail = req?.user?.userEmail;
  const { id } = req.params;

  const result = await adminService.deleteAdminFromDb(id, authEmail);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Admin has been dleted",
  });
});

export const adminController = {
  getAllAdmin,
  blockAdmin,
  deleteAdmin,
};
