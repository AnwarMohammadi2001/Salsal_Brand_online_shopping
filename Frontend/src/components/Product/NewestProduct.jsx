import React from "react";
import { IoIosArrowForward, IoIosArrowRoundBack } from "react-icons/io";
import HomeProductCard from "../Card/HomeProductCard";
import { Link } from "react-router-dom";

const NewestProduct = () => {
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
    <div className="px-10">
      <div className="px-5 flex justify-center py-5 md:px-10 lg:px-12 ">
        <h2 className="text-xl  text-gray-700"> جدیدترین محصولات </h2>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {products.slice(0,4).map((product) => (
          <HomeProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center items-center py-5">
        <Link
          to="/allcategory"
          className="flex items-center gap-x-1 border rounded-full py-2 px-5 cursor-pointer group"
        >
          <p>دیدن بشتر</p>
          <IoIosArrowRoundBack
            size={20}
            className="group-hover:-translate-x-1 transition-transform duration-300 "
          />
        </Link>
      </div>
    </div>
  );
};

export default NewestProduct;
