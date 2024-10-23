import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";
import { User } from "../Users/user.model";
import { Admin } from "./admin.model";

const getAllAdminFromDb = async () => {
  const result = await Admin.find().populate({
    path: "user",
  });

  return result;
};

const blockAdminFromDb = async (id: string, authEmail: string) => {
  const isSuperAdmin = await User.findOne({ email: authEmail });

  if (isSuperAdmin?.role !== "superAdmin") {
    throw new AppError(httpStatus.BAD_REQUEST, "You are not super admin.");
  }

  const isUserExist = await User.findOne({ _id: id });

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { isBlocked: !isUserExist.isBlocked },
    { new: true }
  );

  return updatedUser;
};

const deleteAdminFromDb = async (id: string, authEmail: string) => {
  const isSuperAdmin = await User.findOne({ email: authEmail });

  if (isSuperAdmin?.role !== "superAdmin") {
    throw new AppError(httpStatus.BAD_REQUEST, "You are not super admin.");
  }

  const isUserExist = await User.findOne({ _id: id });

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { isDeleted: !isUserExist.isDeleted },
    { new: true }
  );

  return updatedUser;
};

export const adminService = {
  getAllAdminFromDb,
  blockAdminFromDb,
  deleteAdminFromDb,
};
