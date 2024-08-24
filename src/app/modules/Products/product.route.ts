import { Router } from "express";
import { productController } from "./product.controller";

import {
  zodProductSchema,
  zodProductUpdateSchema,
} from "./product.zodValidation";
import validateRequest from "../../middlewares/zodValidator";
//import { auth } from "../../middlewares/auth/auth";

const router = Router();

router.post(
  "/add-product",
  //auth("admin"),
  validateRequest(zodProductSchema),
  productController.createProduct
);
router.patch(
  "/:id",
  //auth("admin"),
  validateRequest(zodProductUpdateSchema),
  productController.updateProduct
);

router.delete(
  "/:id",
  //auth("admin"),
  productController.deleteProduct
);

router.get(
  "/:id",
  //auth("admin"),
  productController.getSingleProduct
);

router.get("/", productController.getAllProduct);

export const productRouter = router;
