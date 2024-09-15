import { Router } from "express";
import { productController } from "./item.controller";

import { zodProductSchema, zodProductUpdateSchema } from "./item.zodValidation";
import validateRequest from "../../middlewares/zodValidator";
import { auth } from "../../middlewares/auth/auth";

const router = Router();
//role based route
router.post(
  "/add-item",
  auth("admin"),
  validateRequest(zodProductSchema),
  productController.createItem
);
router.patch(
  "/:id",
  auth("admin"),
  validateRequest(zodProductUpdateSchema),
  productController.updateItem
);
router.delete("/:id", auth("admin"), productController.deleteItem);

//public route
router.get("/:id", productController.getSingleItem);
router.get("/", productController.getAllItem);

export const productRouter = router;
