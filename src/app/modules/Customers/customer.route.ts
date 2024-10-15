import { Router } from "express";

import { customerController } from "./customer.controller";
import { auth } from "../../middlewares/auth/auth";
import validateRequest from "../../middlewares/zodValidator";
import { customerUpdateSchema } from "./customer.zodValidation";

const router = Router();

router.patch(
  "/update-me",
  auth("customer"),
  validateRequest(customerUpdateSchema),
  customerController.updateCustomer
);

export const customerRoute = router;
