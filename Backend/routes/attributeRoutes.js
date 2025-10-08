import express from "express";
import {
  addAttribute,
  getAttributesByCategory,
} from "../controllers/attributeController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, addAttribute);
router.get("/:categoryId", protect, adminOnly, getAttributesByCategory);

export default router;
