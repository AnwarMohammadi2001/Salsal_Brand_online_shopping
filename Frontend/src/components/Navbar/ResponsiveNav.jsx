import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown, IoClose } from "react-icons/io5";
import { PiHeartStraight } from "react-icons/pi";
import { links } from "../../assets/navlink";

const ResponsiveNav = ({ setOpens }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeTab, setActiveTab] = useState(links[0]?.name || "");

  const toggleMenu = (name) => {
    setActiveMenu(activeMenu === name ? null : name);
  };

  // Accordion container animation
  const accordionVariants = {
    hidden: { height: 0, opacity: 0, y: -8 },
    visible: {
      height: "auto",
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeInOut" },
    },
    exit: {
      height: 0,
      opacity: 0,
      y: -8,
      transition: { duration: 0.25, ease: "easeInOut" },
    },
  };

  // Parent UL for staggered children
  const containerVariants = {
    hidden: {
      opacity: 1,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  // Each LI
  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Top bar */}
      <div className="flex justify-between items-center px-4 py-4 border-b">
        <button onClick={() => setOpens(false)}>
          <IoClose size={28} className="text-gray-700" />
        </button>
        <button>
          <PiHeartStraight size={26} className="text-gray-700" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <input
          type="text"
          placeholder="What are you looking for today?"
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-300 mx-3 gap-x-2">
        {links.map((tab) => (
          <button
            key={tab.name}
            onClick={() => {
              setActiveTab(tab.name);
              setActiveMenu(null);
            }}
            className={`text-center cursor-pointer py-3 font-medium px-4 ${
              activeTab === tab.name
                ? "border-b-2 border-black text-black"
                : "text-gray-600"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Accordions */}
      <div className="px-4 py-2">
        {links
          .find((l) => l.name === activeTab)
          ?.sublinks.map((category) => (
            <div key={category.Head} className="border-b border-gray-200">
              <button
                onClick={() => toggleMenu(category.Head)}
                className="flex justify-between items-center w-full py-3 text-base font-medium text-gray-800 hover:text-black"
              >
                {category.Head}
                <IoChevronDown
                  className={`transform transition-transform ${
                    activeMenu === category.Head ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* AnimatePresence for accordion */}
              <AnimatePresence>
                {activeMenu === category.Head && (
                  <motion.div
                    key={category.Head}
                    variants={accordionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="pl-4 pb-3 overflow-hidden"
                  >
                    <motion.ul
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      {category.sublink.map((slink) => (
                        <motion.li
                          key={slink.name}
                          variants={itemVariants}
                          className="py-2 text-sm text-gray-600 hover:text-black"
                        >
                          <Link to={slink.link}>{slink.name}</Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ResponsiveNav;
