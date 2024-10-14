import { Router } from "express";
import { productRouter } from "../modules/MenuItem/item.route";
import { userRouter } from "../modules/Users/user.route";
import { authRouter } from "../modules/Auth/auth.route";
import { customerRoute } from "../modules/Customers/customer.route";
import { orderRouter } from "../modules/Order/order.route";
import { favProductRouter } from "../modules/FavProduct/favProduct.route";
import { ratingRouter } from "../modules/Rating/rating.route";
import { paymentRouter } from "../modules/Order/payment/payment.route";
import { dashboardRouter } from "../modules/DashboardInfo/dashboard.route";
import { optionRouter } from "../modules/CategoryCuisineOption/option.route";
import { contactRouter } from "../modules/ContactMessage/contact.route";

const router = Router();

const moduleRoutes = [
  { path: "/menu-item", route: productRouter },
  { path: "/user", route: userRouter },
  { path: "/customer", route: customerRoute },
  { path: "/auth", route: authRouter },
  { path: "/order", route: orderRouter },
  { path: "/payment", route: paymentRouter },
  { path: "/favProduct", route: favProductRouter },
  { path: "/user-rating", route: ratingRouter },
  { path: "/dashboard", route: dashboardRouter },
  { path: "/option", route: optionRouter },
  { path: "/message", route: contactRouter },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
