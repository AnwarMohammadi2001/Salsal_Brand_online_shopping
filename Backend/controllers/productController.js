import Product from "../models/Product.js";

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
    const parsedAttributes = attributes
      ? typeof attributes === "string"
        ? JSON.parse(attributes)
        : attributes
      : [];

    // Handle images separately
    const frontImage = req.files.frontImage
      ? req.files.frontImage[0].path
      : null;
    const backImage = req.files.backImage ? req.files.backImage[0].path : null;
    const otherImages = req.files.otherImages
      ? req.files.otherImages.map((f) => f.path)
      : [];

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
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Parse attributes if necessary
    const parsedAttributes = req.body.attributes
      ? typeof req.body.attributes === "string"
        ? JSON.parse(req.body.attributes)
        : req.body.attributes
      : product.attributes;

    Object.assign(product, { ...req.body, attributes: parsedAttributes });

    // Update images if provided
    if (req.files) {
      if (req.files.frontImage)
        product.frontImage = req.files.frontImage[0].path;
      if (req.files.backImage) product.backImage = req.files.backImage[0].path;
      if (req.files.otherImages)
        product.otherImages = req.files.otherImages.map((f) => f.path);
    }

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.remove();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
