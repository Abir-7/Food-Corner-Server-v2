import { Router } from "express";
import { optionController } from "./option.controller";
import { auth } from "../../middlewares/auth/auth";

const router = Router();

router.post(
  "/add-category",
  auth("admin", "superAdmin"),
  optionController.addCategory
);
router.post(
  "/add-cuisine",
  auth("admin", "superAdmin"),
  optionController.addCuisine
);
router.get("/category", optionController.getCategory);
router.get("/cuisine", optionController.getCuisine);
router.patch(
  "/category/:id",
  auth("admin", "superAdmin"),
  optionController.updateCategory
);
router.patch(
  "/cuisine/:id",
  auth("admin", "superAdmin"),
  optionController.updateCuisine
);

export const optionRouter = router;
