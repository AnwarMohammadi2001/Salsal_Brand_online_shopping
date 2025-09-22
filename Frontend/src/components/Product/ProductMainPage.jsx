// ProductMainPage.jsx
import React from "react";
import MainSideBarPage from "./MainSideBarPage";
import Breadcrumb from "../Breadcrumb";

const ProductMainPage = () => {
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(30).keys()].map((id) => (
              <div
                key={id}
                className="bg-white rounded-lg shadow hover:shadow-md transition p-4"
              >
                <div className="h-32 bg-gray-200 rounded-md mb-3"></div>
                <h3 className="font-semibold text-gray-800">محصول {id + 1}</h3>
                <p className="text-gray-600 text-sm">توضیحات کوتاه</p>
                <span className="block mt-2 text-blue-600 font-bold">
                  1000 افغانی
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductMainPage;
