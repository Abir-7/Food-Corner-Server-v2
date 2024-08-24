import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/zodValidator";

import { zodCustomerSchema } from "../Customers/customer.zodValidation";
import { zodAdminSchema } from "../Admin/admin.zodValidation";

const router = Router();

router.post(
  "/create-customer",
  validateRequest(zodCustomerSchema),
  userController.createCustomer
);
router.post(
  "/create-admin",
  validateRequest(zodAdminSchema),
  userController.createAdmin
);
export const userRouter = router;
