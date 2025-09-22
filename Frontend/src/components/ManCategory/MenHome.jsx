import React, { useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import HomeProductCard from "../Card/HomeProductCard";

const MenHome = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

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
    <div className="h-[85vh] w-full">
      <div className="px-5 md:px-10 lg:px-12 ">
        <h2 className="text-xl  text-gray-700">محصولات</h2>
        <div className="flex items-center justify-between gap-x-5">
          <div className="md:flex items-center gap-x-5">
            <p className="py-3 text-sm md:text-base lg:text-2xl font-bold text-black">
              حالا موجود: بهترین لباس های افغانی
            </p>
            <button className="underline text-xl font-semibold cursor-pointer hover:text-gray-700">
              دیدن همه
            </button>
          </div>
          <div className="flex items-center gap-x-5">
            <button
              ref={prevRef}
              disabled={isBeginning}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isBeginning
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800 cursor-pointer"
              }`}
            >
              <IoIosArrowForward />
            </button>
            <button
              ref={nextRef}
              disabled={isEnd}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isEnd
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800 cursor-pointer"
              }`}
            >
              <IoIosArrowBack />
            </button>
          </div>
        </div>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={4.3} // default (desktop)
        slidesOffsetBefore={40}
        slidesOffsetAfter={30}
        breakpoints={{
          0: {
            slidesPerView: 1.3,
            slidesOffsetBefore: 10,
            slidesOffsetAfter: 10,
          },
          768: {
            slidesPerView: 2.3,
            slidesOffsetBefore: 30,
            slidesOffsetAfter: 30,
          },
          1024: {
            slidesPerView: 4.3,
            slidesOffsetBefore: 40,
            slidesOffsetAfter: 30,
          },
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        className="mt-5"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <HomeProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MenHome;
