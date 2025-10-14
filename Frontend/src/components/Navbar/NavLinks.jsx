import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { fetchProducts } from "../../redux/slices/productSlice";
import { links } from "../../assets/navlink";

const NavLinks = () => {
  const [hovered, setHovered] = useState("");
  const [delayedHovered, setDelayedHovered] = useState("");
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let timeout;
    if (hovered) setDelayedHovered(hovered);
    else timeout = setTimeout(() => setDelayedHovered(""), 200);
    return () => clearTimeout(timeout);
  }, [hovered]);

  // Only include categories that have at least 1 product
  const productsByCategory = categories
    ?.map((cat) => ({
      ...cat,
      products: products?.filter(
        (prod) => prod.category?._id === cat._id || prod.category === cat._id
      ),
    }))
    .filter((cat) => cat.products && cat.products.length > 0);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -15, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { duration: 0.35, ease: "easeInOut", staggerChildren: 0.08 },
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
          className="relative group"
          onMouseEnter={() => setHovered(link.name)}
          onMouseLeave={() => setHovered("")}
        >
          {/* Navigation item */}
          <h1
            className={`py-2 px-3 text-base cursor-pointer rounded-md transition-colors duration-200 
              ${
                hovered === link.name
                  ? "text-black"
                  : hovered
                  ? "text-gray-400"
                  : "text-gray-800 hover:text-black"
              }`}
          >
            {link.link ? <Link to={link.link}>{link.name}</Link> : link.name}
          </h1>

          {/* Dropdown / Mega Menu */}
          <AnimatePresence>
            {link.submenu && delayedHovered === link.name && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariants}
                className="absolute top-full left-0 -right-[170px] w-screen bg-white border-t border-gray-100 shadow-lg z-50"
              >
                <div className="max-w-7xl mx-auto p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
                  {productsByCategory?.length > 0 ? (
                    productsByCategory.map((cat, i) => (
                      <motion.div key={i} variants={itemVariants}>
                        <h1 className="text-base text-gray-900 mb-3 font-semibold">
                          {cat.nameFa || cat.name}
                        </h1>
                        <ul>
                          {cat.products.map((prod, j) => {
                            const FRONT_IMAGE_URL = `http://localhost:5000/${prod.frontImage}`;
                            return (
                              <motion.li
                                key={j}
                                variants={itemVariants}
                                className="text-sm text-gray-600 my-2 hover:text-black cursor-pointer"
                              >
                                <Link
                                  to={`/collections/${cat.slug}/${prod._id}`}
                                  className="flex items-center gap-x-2"
                                >
                                  <img src={FRONT_IMAGE_URL} alt="" className="h-10 w-10 rounded-full" />
                                  {prod.name}
                                </Link>
                              </motion.li>
                            );
                          })}
                        </ul>
                        <Link
                          to={`/collections/${cat.slug}`}
                          className="text-xs text-blue-500 mt-2 inline-block hover:underline"
                        >
                          دیدن همه محصولات
                        </Link>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      هیچ کتگوری یافت نشد.
                    </p>
                  )}
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
