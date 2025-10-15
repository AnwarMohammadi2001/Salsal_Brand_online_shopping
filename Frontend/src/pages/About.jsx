import React from "react";
import { IoReaderOutline } from "react-icons/io5";
import ValuesSection from "../components/About/ValuesSection";
import CategoryList from "../components/category/CategoryList";
import NewestProduct from "../components/Product/NewestProduct";

const About = () => {
  const servicesData = [
    {
      title: "صنایع دستی اصیل",
      description:
        "ما مستقیماً با صنعتگران افغان همکاری می‌کنیم تا اطمینان حاصل کنیم که هر قطعه تکنیک‌های سنتی و عناصر طراحی اصیل را حفظ می‌کند.",
      icon: "🎨", // Creative / Handicraft
    },
    {
      title: "کیفیت برتر",
      description:
        "از انتخاب پارچه تا دوخت نهایی، ما بالاترین استانداردهای کیفیت را حفظ می‌کنیم تا لباس‌هایی ارائه دهیم که برای نسل‌ها باقی بمانند.",
      icon: "⭐", // Quality
    },
    {
      title: "افتخار فرهنگی",
      description:
        "ما به نمایش زیبایی فرهنگ افغانی و حمایت از جوامعی که این سنت‌ها را زنده نگه می‌دارند، افتخار می‌کنیم.",
      icon: "💝", // Cultural pride
    },
    {
      title: "خدمات مشتریان",
      description:
        "تیم ما همیشه آماده پاسخ‌گویی به نیازها و پیشنهادات شماست تا بهترین تجربه را برایتان فراهم کند.",
      icon: "🤝", // Customer support / service
    },
  ];

  return (
    <div className="min-h-screen ">
      {/* Mission Section */}
      <section className="py-16 md:flex max-w-7xl justify-between  mx-auto gap-2 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto t">
            <h2 className="text-3xl md:text-4xl flex  items-center gap-x-2 font-bold text-gray-800 mb-8 font-serif">
              {/* <img src="logo.png" alt="" className="h-10" /> */}
              <IoReaderOutline className="" size={28} />
              داستان ما
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              برند سلل از علاقه عمیق به میراث فرهنگی غنی افغانستان و اشتیاق برای
              حفظ صنایع دستی سنتی آن متولد شد. ما پلی بین ظرافت جاودان افغانی و
              احساسات مد معاصر ایجاد می‌کنیم.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              هر قطعه از مجموعه ما داستانی را روایت می‌کند - از صنعتگران ماهر،
              نسل‌های صنایع دستی و روح پر جنب و جوش فرهنگ افغانی. ما متعهد به
              ارائه لباس‌های افغانی اصیل و با کیفیت هستیم که سنت را جشن می‌گیرند
              و در عین حال سبک مدرن را در آغوش می‌گیرند.
            </p>
            <p className="text-lg text-gray-600 mt-2 leading-relaxed">
              هر قطعه از مجموعه ما داستانی را روایت می‌کند - از صنعتگران ماهر،
              نسل‌های صنایع دستی و روح پر جنب و جوش فرهنگ افغانی. ما متعهد به
              ارائه لباس‌های افغانی اصیل و با کیفیت هستیم که سنت را جشن می‌گیرند
              و در عین حال سبک مدرن را در آغوش می‌گیرند.
            </p>
            <p className="text-lg text-gray-600 mt-4 leading-relaxed">
              هر قطعه از مجموعه ما داستانی را روایت می‌کند - از صنعتگران ماهر،
              نسل‌های صنایع دستی و روح پر جنب و جوش فرهنگ افغانی. ما متعهد به
              ارائه لباس‌های افغانی اصیل و با کیفیت هستیم که سنت را جشن می‌گیرند
              و در عین حال سبک مدرن را در آغوش می‌گیرند.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-6">
          <div className=" ">
            <img src="about.jpg" alt="" className="h-[600px]" />
          </div>
        </div>
      </section>

      <div className="flex max-w-6xl mx-auto flex-col md:grid grid-cols-2">
        {servicesData.map((serivce, index) => (
          <ValuesSection service={serivce} index={index} key={index} />
        ))}
      </div>

      {/* Collection Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800  font-serif">
            مجموعه‌های ما
          </h2>
          <CategoryList />
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-10 max-w-6xl px-5 mx-auto">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-x-4 mb-5">
            <img src="logo.png" alt="" className="h-12" />
            <h2 className="text-3xl md:text-4xl font-bold  font-serif">
              تعهد ما
            </h2>
          </div>
          <p className="text-xl max-w-4xl mx-auto text-gray-700 leading-relaxed">
            در برند سلل، ما متعهد به ارائه نه تنها لباس، بلکه قطعاتی از میراث
            فرهنگی هستیم. هر لباس با دقت انتخاب می‌شود تا بهترین مد افغانی را به
            شما ارائه دهد و در عین حال از صنعتگران سنتی حمایت کند و سنت‌های
            فرهنگی زیبا را برای نسل‌های آینده حفظ نماید.
          </p>
        </div>
        <div className="mt-5">
          <img src="about1.jpg" alt="" className="w-full h-[300px] md:h-[450px] lg:h-[600px] rounded-xl" />
        </div>
      </section>
      <NewestProduct />
    </div>
  );
};

export default About;
