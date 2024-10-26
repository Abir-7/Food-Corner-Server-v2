import { Router } from "express";
import { auth } from "../../middlewares/auth/auth";
import { newsletterController } from "./newsletter.controller";

const router = Router();
router.post(
  "/save-subcription",
  auth("customer"),
  newsletterController.saveNewsletter
);
router.get(
  "/getInfo",
  auth("customer"),
  newsletterController.getNewsletterInfo
);
export const newsLetterRouter = router;
