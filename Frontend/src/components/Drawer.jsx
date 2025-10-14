import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingBag } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { HiMinus } from "react-icons/hi2";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/slices/cartSlice";

const Drawer = ({ isDrawerOpens, setIsDrawerOpens }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  React.useEffect(() => {
    if (isDrawerOpens) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isDrawerOpens]);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.priceAFN * item.quantity,
    0
  );

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
            className="fixed top-0 right-0 z-50 h-full w-[450px] bg-white shadow-lg p-6 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-bold">سبد خرید</h2>
              <button onClick={() => setIsDrawerOpens(false)}>
                <IoClose size={26} className="" />
              </button>
            </div>

            {/* Cart Items */}
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 text-center space-y-4">
                <FaShoppingBag size={80} className="text-gray-500 mt-10" />
                <h3 className="text-lg font-semibold">سبد خرید شما خالی است</h3>
                <p className="text-sm text-gray-500">
                  هیچ محصولی در سبد خرید شما وجود ندارد
                </p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col gap-4 overflow-y-auto mt-4">
                {cartItems.map((item) => {
                  const FRONT_IMAGE_URL = `http://localhost:5000/${item.frontImage}`;
                  const BACK_IMAGE_URL = item.backImage
                    ? `http://localhost:5000/${item.backImage}`
                    : FRONT_IMAGE_URL;

                  return (
                    <div
                      key={item._id}
                      className="flex justify-between  gap-x-5 border-b border-gray-200 pb-2"
                    >
                      {/* Product Image */}
                      <div className="flex items-center gap-x-4">
                        <div className="w-16 h-20">
                          <img
                            src={FRONT_IMAGE_URL}
                            alt={item.name}
                            className="w-full h-full object-cover "
                            onMouseOver={(e) =>
                              (e.currentTarget.src = BACK_IMAGE_URL)
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.src = FRONT_IMAGE_URL)
                            }
                          />
                        </div>

                        {/* Product Info */}
                        <div className=" ml-3">
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          <div>
                            {item.attributes && item.attributes.length > 0 && (
                              <div className="">
                                <ul className="flex items-center gap-x-2 text-gray-500">
                                  {item.attributes.map((attr) => (
                                    <li key={attr._id}>{attr.value}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {item.priceAFN} AF
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col justify-between items-end">
                        <div className="flex items-center   gap-x-4">
                          <button
                            onClick={() => dispatch(removeFromCart(item._id))}
                            className=" text-red-500 rounded cursor-pointer"
                          >
                            <CiTrash size={20} />
                          </button>
                          <button className="cursor-pointer">
                            <IoMdHeartEmpty
                              size={20}
                              className="text-gray-500"
                            />
                          </button>
                        </div>
                        <div className="flex items-center  text-gray-600 gap-x-4">
                          <button
                            onClick={() => dispatch(decreaseQuantity(item._id))}
                            className=" rounded cursor-pointer"
                          >
                            <HiMinus size={20} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => dispatch(increaseQuantity(item._id))}
                            className=" rounded cursor-pointer"
                          >
                            <BsPlus size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="mt-auto border-t pt-4 spayce-y-4">
                <div className="flex justify-between items-center pb-5 ">
                  <p className="flex items-center gap-x-2  ">
                    <span className="font-semibold text-lg">مجموع</span>:{" "}
                    <span className="text-gray-500 text-sm">
                      {totalPrice} AF
                    </span>
                  </p>
                  <button
                    onClick={() => dispatch(clearCart())}
                    className="flex items-center gap-x-2 text-red-500 rounded cursor-pointer"
                  >
                    <span>حذف همه </span> :
                    <CiTrash size={20} />
                  </button>
                </div>
                <button className="w-full bg-black text-white font-semibold py-3 rounded-full hover:opacity-90 transition">
                  ادامه خرید
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
