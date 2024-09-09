import { Router } from "express";
import { productRouter } from "../modules/MenuItem/item.route";
import { userRouter } from "../modules/Users/user.route";
import { authRouter } from "../modules/Auth/auth.route";
import { customerRoute } from "../modules/Customers/customer.route";
import { orderRouter } from "../modules/Order/order.route";
import { favProductRouter } from "../modules/FavProduct/favProduct.route";
import { ratingRouter } from "../modules/Rating/rating.route";

const router = Router();

const moduleRoutes = [
  { path: "/menu-item", route: productRouter },
  { path: "/user", route: userRouter },
  { path: "/customer", route: customerRoute },
  { path: "/auth", route: authRouter },
  { path: "/payment", route: orderRouter },
  { path: "/favProduct", route: favProductRouter },
  { path: "/user-rating", route: ratingRouter },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
