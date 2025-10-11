import express from "express";
import {
  addSubscriber,
  sendMessageToSubscribers,
  getSubscribers,
} from "../controllers/newsletterController.js";

const router = express.Router();

// Add subscriber
router.post("/subscribe", addSubscriber);

// Get all subscribers (for dashboard)
router.get("/", getSubscribers);

// Send message to all subscribers
router.post("/send", sendMessageToSubscribers);

export default router;
