import React, { useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import HomeProductCard from "../Card/HomeProductCard";

const WomenHome = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const products = [
    {
      id: 1,
      name: "Performance Gym Pants",
      image1: "women/image1.webp",
      image2: "women/image2.webp",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 2,
      name: "Training Shorts",
      image1: "women/img3.jpg",
      image2: "women/img4.jpg",
      sizes: ["M", "L", "XL"],
    },
    {
      id: 3,
      name: "Muscle Fit T-shirt",
      image1: "women/img4.jpg",
      image2: "women/img3.jpg",
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 4,
      name: "Hooded Sweatshirt",
      image1: "women/img6.png",
      image2: "women/img4.jpg",
      sizes: ["M", "L", "XL"],
    },
    {
      id: 5,
      name: "Zip Hoodie",
      image1: "women/img7.jpg",
      image2: "men/image2.webp",
      sizes: ["S", "M", "L"],
    },
    {
      id: 6,
      name: "Tank Top",
      image1: "women/image2.webp",
      image2: "men/image2.webp",
      sizes: ["M", "L", "XL"],
    },
  ];

  return (
    <div className="h-[85vh] w-full">
      <div className="px-5 md:px-10 lg:px-12 pt-10">
        <h2 className="text-xl font-bold text-gray-700">Womens</h2>
        <div className="flex items-center justify-between gap-x-5">
          <div className="flex items-center gap-x-5">
            <p className="py-3 text-2xl font-bold text-black">
              THE VIRAL DIPPED WAISTBAND LEGGING IS BACK
            </p>
            <button className="underline text-xl font-semibold cursor-pointer hover:text-gray-700">
              View All
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
              <IoIosArrowBack />
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
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>

 
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={4.3} 
        slidesOffsetBefore={40}
        slidesOffsetAfter={30}
        breakpoints={{
          0: {
            slidesPerView: 1.3,
            slidesOffsetBefore: 20,
            slidesOffsetAfter: 20,
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

export default WomenHome;
