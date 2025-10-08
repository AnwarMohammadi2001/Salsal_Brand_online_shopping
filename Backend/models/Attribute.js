import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["text", "number", "checkbox", "date"],
      required: true,
    },
    required: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Attribute", attributeSchema);
