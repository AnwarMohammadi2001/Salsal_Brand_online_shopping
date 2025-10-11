import mongoose from "mongoose";

const categprylistSchema = new mongoose.Schema(
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

const Categprylist = mongoose.model("Categprylist", categprylistSchema);
export default Categprylist;
