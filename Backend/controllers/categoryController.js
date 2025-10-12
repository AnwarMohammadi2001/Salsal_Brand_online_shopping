import Category from "../models/Category.js";

// Add Category
export const addCategory = async (req, res) => {
  try {
    const { nameEn, nameFa } = req.body;

    if (!nameEn || !nameFa)
      return res
        .status(400)
        .json({ message: "Both English and Dari names are required" });

    // Check if English name already exists
    const existing = await Category.findOne({ nameEn });
    if (existing)
      return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ nameEn, nameFa });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { nameEn, nameFa } = req.body;

    if (!nameEn || !nameFa)
      return res
        .status(400)
        .json({ message: "Both English and Dari names are required" });

    const updated = await Category.findByIdAndUpdate(
      id,
      { nameEn, nameFa },
      { new: true, runValidators: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
