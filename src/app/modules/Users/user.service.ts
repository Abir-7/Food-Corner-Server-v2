import mongoose from "mongoose";
import { ICustomer } from "../Customers/customer.interface";
import { Customer } from "../Customers/custommer.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateId } from "./user.utils";
import { AppError } from "../../Errors/AppError";
import httpStatus from "http-status";
import { IAdmin } from "../Admin/admin.interface";
import { Admin } from "../Admin/admin.model";

const createCustomerIntoDb = async (data: ICustomer, password: string) => {
  const user: Partial<IUser> = {};

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    user.id = await generateId(); //create Id function
    user.email = data.email;
    user.password = password;
    const userData = await User.create([user], { session });

    if (!userData.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    data.user = userData[0]._id;
    data.id = userData[0].id;
    const result = await Customer.create([data], { session });

    if (!userData.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createAdminIntoDb = async (data: IAdmin, password: string) => {
  const user: Partial<IUser> = {};

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    user.id = "Admin" + "-" + (await generateId()); //create Id function
    user.email = data.email;
    user.password = password;
    const userData = await User.create([user], { session });

    if (!userData.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    data.user = userData[0]._id;
    data.id = userData[0].id;
    const result = await Admin.create([data], { session });

    if (!userData.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const userService = { createCustomerIntoDb, createAdminIntoDb };
