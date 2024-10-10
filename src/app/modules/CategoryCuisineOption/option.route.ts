import { Router } from "express";
import { optionController } from "./option.controller";
import { auth } from "../../middlewares/auth/auth";

const router = Router();

router.post("/add-category", auth("admin"), optionController.addCategory);
router.post("/add-cuisine", auth("admin"), optionController.addCuisine);
router.get("/category", optionController.getCategory);
router.get("/cuisine", optionController.getCuisine);
router.patch("/category/:id", auth("admin"), optionController.updateCategory);
router.patch("/cuisine/:id", auth("admin"), optionController.updateCuisine);

export const optionRouter = router;
