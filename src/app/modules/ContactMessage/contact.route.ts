import { Router } from "express";
import { contactUsController } from "./contact.controller";
import { auth } from "../../middlewares/auth/auth";

const router = Router();
router.post("/save-msg", contactUsController.saveMsg);
router.get(
  "/get-all-msg",
  auth("admin", "superAdmin"),
  contactUsController.getAllMsg
);

router.patch(
  "/reply-msg/:id",
  auth("admin", "superAdmin"),
  contactUsController.replyMsg
);

export const contactRouter = router;
