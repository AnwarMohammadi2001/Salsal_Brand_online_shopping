import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();

// Enable CORS (frontend running separately)
app.use(
  cors({
    origin: "http://localhost:5173", // your React dev server
    credentials: true,
  })
);

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);


// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// No React build serving in dev, so remove the catch-all
// app.use(express.static(path.join(__dirname, "client", "build")));
// app.get("*", ...)

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
