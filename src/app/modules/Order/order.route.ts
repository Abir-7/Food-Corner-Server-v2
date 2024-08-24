import { Router } from "express";
import { orderController } from "./order.controller";
import { auth } from "../../middlewares/auth/auth";

const router = Router();

router.post("/make-payment", orderController.orderProduct);
router.get("/", orderController.getAllorder);
router.get("/myOrder", auth("customer"), orderController.getUsersAllOrder);
export const orderRouter = router;
