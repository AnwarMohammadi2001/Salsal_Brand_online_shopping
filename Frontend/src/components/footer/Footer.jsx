import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";


const Footer = () => {
  const icons = [FaFacebook, FaInstagram, FaTiktok, FaWhatsapp];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // success/error message

  const handleSubscribe = async () => {
    if (!email) return setStatus("لطفاً ایمیل خود را وارد کنید");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/newsletter/subscribe",
        { email }
      );
      setStatus("ایمیل شما با موفقیت ثبت شد!");
      setEmail("");
    } catch (error) {
      setStatus(error.response?.data?.message || "خطا در ثبت ایمیل");
    }
  };
  return (
    <div className="w-full h-auto  bg-stone-900 px-5 md:px-20">
      <div className=" lg:grid grid-cols-5 gap-6 md:px-20 py-6 space-y-3 lg:space-y-0 ">
        {/* About Section */}
        <div className="col-span-2 flex flex-col items-center  text-center">
          <h3 className="text-gray-200 text-2xl font-bold">صلصال برند</h3>
          <p className="text-justify text-sm mt-3 text-gray-300 leading-relaxed">
            ما در نمایشگاه لباس و خیاطی صلصال برند شاپینگ با عشق و دقت در تلاش
            هستیم تا شیک‌ترین و به‌روزترین لباس‌های افغانی را برای بانوان و
            دختران زیبای سرزمین‌مان فراهم کنیم؛ تا هر لحظه بدرخشید و خاص‌ترین
            استایل را تجربه کنید.
          </p>
        </div>
        {/* Logo Section */}
        <div className="flex items-center justify-center col-span-1">
          <img
            src="logo-light.png"
            alt="صلصال برند"
            className="h-28 w-auto object-contain"
          />
        </div>
        {/* Contact Section */}
        <div className="col-span-2 text-gray-200 flex flex-col items-center space-y-3">
          <div className="w-full max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-200 text-center mb-3">
              عضویت در خبرنامه
            </h3>
            <p className="text-sm text-gray-200 text-center mb-4">
              برای دریافت تازه‌ترین اخبار و محصولات ما، ایمیل خود را وارد کنید.
            </p>
            <div className="flex items-center gap-x-2 overflow-hidden shadow-md">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 border border-amber-500 text-gray-200 bg-transparent placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={handleSubscribe}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold transition-all"
              >
                اشتراک
              </button>
            </div>
            {status && <p className="text-sm mt-2 text-amber-400">{status}</p>}
          </div>
        </div>
        ;
      </div>
      <div className="lg:h-[230px] h-auto border-amber-500 flex flex-col items-center justify-center px-5 md:px-20 py-3">
        <div className="border border-gray-400 h-auto lg:h-[180px] w-full   px-4 py-2 rounded-md relative">
          <div className="absolute left-1/2 -translate-1/2 top-0 bg-stone-900 flex items-center gap-x-4 px-5">
            {icons.map((Icon, index) => (
              <div
                key={index}
                className="text-3xl  cursor-pointer text-gray-400 hover:text-gray-200"
              >
                <Icon />
              </div>
            ))}
          </div>
          <div className="lg:flex grid grid-cols-3 py-5 gap-5 items-center justify-between px-10 h-full">
            <div className="space-y-3 text-gray-300 hover:text-gray-100 text-sm flex flex-col">
              <Link to="/">صفحه اصلی</Link>
              <Link to="/product">محصولات</Link>
              <Link to="/aboutus">درباره ما</Link>
            </div>
            <div className="space-y-3 text-gray-300 hover:text-gray-100 text-sm flex flex-col">
              <Link to="/contactus">تماس با ما</Link>
              <Link to="/blog">وبلاگ</Link>
              <Link to="/">درباره ما</Link>
            </div>
            <div className="space-y-3 text-gray-300 hover:text-gray-100 text-sm flex flex-col">
              <Link to="/">گتگوری ها</Link>
              <Link to="/">قوانین ومقرارت</Link>
              <Link to="/">محصولات پر فروش</Link>
            </div>
            <div className="space-y-3 text-gray-300 hover:text-gray-100 text-sm flex flex-col">
              <Link to="/">محصولات جدید</Link>
              <Link to="/">وبلاگ</Link>
              <Link to="/">درباره ما</Link>
            </div>
            <div className="space-y-3 text-gray-300 hover:text-gray-100 text-sm flex flex-col">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-400" />
                <p className="text-sm"> کابل، افغانستان</p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400" />
                <p className="text-sm">+93774610613 - +93780177060</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400" />
                <p className="text-sm">maminhajizada@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center py-4">
        <p className="text-gray-400 text-sm">
          © ۲۰۲۵ <span className="font-semibold text-amber-400"></span>. طراحی
          شده توسط{" "}
          <Link target="_blank" to="https://tet-soft.com" className="">
            TET
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
