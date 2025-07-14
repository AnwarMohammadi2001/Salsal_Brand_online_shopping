import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { FaBell, FaEnvelope, FaSearch } from "react-icons/fa";

const DashboardPage = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [isFocused, setIsFocused] = useState(false);

  const notificationsCount = 3;
  const messagesCount = 5;

  const user = {
    name: "M Anwar",
    image: "https://i.pravatar.cc/40?img=3",
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />

      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-gray-100 shadow-sm">
          {/* Search Box */}
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3 text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              aria-label="Search"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`transition-all duration-300 ease-in-out bg-white border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none
                ${isFocused ? "w-52" : "w-10"} pl-10 py-1`}
            />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Notification Icon */}
            <div className="relative cursor-pointer" aria-label="Notifications">
              <FaBell className="text-gray-600 text-xl" />
              {notificationsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {notificationsCount}
                </span>
              )}
            </div>

            {/* Messages Icon */}
            <div className="relative cursor-pointer" aria-label="Messages">
              <FaEnvelope className="text-gray-600 text-xl" />
              {messagesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {messagesCount}
                </span>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={user.image}
                alt="User profile"
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
                onError={(e) => (e.target.src = "/default-avatar.png")}
              />
              <span className="font-semibold text-gray-600">{user.name}</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <MainContent
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
          />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
