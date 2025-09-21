import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "../../assets/navlink";

const NavLinks = () => {
  const [hovered, setHovered] = useState("");
  const [delayedHovered, setDelayedHovered] = useState("");

  useEffect(() => {
    let timeout;
    if (hovered) {
      setDelayedHovered(hovered);
    } else {
      timeout = setTimeout(() => setDelayedHovered(""), 200);
    }
    return () => clearTimeout(timeout);
  }, [hovered]);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -15, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.35,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
    exit: { opacity: 0, y: -15, height: 0, transition: { duration: 0.25 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  return (
    <>
      {links.map((link) => (
        <div
          key={link.name}
          className="group"
          onMouseEnter={() => setHovered(link.name)}
          onMouseLeave={() => setHovered("")}
        >
          {/* Top nav item */}
          <h1
            className={`py-2 px-2  text-base transition-colors cursor-pointer relative rounded-md 
              ${
                hovered === link.name
                  ? "text-black"
                  : hovered
                  ? "text-gray-400"
                  : "text-gray-800 hover:text-black"
              }`}
          >
            {link.name}
            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </h1>

          {/* Mega Menu */}
          <AnimatePresence>
            {link.submenu && delayedHovered === link.name && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariants}
                className="absolute top-full -right-16  w-screen bg-white border-gray-200 z-50"
              >
                <div className="p-8 grid grid-cols-5 gap-10 max-w-7xl mx-auto">
                  {link.sublinks.map((mysublinks, i) => (
                    <motion.div key={i} variants={itemVariants}>
                      <h1 className="text-base  text-gray-900 mb-3">
                        {mysublinks.Head}
                      </h1>
                      <ul>
                        {mysublinks.sublink.map((slink, j) => (
                          <motion.li
                            key={j}
                            variants={itemVariants}
                            className="text-sm text-gray-600 my-2 hover:text-black cursor-pointer"
                          >
                            <Link to={slink.link}>{slink.name}</Link>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
};

export default NavLinks;
