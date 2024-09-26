import { JwtPayload } from "jsonwebtoken";
import { Order } from "../Order/order.model";
import { User } from "../Users/user.model";
import { Customer } from "../Customers/custommer.model";

export const adminDashboardInfoFromDB = async () => {
  const currentDate = new Date();
  const sixMonthsAgo = new Date(currentDate);
  sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

  const topItem = await Order.aggregate([
    {
      $match: {
        // Match orders created in the last 6 months
        createdAt: {
          $gte: sixMonthsAgo,
          $lte: currentDate,
        },
      },
    },
    { $unwind: "$items" }, // Deconstruct the items array
    {
      $group: {
        _id: "$items.productId", // Group by productId
        totalQuantity: { $sum: "$items.quantity" }, // Sum the quantities for each product
      },
    },
    { $sort: { totalQuantity: -1 } }, // Sort by totalQuantity in descending order
    { $limit: 3 }, // Limit to top 3 items
    {
      $lookup: {
        from: "products", // Name of the product collection
        localField: "_id", // Field from the previous pipeline stage (productId)
        foreignField: "_id", // Field in the product collection to match
        as: "productInfo", // The field name for the joined data
      },
    },
    {
      $unwind: "$productInfo", // Unwind the productInfo array to get a single document
    },
    {
      $project: {
        _id: 1,
        totalQuantity: 1,
        title: "$productInfo.title", // Include the product title in the result
      },
    },
  ]);
  // monthly income

  const currentYear = new Date().getFullYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const result = await Order.aggregate([
    {
      $match: {
        deliveryStatus: "delivered",
        createdAt: {
          $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
          $lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        monthlyIncome: { $sum: "$total.subTotal" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const monthlyIncome = result.map((item) => ({
    month: monthNames[item._id - 1], // Convert month number to month name
    monthlyIncome: item.monthlyIncome,
  }));

  const allOrderCount = await Order.countDocuments({});
  const pendingOrderCount = await Order.countDocuments({
    deliveryStatus: { $ne: "delivered" },
    isCancel: false,
  });

  //today total delivary
  const startOfDay = new Date(new Date().setUTCHours(0, 0, 0, 0));
  const endOfDay = new Date(new Date().setUTCHours(23, 59, 59, 999));

  const todayDeliveryOrderCount = await Order.countDocuments({
    deliveryStatus: "delivered",
    createdAt: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  });

  //total user
  const totalUser = await User.countDocuments({
    role: "customer",
    isBlocked: false,
  });
  return {
    topItem,
    monthlyIncome,
    allOrderCount,
    pendingOrderCount,
    todayDeliveryOrderCount,
    totalUser,
  };
};

export const userDashboardInfoFromDB = async (
  user: JwtPayload & { userEmail: string; role: string }
) => {
  // Fetch user data from the database
  const userData = await Customer.findOne({ email: user.userEmail }).lean();

  if (!userData) {
    throw new Error("User not found");
  }

  const userId = userData._id;

  // Fetch data in parallel to optimize queries
  const [pendingOrderCount, totalOrders, presentOrders, lastOrders] =
    await Promise.all([
      // Count pending orders
      Order.countDocuments({
        customerId: userId,
        deliveryStatus: { $ne: "delivered" },
      }),

      // Count total orders
      Order.countDocuments({
        customerId: userId,
      }),

      //find present order that was not delivered
      Order.find({
        customerId: userId,
        deliveryStatus: { $ne: "delivered" },
      })
        .sort("-createdAt")
        .populate({
          path: "items.productId",
          select: "title photo",
        })
        .lean(),

      //last order that is delivered
      Order.findOne({
        deliveryStatus: "delivered",
        customerId: userId,
      })
        .populate({
          path: "items.productId",
          select: "title photo",
        })
        .sort("-createdAt")
        .lean(),
    ]);

  return {
    pendingOrderCount,
    totalOrders,
    presentOrders,
    lastOrders,
  };
};
