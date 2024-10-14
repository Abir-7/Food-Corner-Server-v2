import { Router } from "express";
import { contactUsController } from "./contact.controller";

const router = Router();
router.post("/save-msg", contactUsController.saveMsg);
router.get("/get-all-msg", contactUsController.getAllMsg);

router.patch("/reply-msg/:id", contactUsController.replyMsg);

export const contactRouter = router;
