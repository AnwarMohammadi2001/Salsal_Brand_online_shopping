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
</div>;