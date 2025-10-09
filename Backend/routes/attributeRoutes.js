import express from "express";
import {
  addAttribute,
  getAttributesByCategory,
  getAttribute,
  updateAttribute,
  deleteAttribute,
} from "../controllers/attributeController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// CRUD routes
router.post("/", protect, adminOnly, addAttribute); // Add
router.get(
  "/category/:categoryId",
  protect,
  adminOnly,
  getAttributesByCategory
); // Get by category
router.get("/:id", protect, adminOnly, getAttribute); // Get by ID
router.put("/:id", protect, adminOnly, updateAttribute); // Update
router.delete("/:id", protect, adminOnly, deleteAttribute); // Delete

export default router;
