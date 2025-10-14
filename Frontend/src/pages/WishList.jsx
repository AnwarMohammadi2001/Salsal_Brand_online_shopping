import React from "react";
import { Heart, Trash2, LogIn, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/slices/wishlistSlice";
import MainProductCart from "../components/Card/MainProductCart";

const WishList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check user login
  const user = JSON.parse(localStorage.getItem("user"));

  // Get wishlist items from Redux
  const { items: wishItems } = useSelector((state) => state.wishlist);

  // 🩶 If user is NOT logged in
  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <div className="bg-white shadow rounded-2xl p-10  w-full">
          <Heart className="mx-auto text-black mb-4" size={50} />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            لطفاً اول وارد حساب کاربری شوید
          </h2>
          <p className="text-gray-500 mb-6">
            برای دیدن لیست علاقه‌مندی‌ها، وارد حساب شوید یا ثبت‌نام کنید.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate("/signin")}
              className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
            >
              <LogIn size={18} />
              ورود
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 border border-black text-black px-5 py-2 rounded-full hover:bg-black hover:text-white transition"
            >
              <UserPlus size={18} />
              ثبت‌نام
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🩷 If user IS logged in
  return (
    <div className="min-h-[70vh] bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex items-center justify-between pb-5 ">
          <h1 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Heart className="text-black" />
            لیست علاقه‌مندی‌ها شما
          </h1>
          <Link to="/">Home</Link>
        </div>

        {/* If wishlist empty */}
        {wishItems.length === 0 ? (
          <div className="bg-white   p-10 text-center text-gray-500">
            <Heart className="mx-auto text-black mb-3" size={40} />
            <p className="text-lg">لیست علاقه‌مندی‌های شما خالی است</p>
            <p className="text-sm mt-2 text-gray-400">
              برای افزودن محصولات، روی ❤️ در صفحه محصولات کلیک کنید.
            </p>
          </div>
        ) : (
          // Cards
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishItems.map((product) => (
              <MainProductCart product={product} key={product._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
