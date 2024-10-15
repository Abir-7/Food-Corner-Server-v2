import { Router } from "express";
import { itemController } from "./item.controller";

import { zodProductSchema, zodProductUpdateSchema } from "./item.zodValidation";
import validateRequest from "../../middlewares/zodValidator";
import { auth } from "../../middlewares/auth/auth";

const router = Router();
//role based route
router.post(
  "/add-item",
  auth("admin", "superAdmin"),
  validateRequest(zodProductSchema),
  itemController.createItem
);
router.patch(
  "/:id",
  auth("admin", "superAdmin"),
  validateRequest(zodProductUpdateSchema),
  itemController.updateItem
);
router.delete("/:id", auth("admin", "superAdmin"), itemController.deleteItem);

//public route

router.get("/", itemController.getAllItem);
router.get("/rating-based", itemController.ratingBasedItem);
router.get("/time-based", itemController.timeBasedItem);
router.get("/:id", itemController.getSingleItem);

export const productRouter = router;
