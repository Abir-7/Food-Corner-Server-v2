import { Router } from "express";
import { ratingController } from "./rating.controller";
import { auth } from "../../middlewares/auth/auth";

const router = Router();
router.post("/add-rating", auth("customer"), ratingController.addRating);

router.get("/", auth("customer", "admin"), ratingController.allRating);
router.get("/my-review", auth("customer"), ratingController.userRating);

export const ratingRouter = router;
