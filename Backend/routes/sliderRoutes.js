import express from "express";
import multer from "multer";
import {
  createSlider,
  getSliders,
  deleteSlider,
} from "../controllers/sliderController.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/slider");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createSlider);
router.get("/", getSliders);
router.delete("/:id", deleteSlider);

export default router;
