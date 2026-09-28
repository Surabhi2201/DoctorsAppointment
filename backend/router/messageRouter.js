import express from "express";

import {
  getAllMessages,
  markMessageAsRead,
  sendMessage,
} from "../controller/messageController.js";

import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", sendMessage);

router.get(
  "/getall",
  isAdminAuthenticated,
  getAllMessages
);

router.put(
  "/:id/read",
  isAdminAuthenticated,
  markMessageAsRead
);

export default router;