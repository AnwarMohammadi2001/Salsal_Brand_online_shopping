import express from "express";
import multer from "multer";
import {
  createCategoryList,
  getCategoryLists,
  deleteCategoryList,
} from "../controllers/categoryListController.js";

const router = express.Router();

// ✅ Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categoryList/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        "-" +
        file.originalname
    );
  },
});

const upload = multer({ storage });

// ✅ Routes
router.post("/", upload.single("image"), createCategoryList);
router.get("/", getCategoryLists);
router.delete("/:id", deleteCategoryList);

export default router;
