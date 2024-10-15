import { Router } from "express";
import { ratingController } from "./rating.controller";
import { auth } from "../../middlewares/auth/auth";

const router = Router();
router.post("/add-rating", auth("customer"), ratingController.addRating);
router.post("/add-rating-us", auth("customer"), ratingController.addRatingUs);
router.get("/rating-us", ratingController.getAllRatingUs);
router.get(
  "/",
  auth("customer", "admin", "superAdmin"),
  ratingController.allRating
);
router.get("/my-review", auth("customer"), ratingController.userRating);

export const ratingRouter = router;
