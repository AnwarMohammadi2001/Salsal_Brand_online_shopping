// ProductMainPage.jsx
import React, { useState, useEffect, useRef } from "react";
import MainSideBarPage from "./MainSideBarPage";
import Breadcrumb from "../Breadcrumb";
import MainProductCart from "../Card/MainProductCart";
import MainProductCartSkeleton from "../Card/MainProductCartSkeleton";

const allProducts = [
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
  {
    id: 6,
    name: "بالا تنه",
    category: "لباس مردانه",
    image1: "prod/img6.jpg",
    image2: "prod/img5.jpeg",
    price_afn: "2500 افغانی",
    price_usd: "$28",
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
  {
    id: 6,
    name: "بالا تنه",
    category: "لباس مردانه",
    image1: "prod/img6.jpg",
    image2: "prod/img5.jpeg",
    price_afn: "2500 افغانی",
    price_usd: "$28",
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
  {
    id: 6,
    name: "بالا تنه",
    category: "لباس مردانه",
    image1: "prod/img6.jpg",
    image2: "prod/img5.jpeg",
    price_afn: "2500 افغانی",
    price_usd: "$28",
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
  {
    id: 6,
    name: "بالا تنه",
    category: "لباس مردانه",
    image1: "prod/img6.jpg",
    image2: "prod/img5.jpeg",
    price_afn: "2500 افغانی",
    price_usd: "$28",
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

const ProductMainPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  const PRODUCTS_PER_PAGE = 4;
  const SCROLL_TRIGGER_COUNT = 20;

  const loadMore = () => {
    const nextProducts = allProducts.slice(
      (page - 1) * PRODUCTS_PER_PAGE,
      page * PRODUCTS_PER_PAGE
    );
    setProducts((prev) => [...prev, ...nextProducts]);
    setPage((prev) => prev + 1);
  };

  const loadAll = () => setProducts(allProducts);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          products.length < SCROLL_TRIGGER_COUNT
        ) {
          setLoading(true);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loading, products]);

  useEffect(() => {
    if (loading) {
      loadMore();
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => loadMore(), []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb />
      <main className="flex gap-6 px-6 py-6">
        <div className="w-72">
          <div className="sticky top-[90px]">
            <MainSideBarPage />
          </div>
        </div>

        <section className="flex-1">
          <h2 className="text-xl font-semibold mb-4">لیست محصولات</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {loading
              ? Array(PRODUCTS_PER_PAGE)
                  .fill(0)
                  .map((_, index) => <MainProductCartSkeleton key={index} />)
              : products.map((product) => (
                  <MainProductCart key={product.id} product={product} />
                ))}
          </div>

          <div
            ref={loader}
            className="h-12 flex justify-center items-center mt-4"
          >
            {loading && <p>در حال بارگذاری...</p>}
          </div>

          {products.length >= SCROLL_TRIGGER_COUNT &&
            products.length < allProducts.length && (
              <div className="flex gap-4 mt-6 justify-center">
                <button
                  className="border rounded-full text-black border-black px-4 py-2 cursor-pointer"
                  onClick={loadMore}
                >
                  بارگذاری بیشتر
                </button>
                <button
                  className="border rounded-full text-black border-black px-4 py-2 cursor-pointer"
                  onClick={loadAll}
                >
                  بارگذاری همه
                </button>
              </div>
            )}
        </section>
      </main>
    </div>
  );
};

export default ProductMainPage;
