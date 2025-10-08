import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MdDashboardCustomize,
  MdWork,
  MdPerson,
  MdInfo,
  MdMessage,
  MdBuild,
  MdLogout,
  MdShoppingCart,
  MdAddBox,
  MdViewList,
  MdCategory,
  MdImage,
} from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { logout } from "../../redux/slices/authSlice";

const Sidebar = ({ activeComponent, setActiveComponent }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // get current user from Redux

  const [isOpen, setIsOpen] = useState(true);

  // ✅ Immediate logout without confirmation
  const handleLogout = () => {
    dispatch(logout());
    setActiveComponent("dashboard"); // optionally reset active component
  };

  const allMenuItems = [
    // ---------------- Admin Menu ----------------
    {
      name: "داشبورد",
      value: "dashboard",
      icon: <MdDashboardCustomize />,
      adminOnly: true,
    },
    {
      name: "سفارشات",
      value: "orders",
      icon: <MdShoppingCart />,
      adminOnly: true,
    },
    {
      name: "مدیریت کاربران",
      value: "manageUsers",
      icon: <MdPerson />,
      adminOnly: true,
    },
    {
      name: "افزودن محصول",
      value: "addProduct",
      icon: <MdAddBox />,
      adminOnly: true,
    },
    {
      name: "لیست محصولات",
      value: "productList",
      icon: <MdViewList />,
      adminOnly: true,
    },
    {
      name: "افزودن دسته‌بندی",
      value: "addCategory",
      icon: <MdCategory />,
      adminOnly: true,
    },
    {
      name: "افزودن ویژگی‌ها",
      value: "addAttributes",
      icon: <MdBuild />,
      adminOnly: true,
    },
    {
      name: "مدیریت وب‌سایت",
      value: "website",
      icon: <MdImage />,
      adminOnly: true,
    },

    // ---------------- Normal User Menu ----------------
    {
      name: "پروفایل",
      value: "profile",
      icon: <MdPerson />,
      userOnly: true,
    },
    {
      name: "سفارشات من",
      value: "myOrders",
      icon: <MdShoppingCart />,
      userOnly: true,
    },
    {
      name: "خروج",
      value: "logout",
      icon: <MdLogout />,
    },
  ];

  const accessibleComponents = allMenuItems.filter((item) => {
    if (item.adminOnly && !user?.isAdmin) return false;
    if (item.userOnly && user?.isAdmin) return false;
    return true;
  });

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full z-30 transition-all duration-300 ease-in-out
          dark:bg-gray-900 dark:text-gray-200 bg-white shadow-md
          ${isOpen ? "w-64" : "w-0 lg:w-20"} 
          overflow-hidden`}
      >
        {/* Header */}
        <header className="flex items-center justify-between lg:justify-start gap-3 p-5">
          <div className="flex items-center justify-center p-2 bg-gray-300 h-10 w-10 rounded-full">
            <MdDashboardCustomize className="text-green-600 text-xl" />
          </div>
          <span
            className={`text-lg font-semibold text-blue-600 whitespace-nowrap ${
              isOpen ? "inline" : "hidden lg:inline"
            }`}
          >
            My Portfolio
          </span>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-red-500"
          >
            <FaTimes size={18} />
          </button>
        </header>

        {/* Sidebar Links */}
        <ul className="mx-2 space-y-1">
          {accessibleComponents.map((component, index) => (
            <li key={index} className="relative group cursor-pointer">
              <button
                onClick={() => {
                  if (component.value === "logout") handleLogout();
                  else setActiveComponent(component.value);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`flex items-center gap-x-3 w-full px-4 py-3 rounded-md transition-all duration-300
                  ${
                    activeComponent === component.value
                      ? "bg-gray-200 text-blue-600 dark:bg-gray-700 dark:text-blue-400 border-r-4 border-blue-600"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-gray-200"
                  }`}
              >
                <span className="text-xl">{component.icon}</span>
                <span
                  className={`text-base font-medium whitespace-nowrap ${
                    isOpen ? "inline" : "hidden lg:inline"
                  }`}
                >
                  {component.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle Button (Mobile Only) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 left-5 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg block lg:hidden"
        >
          <FaBars size={20} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
