import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa";

const ads = [
  "🔥 فقط همین آخر هفته: ۲۰٪ تخفیف روی همه لباس‌ها!",
  "🎉 ارسال رایگان برای سفارش‌های بالای ۵۰۰۰ افغانی",
  "⚡ لباس‌های جدید تازه وارد شدند! همین حالا خرید کنید",
  "💥 فروش ویژه — تا ۷۰٪ تخفیف روی لباس‌ها",
];

const TopHeader = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, 10000); // change every 3s

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className=" text-gray-800 text-xs relative bg-gray-100 py-0.5 overflow-hidden ">
      <div className=" flex items-center justify-between   px-6">
        {/* Slider */}
        {/* Slider */}
        <div className="relative flex-1 h-10  flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute w-full text-center font-medium"
            >
              {ads[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pause/Play Button */}
        <button
          onClick={() => setIsPaused((prev) => !prev)}
          className="ml-4 w-10 text-black hover:text-gray-300 transition-colors"
        >
          {isPaused ? <FaPlay size={14} /> : <FaPause size={14} />}
        </button>
      </div>
    </div>
  );
};

export default TopHeader;
