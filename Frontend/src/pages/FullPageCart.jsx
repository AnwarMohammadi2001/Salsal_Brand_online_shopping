import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsPlus } from "react-icons/bs";
import { HiMinus } from "react-icons/hi2";
import { CiTrash } from "react-icons/ci";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/slices/wishlistSlice";

const FullPageCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { items: wishlist } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.priceAFN * item.quantity,
    0
  );

  const toggleWishlist = (item) => {
    if (!user) return alert("لطفاً ابتدا وارد حساب شوید.");
    const isInWishlist = wishlist.some((i) => i._id === item._id);
    if (isInWishlist) dispatch(removeFromWishlist(item._id));
    else dispatch(addToWishlist(item));
  };

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold mb-2">سبد خرید شما خالی است</h2>
        <p className="text-gray-500">هیچ محصولی در سبد خرید شما وجود ندارد</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-10">سبد خرید شما</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {cartItems.map((item) => {
            const FRONT_IMAGE_URL = `http://localhost:5000/${item.frontImage}`;
            const BACK_IMAGE_URL = item.backImage
              ? `http://localhost:5000/${item.backImage}`
              : FRONT_IMAGE_URL;
            const isInWishlist = wishlist.some((w) => w._id === item._id);

            return (
              <div
                key={item._id}
                className="flex justify-between items-center border-b border-gray-200 pb-4"
              >
                {/* Image & Info */}
                <div className="flex items-center gap-x-4">
                  <div className="w-20 h-24">
                    <img
                      src={FRONT_IMAGE_URL}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onMouseOver={(e) =>
                        (e.currentTarget.src = BACK_IMAGE_URL)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.src = FRONT_IMAGE_URL)
                      }
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    {item.attributes?.length > 0 && (
                      <ul className="flex gap-2 text-gray-500 text-sm">
                        {item.attributes.map((attr) => (
                          <li key={attr._id}>{attr.value}</li>
                        ))}
                      </ul>
                    )}
                    <p className="text-gray-600">{item.priceAFN} AF</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-3">
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="text-red-500"
                    >
                      <CiTrash size={20} />
                    </button>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="text-gray-500"
                    >
                      {isInWishlist ? "❤️" : "🤍"}
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      className="rounded border p-1"
                    >
                      <HiMinus size={18} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item._id))}
                      className="rounded border p-1"
                    >
                      <BsPlus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6 flex flex-col gap-6">
          <h2 className="text-xl font-semibold">خلاصه سفارش</h2>
          <div className="flex justify-between text-gray-700">
            <span>جمع جزء</span>
            <span>{totalPrice} AF</span>
          </div>

          <div className="flex justify-between font-bold text-lg border-t pt-3">
            <span>جمع کل</span>
            <span>{totalPrice} AF</span>
          </div>
          <button className="w-full bg-black text-white py-3 rounded-lg mt-4 hover:opacity-90 transition">
            ادامه خرید
          </button>
          <button
            onClick={() => dispatch(clearCart())}
            className="w-full border border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-50 transition"
          >
            حذف همه
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullPageCart;
