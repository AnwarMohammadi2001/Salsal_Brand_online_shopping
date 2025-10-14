import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  // Update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login(formData));

    if (login.fulfilled.match(resultAction)) {
      const loggedUser = resultAction.payload.user;

 

      // ✅ Trigger global event to load cart for this user
      window.dispatchEvent(new Event("loadUserCart"));

      // Redirect based on role
      if (loggedUser.isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <img src="logo.png" alt="All Sport Logo" className="h-16 mb-6" />
      <h2 className="text-lg font-bold text-center">ورود به حساب کاربری</h2>
      <p className="text-gray-600 text-sm mt-2 text-center max-w-sm">
        لباس‌های مورد علاقه خود را خرید کنید، محصولات مورد علاقه خود را در لیست
        دلخواه ذخیره کنید، سفارش‌های خود را پیگیری کنید و با ما تمرین کنید.
      </p>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <form
        className="w-full max-w-sm mt-6 space-y-6"
        dir="rtl"
        onSubmit={handleSubmit}
      >
        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full border-2 rounded-md px-4 py-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
          />
          <label
            htmlFor="email"
            className="absolute right-4 -top-3 bg-white px-2 text-gray-500 text-sm transition-all duration-300
                       peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                       peer-focus:-top-3 peer-focus:bg-white peer-focus:px-2 peer-focus:text-sm peer-focus:text-black"
          >
            آدرس ایمیل*
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full border-2 rounded-md px-4 py-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
          />
          <label
            htmlFor="password"
            className="absolute right-4 -top-3 bg-white px-2 text-gray-500 text-sm transition-all duration-300
               peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
               peer-focus:-top-3 peer-focus:bg-white peer-focus:px-2 peer-focus:text-sm peer-focus:text-black"
          >
            رمز عبور*
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-5 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="text-right">
          <a
            href="#"
            className="text-sm text-black font-medium hover:underline"
          >
            فراموشی رمز عبور؟
          </a>
        </div>

        {/* Login button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white font-bold py-3 rounded-full hover:bg-gray-900 transition-all duration-300"
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-6">
        حساب کاربری ندارید؟{" "}
        <span
          onClick={() => navigate("/signup")}
          className="font-medium text-black hover:underline cursor-pointer"
        >
          ثبت نام
        </span>
      </p>
    </div>
  );
};

export default SignIn;
