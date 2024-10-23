import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/zodValidator";

import { zodCustomerSchema } from "../Customers/customer.zodValidation";
import { zodAdminSchema } from "../Admin/admin.zodValidation";
import { auth } from "../../middlewares/auth/auth";

const router = Router();

router.post(
  "/create-customer",
  validateRequest(zodCustomerSchema),
  userController.createCustomer
);
router.post(
  "/create-admin",
  validateRequest(zodAdminSchema),
  auth("superAdmin"),
  userController.createAdmin
);

router.get("/me", auth("customer", "admin"), userController.getUserInfo);

export const userRouter = router;
