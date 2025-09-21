import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Logo */}
      <img src="logo.png" alt="All Sport Logo" className="h-16 mb-6" />

      {/* Heading */}
      {/* Heading */}
      <h2 className="text-lg font-bold text-center">ثبت نام در صلصال برند</h2>
      <p className="text-gray-600 text-sm mt-2 text-center max-w-sm">
        یک حساب کاربری برای تمامی برنامه‌ها، تا کارها برای شما آسان‌تر شود.
      </p>

      <form className="w-full max-w-sm mt-6 space-y-3 text-right" dir="rtl">
        {/* First Name */}
        <div className="relative">
          <input
            type="text"
            id="firstName"
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

        {/* Last Name */}
        <div className="relative">
          <input
            type="text"
            id="lastName"
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

        {/* Date of Birth */}
        {/* <div className="relative">
    <input
      type="date"
      id="dob"
      placeholder=" "
      className="peer w-full border-2 rounded-md px-4 py-4 text-gray-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
    />
    <label
      htmlFor="dob"
      className="absolute right-4 -top-3 bg-white px-2 text-gray-500 text-sm transition-all duration-300
             peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
             peer-focus:-top-3 peer-focus:bg-white peer-focus:px-2 peer-focus:text-sm peer-focus:text-black"
    >
      تاریخ تولد
    </label>
  </div> */}

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            id="email"
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
            id="password"
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

        {/* Checkbox */}
        <div className="flex items-start space-x-2 flex-row-reverse">
          <input
            type="checkbox"
            id="marketing"
            className="mt-1 w-4 h-4 border-gray-400 rounded"
          />
          <label htmlFor="marketing" className="text-sm text-gray-600">
            تیک بزنید تا ایمیل‌های مربوط به محصولات، برنامه‌ها، فروش‌ها و محتوای
            اختصاصی ما را دریافت کنید. قوانین را ببینید:{" "}
            <a href="#" className="text-black font-medium underline">
              حریم خصوصی
            </a>{" "}
            و{" "}
            <a href="#" className="text-black font-medium underline">
              اطلاعیه کالیفرنیا
            </a>
            .
          </label>
        </div>

        {/* Create Account Button */}
        <button
          type="submit"
          className="w-full bg-black cursor-pointer hover:scale-103 text-white font-bold py-3 rounded-full hover:bg-gray-900 transition-all duration-300"
        >
          ساخت حساب کاربری
        </button>
      </form>

      {/* Log in Link */}
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
