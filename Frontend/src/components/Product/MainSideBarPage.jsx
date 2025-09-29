// MainSideBarPage.jsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PriceSlider from "./PriceSlider";

const USD_TO_AFN = 70; // نرخ تبدیل ۱ دالر = ۷۰ افغانی

const MainSideBarPage = () => {
  const [openFilter, setOpenFilter] = useState("category");

  // State for AFN & USD sliders
  const [afnRange, setAfnRange] = useState([0, 1000]);
  const [usdRange, setUsdRange] = useState([0, Math.floor(1000 / USD_TO_AFN)]);

  const filters = [
    {
      key: "category",
      title: "دسته‌بندی",
      options: ["مانتو", "پیراهن", "شلوار", "کفش"],
      type: "checkbox",
    },
    {
      key: "color",
      title: "رنگ",
      options: ["red", "blue", "green", "black", "white"],
      type: "color",
    },
    {
      key: "size",
      title: "سایز",
      options: ["S", "M", "L", "XL"],
      type: "button",
    },
    {
      key: "new",
      title: "جدیدترین",
      options: ["فقط جدیدترین"],
      type: "checkbox",
    },
    {
      key: "mostSales",
      title: "پرفروش‌ترین",
      options: ["فقط پرفروش‌ترین"],
      type: "checkbox",
    },
  ];

  const toggleFilter = (key) => {
    setOpenFilter(openFilter === key ? null : key);
  };

  // Handle AFN change
  const handleAfnChange = (values) => {
    setAfnRange(values);
    setUsdRange([
      Math.floor(values[0] / USD_TO_AFN),
      Math.floor(values[1] / USD_TO_AFN),
    ]);
  };

  // Handle USD change
  const handleUsdChange = (values) => {
    setUsdRange(values);
    setAfnRange([values[0] * USD_TO_AFN, values[1] * USD_TO_AFN]);
  };

  return (
    <aside className="bg-white ">
      <div className="flex items-center justify-between py-2 px-2"></div>
      <div className=" border-gray-200 h-fit w-full space-y-2 p-4 rounded-md">
        {/* قیمت - همیشه باز */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="font-semibold text-gray-800 mb-3">قیمت</h3>
          {/* قیمت به افغانی */}
          <PriceSlider
            min={0}
            max={1000}
            values={afnRange}
            onChange={handleAfnChange}
            label="بر اساس افغانی"
            unit="؋"
          />

          {/* قیمت به دالر */}
          <PriceSlider
            min={0}
            max={100}
            values={usdRange}
            onChange={handleUsdChange}
            label="بر اساس دالر"
            unit="$"
          />
        </div>

        {filters.map((filter) => (
          <div key={filter.key} className="border-b border-gray-200 pb-2">
            {/* Header */}
            <button
              onClick={() => toggleFilter(filter.key)}
              className="w-full flex justify-between items-center py-2 text-right font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              {filter.title}
              {openFilter === filter.key ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {/* Body */}
            <AnimatePresence>
              {openFilter === filter.key && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 space-y-2">
                    {filter.type === "checkbox" &&
                      filter.options?.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-blue-500 transition-colors"
                        >
                          <input type="checkbox" className="accent-blue-600" />
                          {option}
                        </label>
                      ))}

                    {filter.type === "color" && (
                      <ul className="flex flex-wrap gap-2">
                        {filter.options.map((color) => (
                          <li
                            key={color}
                            className="w-6 h-6 rounded-full border cursor-pointer"
                            style={{ backgroundColor: color }}
                          ></li>
                        ))}
                      </ul>
                    )}

                    {filter.type === "button" && (
                      <div className="flex flex-wrap gap-2">
                        {filter.options.map((size) => (
                          <span
                            key={size}
                            className="px-3 py-1 border rounded-md cursor-pointer hover:bg-blue-50"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default MainSideBarPage;
