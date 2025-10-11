import Slider from "../models/Slider.js";
import Category from "../models/Category.js";
import path from "path";
import fs from "fs";

// Create new slider image
export const createSlider = async (req, res) => {
  try {
    const { category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newSlider = new Slider({
      image: req.file.path,
      category,
    });

    await newSlider.save();
    res.status(201).json({ message: "Slider created successfully", newSlider });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sliders
export const getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find().populate("category", "name");
    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete slider
export const deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    if (!slider) return res.status(404).json({ message: "Slider not found" });

    if (fs.existsSync(slider.image)) fs.unlinkSync(slider.image);
    await slider.deleteOne();

    res.status(200).json({ message: "Slider deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
