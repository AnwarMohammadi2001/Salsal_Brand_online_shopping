// Simplified Sidebar.js (Without Redux or Role Handling)
import React, { useState } from "react";
import { FaBoxOpen, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaBuilding } from "react-icons/fa6";
import { MdDashboardCustomize, MdLocalLaundryService } from "react-icons/md";
import { LucideUserRoundPlus } from "lucide-react";

const Sidebar = ({ setActiveComponent }) => {
  const [selectedC, setSelectedC] = useState("home");
  const [activeC, setActiveC] = useState("home");

  const AllComponents = [
    {
      name: "Home",
      value: "home",
      icon: <MdDashboardCustomize className="text-green-500" />,
    },
    {
      name: "Category Management",
      value: "category",
      icon: <LucideUserRoundPlus className="text-blue-500" />,
    },
    {
      name: "Attribute Management",
      value: "attribute",
      icon: <FaBuilding className="text-blue-500" />,
    },
    {
      name: "New Product",
      value: "products",
      icon: <MdLocalLaundryService className="text-blue-500" />,
    },
    {
      name: "Products",
      value: "productlist",
      icon: <FaBuilding className="text-blue-500" />,
    },
    {
      name: "Order Management",
      value: "orders",
      icon: <FaBoxOpen className="text-purple-500" />,
    },
    {
      name: "Profile",
      value: "profile",
      icon: <FaUser className="text-blue-500" />,
    },
  ];

  return (
    <div className="h-full w-64 bg-white transition-all duration-300 ease-in-out">
      <header className="flex items-center gap-5 p-5 font-bold text-xl">
        <Link
          to="/"
          className="flex items-center justify-center p-1 bg-gray-300 h-10 w-10 rounded-full"
        >
          <FaUser className="text-[#7209b7]" size={24} />
        </Link>
        <Link to="/" className="text-lg font-semibold text-[#7209b7]">
          CHIQ FRIP
        </Link>
      </header>

      <ul className="mx-2">
        {AllComponents.map((component, index) => (
          <li
            key={index}
            className="relative group cursor-pointer"
            onClick={() => {
              setActiveComponent(component.value);
              setSelectedC(component.value);
              setActiveC(component.value);
            }}
            onMouseEnter={() => setActiveC(component.value)}
            onMouseLeave={() => setActiveC(selectedC)}
          >
            <div
              className={`relative flex items-center gap-x-3 w-full px-4 py-3 rounded-md transition-all duration-300
              ${
                activeC === component.value
                  ? "bg-gray-200 text-primary"
                  : "hover:bg-gray-200 text-black"
              }`}
            >
              <span className="text-xl">{component.icon}</span>
              <span className="text-base font-semibold whitespace-nowrap">
                {component.name}
              </span>
            </div>

            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {component.name}
              <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-gray-800"></div>
            </div>
          </li>
        ))}

        {/* Logout */}
        <li className="relative group cursor-pointer">
          <Link
            to="/sign-in"
            className="relative flex items-center w-full gap-x-3 px-4 py-3 rounded-md transition-all duration-300 hover:bg-gray-200 text-black"
          >
            <span className="text-xl">
              <FaSignOutAlt className="text-rose-500" />
            </span>
            <span className="text-base font-semibold whitespace-nowrap">
              Logout
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
