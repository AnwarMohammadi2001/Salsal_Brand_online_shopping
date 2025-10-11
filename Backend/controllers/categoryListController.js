import Categprylist from "../models/Categprylist.js";
import Category from "../models/Category.js";
import fs from "fs";
import path from "path";

// ✅ Create new category list item
export const createCategoryList = async (req, res) => {
  try {
    const { category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newItem = new Categprylist({
      image: req.file.path,
      category,
    });

    await newItem.save();
    res
      .status(201)
      .json({ message: "Category list item created successfully", newItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all category list items
export const getCategoryLists = async (req, res) => {
  try {
    const items = await Categprylist.find().populate("category", "name");
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete category list item
export const deleteCategoryList = async (req, res) => {
  try {
    const item = await Categprylist.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (fs.existsSync(item.image)) fs.unlinkSync(item.image);
    await item.deleteOne();

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
