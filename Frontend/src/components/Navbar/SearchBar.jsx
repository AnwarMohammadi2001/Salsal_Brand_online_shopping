import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { PiHeartStraight } from "react-icons/pi";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchClick = () => setIsExpanded(true);
  const handleCancelClick = () => {
    setIsExpanded(false);
    setInputValue(""); // reset when closed
  };
  const handleClearInput = () => setInputValue("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      navigate("/"); // redirect to home (or search results page)
    }
    setIsExpanded(false);
  };

  const handleSuggestionClick = (term) => {
    setInputValue(term);
    navigate("/"); // redirect to home (or search results page)
    setIsExpanded(false);
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isExpanded]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsExpanded(false);
        setInputValue("");
      }
    };
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);
  // Popular Afghan and festive clothing
  const popularItems = [
    "لباس افغانی گند افغانی",
    "دامن کوتاه",
    "لباس عروس",
    "زیورات",
    "چپن افغانی",
    "بالا تنه",
  ];

  return (
    <div className={`relative  ${isExpanded ? "w-full " : ""}`}>
      {/* Compact Search Icon */}
      <div
        className="flex items-center gap-2 bg-gray-200  justify-start hover:bg-gray-300 rounded-full px-2 md:px-2 w-40 py-1.5 transition-all duration-300 cursor-pointer"
        onClick={handleSearchClick}
      >
        <FiSearch size={22} className="text-amber-500" />
        <span className="hidden md:block text-gray-500 text-sm truncate">
          جستجو...
        </span>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={modalRef}
            className="fixed top-0 left-0 right-0 px-8 pb-20 py-3 border-b bg-white w-full z-50"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="md:flex justify-between items-center bg-white border-gray-200 px-4">
              {/* Logo + Cancel (mobile) */}
              <div className="flex items-center justify-between gap-x-2 mb-3 md:mb-0">
                <div className="flex items-center gap-x-3">
                  <img src="/logo.png" alt="logo" className="w-8" />
                </div>
                <button
                  onClick={handleCancelClick}
                  className="md:hidden py-2 text-gray-800 font-semibold hover:text-gray-500 text-lg transition"
                >
                  لغو
                </button>
              </div>

              {/* Search Input */}
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center gap-2 hover:bg-gray-300 bg-gray-200 border rounded-full px-4 py-2 transition-all duration-300"
              >
                <FiSearch size={22} className="text-gray-500 hidden md:block" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="محصولات، برندها، یا دسته‌بندی‌ها را جستجو کنید..."
                  className="flex bg-transparent w-[800px] outline-none text-gray-800"
                  autoFocus
                />
                {inputValue && (
                  <button
                    type="button"
                    onClick={handleClearInput}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                  >
                    <X size={20} />
                  </button>
                )}
              </form>

              <button
                onClick={handleCancelClick}
                className="hidden md:block py-2 text-gray-800 font-semibold hover:text-gray-500 text-lg transition"
              >
                لغو
              </button>
            </div>

            {/* Popular Searches */}
            <div className="md:w-[850px] mx-auto mt-6">
              <h4 className="text-gray-500 text-md  p-4">جستجوهای پرطرفدار</h4>
              <ul className="flex items-center flex-wrap gap-4 mb-4 px-4">
                {popularItems.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(item)}
                    className="text-black text-base py-1.5 hover:bg-gray-300 px-5 rounded-full bg-gray-200 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
