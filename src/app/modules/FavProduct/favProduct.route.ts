import { Router } from "express";
import { favProductController } from "./favProduct.controller";
import { auth } from "../../middlewares/auth/auth";
import validateRequest from "../../middlewares/zodValidator";
import { zodFavProductSchema } from "./favProduct.zodValidation";

const router = Router();

router.post(
  "/addFavProduct",
  auth("customer"),
  validateRequest(zodFavProductSchema),
  favProductController.addFavProduct
);
router.get("/", auth("customer"), favProductController.getUsersFavItem);

export const favProductRouter = router;
