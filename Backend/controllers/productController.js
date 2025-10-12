import Product from "../models/Product.js";
import path from "path";

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      priceAFN,
      priceUSD,
      stock,
      weight,
      material,
      details,
      sellerNote,
      attributes,
    } = req.body;

    // Parse attributes if they come as string
    const parsedAttributes =
      attributes && typeof attributes === "string"
        ? JSON.parse(attributes)
        : attributes || [];

    // Handle images
    const frontImage = req.files.frontImage
      ? req.files.frontImage[0].path.replace(/\\/g, "/")
      : null;

    const backImage = req.files.backImage
      ? req.files.backImage[0].path.replace(/\\/g, "/")
      : null;

    const otherImages = req.files.otherImages
      ? req.files.otherImages.map((f) => f.path.replace(/\\/g, "/"))
      : [];

    // Create new product
    const product = await Product.create({
      name,
      category,
      priceAFN,
      priceUSD,
      stock,
      weight,
      material,
      details,
      sellerNote,
      frontImage,
      backImage,
      otherImages,
      attributes: parsedAttributes,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all products
// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("attributes.attributeId"); // ✅ populate attribute names
    res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single product with populated category and attributes
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category") // populate category
      .populate("attributes.attributeId"); // populate attribute names

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error("Get Product By ID Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const parsedAttributes =
      req.body.attributes && typeof req.body.attributes === "string"
        ? JSON.parse(req.body.attributes)
        : req.body.attributes || product.attributes;

    Object.assign(product, { ...req.body, attributes: parsedAttributes });

    if (req.files) {
      if (req.files.frontImage)
        product.frontImage = req.files.frontImage[0].path.replace(/\\/g, "/");
      if (req.files.backImage)
        product.backImage = req.files.backImage[0].path.replace(/\\/g, "/");
      if (req.files.otherImages)
        product.otherImages = req.files.otherImages.map((f) =>
          f.path.replace(/\\/g, "/")
        );
    }

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};
