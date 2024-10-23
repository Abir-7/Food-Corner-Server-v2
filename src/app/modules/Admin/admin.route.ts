import { Router } from "express";
import { auth } from "../../middlewares/auth/auth";
import { adminController } from "./admin.controller";

const router = Router();
router.get("/all-admin", auth("superAdmin"), adminController.getAllAdmin);
router.patch(
  "/block-admin/:id",
  auth("superAdmin"),
  adminController.blockAdmin
);
router.patch(
  "/delete-admin/:id",
  auth("superAdmin"),
  adminController.deleteAdmin
);

export const adminRouter = router;
