import { JwtPayload } from "jsonwebtoken";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import { IAuthUserInfo } from "../../interface/global.interface";
import { Customer } from "../Customers/custommer.model";
import { initiatePayment } from "./payment/payment.utils";

const createOrderIntoDB = async (
  orderData: Partial<IOrder>,
  userData: JwtPayload & { role: string; userEmail: string }
) => {
  const customerData = await Customer.findOne({ email: userData.userEmail });

  const txn = `TXN-${Date.now()}${userData.userEmail}`;
  console.log("kk");
  const result = await Order.create({
    ...orderData,
    customerId: customerData?._id,
    transectionId: txn,
  });

  const paymentInfo = await initiatePayment({
    orderData: result.total,
    txn,
    customerData,
    orderId: result._id,
  });

  return { ...result, payLink: paymentInfo.data.payment_url };
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
