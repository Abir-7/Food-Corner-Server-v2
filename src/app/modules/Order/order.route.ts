import { Router } from "express";
import { orderController } from "./order.controller";
import { auth } from "../../middlewares/auth/auth";

const router = Router();

router.post("/make-payment", auth("customer"), orderController.orderProduct);

router.get("/myOrder", auth("customer"), orderController.getUsersAllOrder);

//admin route
router.get("/", auth("admin"), orderController.getAllorder);
router.get("/pending", auth("admin"), orderController.getPendingOrder);
router.patch("/:id", auth("admin"), orderController.updateOrder);

export const orderRouter = router;
