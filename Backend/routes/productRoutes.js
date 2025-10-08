import express from "express";
import multer from "multer";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer setup for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, adminOnly, upload.array("images", 5), addProduct);
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.array("images", 5),
  updateProduct
);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
