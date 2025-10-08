// src/components/DashboardTopBar.jsx
import React, { useState } from "react";
import { FaBell, FaUser, FaEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";

const DashboardTopBar = () => {
  // ✅ Get logged-in user from Redux state
  const { user } = useSelector((state) => state.auth);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 shadow-sm py-3 px-6 flex items-center justify-between transition-colors duration-300">
      {/* Left: Greeting */}
      <div className="flex items-center gap-3">
        <span className="text-gray-700 dark:text-gray-200 font-semibold">
          Hello, {user?.username || "User"}!
        </span>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-x-4">
        {/* Messages */}
        <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition">
          <FaEnvelope size={20} />
        </button>

        {/* User profile */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            <FaUser className="text-gray-600 dark:text-gray-300" />
          </div>
          <span className="hidden md:inline font-medium text-gray-700 dark:text-gray-200">
            {user?.username || "User"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopBar;
