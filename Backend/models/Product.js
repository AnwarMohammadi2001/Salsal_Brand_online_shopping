import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    priceAFN: { type: Number, required: true },
    priceUSD: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    weight: { type: String },
    material: { type: String },
    details: { type: String },
    sellerNote: { type: String },
    images: [{ type: String }], // مسیر فایل‌ها
    attributes: [
      {
        attributeId: { type: mongoose.Schema.Types.ObjectId, ref: "Attribute" },
        value: { type: mongoose.Schema.Types.Mixed },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
