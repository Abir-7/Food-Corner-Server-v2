import { JwtPayload } from "jsonwebtoken";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import { IAuthUserInfo } from "../../interface/global.interface";
import { Customer } from "../Customers/custommer.model";

const createOrderIntoDB = async (data: IOrder) => {
  const result = await Order.create(data);
  return result;
};
const getAllOrderFromDB = async () => {
  const result = await Order.find()
    .populate({
      path: "customerId",
      select: "name contactNo email address ",
    })
    .populate({ path: "items.productId", select: "title price category" });
  return result;
};

const getUsersOrderFromDB = async (userdata: JwtPayload & IAuthUserInfo) => {
  const userEmail = userdata.userEmail;
  const customer = await Customer.findOne({ email: userEmail });
  const result = await Order.find({ customerId: customer?._id })
    .populate({
      path: "customerId",
      select: "name contactNo email address ",
    })
    .populate({ path: "items.productId", select: "title price category" });
  return result;
};

export const orderService = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getUsersOrderFromDB,
};
