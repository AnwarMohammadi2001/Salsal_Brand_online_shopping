import express from "express";
import User from "../models/User.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all users (Admin only)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.status(200).json(users); // must return an array
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// DELETE user by ID (Admin only)
// DELETE user by ID (admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // prevent deleting admin users (optional)
    if (user.isAdmin) {
      return res.status(403).json({ message: "Cannot delete admin users" });
    }

    await user.deleteOne(); // <-- correct method instead of remove
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
