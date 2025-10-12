import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    nameEn: { type: String, required: true, unique: true },
    nameFa: { type: String, required: true },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

// Auto-generate slug from English name
categorySchema.pre("save", function (next) {
  if (this.isModified("nameEn")) {
    this.slug = slugify(this.nameEn, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("Category", categorySchema);
