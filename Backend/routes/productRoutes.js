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

// POST route with multiple named image fields
router.post(
  "/",
  protect,
  adminOnly,
  upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 },
    { name: "otherImages", maxCount: 10 },
  ]),
  addProduct
);

// PUT route with multiple named image fields
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 },
    { name: "otherImages", maxCount: 10 },
  ]),
  updateProduct
);

router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
