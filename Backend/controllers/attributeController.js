import Attribute from "../models/Attribute.js";

// ✅ Add a new attribute
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

// ✅ Get attributes by category
export const getAttributesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const attributes = await Attribute.find({ category: categoryId });
    res.status(200).json(attributes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get a single attribute by ID
export const getAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.findById(req.params.id);
    if (!attribute)
      return res.status(404).json({ message: "Attribute not found" });
    res.status(200).json(attribute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update attribute by ID
export const updateAttribute = async (req, res) => {
  try {
    const { name, type, required, category } = req.body;
    const attribute = await Attribute.findByIdAndUpdate(
      req.params.id,
      { name, type, required, category },
      { new: true, runValidators: true }
    );
    if (!attribute)
      return res.status(404).json({ message: "Attribute not found" });
    res.status(200).json(attribute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete attribute by ID
export const deleteAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.findById(req.params.id);
    if (!attribute)
      return res.status(404).json({ message: "Attribute not found" });
    await attribute.deleteOne();
    res.status(200).json({ message: "Attribute deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
