// ProductMainPage.jsx
import React from "react";
import MainSideBarPage from "./MainSideBarPage";
import Breadcrumb from "../Breadcrumb";
import MainProductCart from "../Card/MainProductCart";

const ProductMainPage = () => {
  const products = [
    {
      id: 1,
      name: "لباس افغانی گند افغانی",
      category: "لباس افغانی",
      image1: "prod/img1.jpeg",
      image2: "prod/img2.jpeg",
      price_afn: "3500 افغانی",
      price_usd: "$40",
    },
    {
      id: 2,
      name: "دامن کوتاه",
      category: "لباس زنانه",
      image1: "prod/img2.jpeg",
      image2: "prod/img1.jpeg",
      price_afn: "1800 افغانی",
      price_usd: "$20",
    },
    {
      id: 3,
      name: "لباس عروس",
      category: "لباس رسمی",
      image1: "prod/img3.jpeg",
      image2: "prod/img4.jpeg",
      price_afn: "15000 افغانی",
      price_usd: "$170",
    },
    {
      id: 4,
      name: "زیورات",
      category: "اکسسوری",
      image1: "prod/img4.jpeg",
      image2: "prod/img3.jpeg",
      price_afn: "5000 افغانی",
      price_usd: "$55",
    },
    {
      id: 5,
      name: "چپن افغانی",
      category: "لباس سنتی",
      image1: "prod/img5.jpeg",
      image2: "prod/img6.jpg",
      price_afn: "4000 افغانی",
      price_usd: "$45",
    },
    {
      id: 6,
      name: "بالا تنه",
      category: "لباس مردانه",
      image1: "prod/img6.jpg",
      image2: "prod/img5.jpeg",
      price_afn: "2500 افغانی",
      price_usd: "$28",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="shadow h-[250px] bg-amber-100 p-6">
        <h1 className="text-3xl font-bold text-gray-800">تمام محصولات</h1>
        <p className="text-gray-600 mt-2">
          در این بخش می‌توانید همه‌ی محصولات موجود را مشاهده و فیلتر کنید.
        </p>
      </header>

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Main Section */}
      <main className="flex gap-6 px-6 py-6">
        {/* Sidebar */}
        <div className="w-72">
          <div className="sticky top-[90px]">
            <MainSideBarPage />
          </div>
        </div>

        {/* Products Section */}
        <section className="flex-1">
          <h2 className="text-xl font-semibold mb-4">لیست محصولات</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {products.map((product, index) => (
              <MainProductCart product={product} key={index} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductMainPage;
