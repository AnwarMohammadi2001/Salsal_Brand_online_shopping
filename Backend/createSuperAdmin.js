import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createSuperAdmin = async () => {
  try {
    // Connect to MongoDB using MONGO_URI from .env
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ isAdmin: true });
    if (existingAdmin) {
      console.log("⚠️ Super admin already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // Create new super admin
    const admin = new User({
      username: "SuperAdmin",
      email: "admin@salsal.com",
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();
    console.log("✅ Super admin created successfully!");
    console.log("📧 Email:", admin.email);
    console.log("🔑 Password: Admin@123");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating super admin:", error);
    process.exit(1);
  }
};

createSuperAdmin();
