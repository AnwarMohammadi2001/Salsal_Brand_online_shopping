import express from "express";
import {
  addCategory,
  getCategories,
} from "../controllers/categoryController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, addCategory);
router.get("/", protect, adminOnly, getCategories);

export default router;
