import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/authSlice";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    marketing: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(register(formData));
    if (register.fulfilled.match(resultAction)) {
      navigate("/signin"); // Redirect to login after successful signup
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h2 className="text-lg font-bold text-center">ثبت نام در صلصال برند</h2>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <form
        className="w-full max-w-sm mt-6 space-y-3 text-right"
        dir="rtl"
        onSubmit={handleSubmit}
      >
        <div className="relative">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full border-2 rounded-md px-4 py-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
          />
          <label
            htmlFor="firstName"
            className="absolute right-4 -top-3 bg-white px-2 text-gray-500 text-sm transition-all duration-300
             peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
             peer-focus:-top-3 peer-focus:bg-white peer-focus:px-2 peer-focus:text-sm peer-focus:text-black"
          >
            نام
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full border-2 rounded-md px-4 py-4 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
          />
          <label
            htmlFor="lastName"
            className="absolute right-4 -top-3 bg-white px-2 text-gray-500 text-sm transition-all duration-300
             peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
             peer-focus:-top-3 peer-focus:bg-white peer-focus:px-2 peer-focus:text-sm peer-focus:text-black"
          >
            نام خانوادگی
          </label>
        </div>

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

        <div className="flex items-start space-x-2 flex-row-reverse">
          <input
            type="checkbox"
            name="marketing"
            checked={formData.marketing}
            onChange={handleChange}
            className="mt-1 w-4 h-4 border-gray-400 rounded"
          />
          <label htmlFor="marketing" className="text-sm text-gray-600">
            دریافت ایمیل‌های اختصاصی
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black cursor-pointer hover:scale-103 text-white font-bold py-3 rounded-full hover:bg-gray-900 transition-all duration-300"
        >
          {loading ? "در حال ثبت نام..." : "ساخت حساب کاربری"}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-6">
        قبلاً حساب داری؟{" "}
        <span
          onClick={() => navigate("/signin")}
          className="font-medium text-black hover:underline cursor-pointer"
        >
          ورود به حساب
        </span>
      </p>
    </div>
  );
};

export default SignUp;
