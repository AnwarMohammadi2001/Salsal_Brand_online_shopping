import React, { useState } from "react";
import { CreditCard, Wallet, Banknote, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { createPayment } from "../state/checkoutSlice/checkoutSlice";

const PaymentMethodPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);

  const paymentMethods = [
    {
      id: "cash",
      title: "پرداخت نقدی هنگام تحویل",
      description: "شما می‌توانید مبلغ را هنگام تحویل کالا پرداخت کنید.",
      icon: <Banknote className="w-6 h-6 text-green-600" />,
    },
    {
      id: "wallet",
      title: "پرداخت با کیف پول الکترونیکی",
      description: "در حال حاضر، این گزینه فقط برای کاربران خاص فعال است.",
      icon: <Wallet className="w-6 h-6 text-blue-600" />,
    },
    {
      id: "card",
      title: "پرداخت آنلاین با کارت بانکی",
      description: "به‌زودی این گزینه در افغانستان فعال خواهد شد.",
      icon: <CreditCard className="w-6 h-6 text-indigo-600" />,
    },
  ];

  const handleContinue = async () => {
    if (!selectedMethod) {
      toast.error("لطفاً یک روش پرداخت را انتخاب کنید.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(createPayment({ method: selectedMethod })).unwrap();
      toast.success("روش پرداخت انتخاب شد!");
      navigate("/order-confirmation");
    } catch (error) {
      toast.error("مشکلی رخ داد، لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left Side Info */}
      <div className="lg:w-1/2 bg-white p-8 lg:p-12 hidden lg:flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            انتخاب روش پرداخت 💳
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            لطفاً روش پرداخت دلخواه خود را انتخاب کنید. در حال حاضر پرداخت نقدی
            هنگام تحویل (COD) فعال است، سایر روش‌ها به‌زودی اضافه می‌شوند.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm">
            <li>پرداخت نقدی: بدون نیاز به کارت یا حساب بانکی</li>
            <li>پرداخت آنلاین: سریع و مطمئن (به‌زودی فعال می‌شود)</li>
            <li>پرداخت از طریق کیف پول: برای کاربران ثبت‌نام‌شده خاص</li>
          </ul>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white lg:bg-gray-50">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            روش پرداخت خود را انتخاب کنید
          </h1>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedMethod(method.id)}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition ${
                  selectedMethod === method.id
                    ? "border-black bg-gray-100"
                    : "border-gray-300 bg-white hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  {method.icon}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {method.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {method.description}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    selectedMethod === method.id
                      ? "border-black bg-black"
                      : "border-gray-400"
                  }`}
                ></div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:opacity-90 transition flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                در حال پردازش...
              </>
            ) : (
              "ادامه خرید"
            )}
          </button>

          <div className="mt-6 text-center">
            <Link
              to="/shipping"
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium inline-flex items-center"
            >
              <ArrowLeft className="h-4 w-4 ml-1" />
              بازگشت به آدرس ارسال
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodPage;
