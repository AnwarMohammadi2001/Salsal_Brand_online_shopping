import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useDispatch, useSelector } from "react-redux";
import { fetchSliders } from "../../redux/slices/sliderSlice";

const HeroMain = () => {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  const dispatch = useDispatch();
  const { sliders, loading, error } = useSelector((state) => state.slider);

  useEffect(() => {
    dispatch(fetchSliders());
  }, [dispatch]);

  return (
    <div className="w-full h-[50vh] md:h-[400px] lg:h-[680px] relative group">
      {loading ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          Loading sliders...
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full text-red-500">
          Error loading sliders
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000 }}
          slidesPerView={1}
          loop={true}
          navigation={{ prevEl, nextEl }}
          grabCursor={true}
          className="h-full relative"
        >
          {sliders.map((slide) => (
            <SwiperSlide key={slide._id}>
              <div
                className="w-full h-full bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(http://localhost:5000/${slide.image.replaceAll(
                    "\\",
                    "/"
                  )})`,
                }}
              >
                {/* Overlay */}
                {/* <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  {slide.category?.name && (
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-white text-2xl md:text-4xl font-bold text-center px-4"
                    >
                      {slide.category.name}
                    </motion.h2>
                  )}
                </div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Navigation buttons */}
      <div className="absolute bottom-10 md:bottom-20 right-1/2 translate-x-1/2 md:right-16 md:translate-x-0 z-20 flex md:flex-col gap-4">
        <button
          ref={setNextEl}
          className="p-3 rounded-full border border-white text-white shadow-md hover:bg-white hover:text-black transition hidden group-hover:flex"
        >
          <MdArrowForwardIos size={20} />
        </button>
        <button
          ref={setPrevEl}
          className="p-3 rounded-full border border-white text-white shadow-md hover:bg-white hover:text-black transition hidden group-hover:flex"
        >
          <MdArrowBackIos size={20} />
        </button>
      </div>
    </div>
  );
};

export default HeroMain;
