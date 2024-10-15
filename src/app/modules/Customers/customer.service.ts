import httpStatus from "http-status";
import { AppError } from "../../Errors/AppError";
import { ICustomerUpdate } from "./customer.interface";
import { Customer } from "./custommer.model";
import { IAuthUserInfo } from "../../interface/global.interface";
import { JwtPayload } from "jsonwebtoken";

const updateCustomerFromDB = async (
  userData: JwtPayload & IAuthUserInfo,
  data: Partial<ICustomerUpdate>
) => {
  const customerData = await Customer.isCustomerExist(userData?.userEmail);
  if (!customerData) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found to update");
  }

  const { name, ...remainingStudentData } = data;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Customer.findOneAndUpdate(
    { email: customerData?.email },
    modifiedUpdatedData,
    {
      new: true,
    }
  );
  return result;
};

export const customerService = {
  updateCustomerFromDB,
};
