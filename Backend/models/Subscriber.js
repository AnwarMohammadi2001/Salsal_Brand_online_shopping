// models/Subscriber.js
import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Subscriber", subscriberSchema);
