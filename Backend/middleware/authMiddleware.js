import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Verify user token and attach user to request
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists and starts with "Bearer"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "دسترسی غیرمجاز: توکن وجود ندارد" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded ID (ensure user still exists)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "کاربر یافت نشد" });
    }

    req.user = user; // attach user object to request
    next();
  } catch (error) {
    console.error("❌ Token verification error:", error);
    return res.status(403).json({ message: "توکن نامعتبر است" });
  }
};

// ✅ Restrict route access to admins only
export const adminOnly = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "دسترسی فقط برای مدیر مجاز است" });
  }
  next();
};
