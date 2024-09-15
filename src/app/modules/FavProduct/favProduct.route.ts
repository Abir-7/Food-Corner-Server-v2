import { Router } from "express";
import { favProductController } from "./favProduct.controller";
import { auth } from "../../middlewares/auth/auth";
import validateRequest from "../../middlewares/zodValidator";
import { zodFavProductSchema } from "./favProduct.zodValidation";

const router = Router();
//role base route
router.post(
  "/add-fav-Product",
  auth("customer"),
  validateRequest(zodFavProductSchema),
  favProductController.addFavProduct
);
router.get("/", auth("customer"), favProductController.getUsersFavItem);
router.delete("/:id", auth("customer"), favProductController.removeFavItem);

export const favProductRouter = router;
