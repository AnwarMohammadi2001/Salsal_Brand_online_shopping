import Attribute from "../models/Attribute.js";

export const addAttribute = async (req, res) => {
  try {
    const { category, name, type, required } = req.body;
    const attribute = await Attribute.create({
      category,
      name,
      type,
      required,
    });
    res.status(201).json(attribute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttributesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const attributes = await Attribute.find({ category: categoryId });
    res.status(200).json(attributes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
