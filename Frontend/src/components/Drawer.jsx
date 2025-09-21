import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa"; // Shopping bag icon

const Drawer = ({ isDrawerOpens, setIsDrawerOpens }) => {
  useEffect(() => {
    if (isDrawerOpens) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isDrawerOpens]);

  return (
    <AnimatePresence>
      {isDrawerOpens && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsDrawerOpens(false)}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 z-50 h-full w-96 bg-white shadow-lg p-6 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-مل font-bold">سبد خرید </h2>
              <button onClick={() => setIsDrawerOpens(false)}>
                <IoClose size={26} className="text-amber-400" />
              </button>
            </div>

            {/* Empty Bag UI */}
            <div className="flex flex-col items-center justify-center flex-1 text-center space-y-4">
              <FaShoppingBag size={80} className="text-gray-500 mt-10" />
              <h3 className="text-lg font-semibold">سبد خرید شما خالی است</h3>
              <p className="text-sm text-gray-500">
                هیچ محصولی در سبد خرید شما وجود ندارد
              </p>

              <div className="space-y-3 w-full px-6">
                <button className="w-full bg-black text-white font-semibold py-3 rounded-full hover:opacity-90 transition">
                  خرید گند افغانی
                </button>
                <button className="w-full bg-black text-white font-semibold py-3 rounded-full hover:opacity-90 transition">
                  خرید لباس زنانه
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
