import { Router } from "express";
import { auth } from "../../middlewares/auth/auth";
import { dashboardInfoAdmin, dashboardInfoUser } from "./dashboard.controller";

const router = Router();
router.get(
  "/admin-dashboard-info",
  auth("admin", "superAdmin"),
  dashboardInfoAdmin
);
router.get("/user-dashboard-info", auth("customer"), dashboardInfoUser);
export const dashboardRouter = router;
