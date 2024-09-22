import { JwtPayload } from "jsonwebtoken";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import { IAuthUserInfo } from "../../interface/global.interface";
import { Customer } from "../Customers/custommer.model";
import { initiatePayment } from "./payment/payment.utils";
import { AppError } from "../../Errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";

const createOrderIntoDB = async (
  orderData: Partial<IOrder>,
  userData: JwtPayload & { role: string; userEmail: string }
) => {
  const customerData = await Customer.findOne({ email: userData.userEmail });

  const txn = `TXN-${Date.now()}${userData.userEmail}`;

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
const getAllOrderFromDB = async (queryParams: Record<string, unknown>) => {
  const modelQuery = Order.find() // Create the base query for Order
    .populate({
      path: "customerId",
      select: "name contactNo email address",
    })
    .populate({
      path: "items.productId",
      select: "title price category photo",
    });
  const results = await new QueryBuilder(modelQuery, queryParams)
    .search(["transectionId"]) // Replace with searchable fields
    .filter()
    .priceRange() // If applicable
    .sort()
    .paginate()
    .fields()
    .modelQuery.exec();

  return results;
};
const getAllPendingOrderFromDB = async () => {
  const result = await Order.find({
    deliveryStatus: { $ne: "delivered" },
  })
    .sort({ createdAt: -1 })
    .populate({
      path: "customerId",
      select: "name contactNo email address ",
    })
    .populate({
      path: "items.productId",
      select: "title price category photo ",
    });

  return result;
};

const updateOrderFromDB = async (id: string, status: string) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }

  const { deliveryStatus } = order;

  if (deliveryStatus === status) {
    throw new AppError(httpStatus.BAD_REQUEST, `Status is already ${status}`);
  }

  if (
    deliveryStatus === "delivered" &&
    (status === "onGoing" || status === "pending")
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "Status is already delivered.");
  }

  if (deliveryStatus === "pending" && status === "delivered") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Status cannot be updated to delivered directly"
    );
  }

  if (deliveryStatus === "onGoing" && status === "pending") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Status cannot be updated to pending from onGoing"
    );
  }

  const result = await Order.findByIdAndUpdate(
    id,
    { deliveryStatus: status },
    { new: true } // To return the updated document
  );

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
  getAllPendingOrderFromDB,
  updateOrderFromDB,
};
