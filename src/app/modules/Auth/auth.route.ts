import { Router } from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middlewares/zodValidator";
import { zodLoginValidationSchema } from "./auth.validation";

const router = Router();
router.post(
  "/login",
  validateRequest(zodLoginValidationSchema),
  authController.loginUser
);

export const authRouter = router;
