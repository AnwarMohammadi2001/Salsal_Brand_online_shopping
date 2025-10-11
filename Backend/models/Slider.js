import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Slider = mongoose.model("Slider", sliderSchema);
export default Slider;
