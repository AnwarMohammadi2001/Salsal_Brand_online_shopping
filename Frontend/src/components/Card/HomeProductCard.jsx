import { Heart } from "lucide-react";
import React, { useState } from "react";
import { PiHeartStraight } from "react-icons/pi";

const HomeProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  // All standard sizes we want to display
  const allSizes = ["XS","S", "M", "L", "XL", "XXL" , "3XL"];

  return (
    <div
      className="relative w-[350px] h-[440px] group cursor-pointer overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Images */}
      <img
        src={hovered ? product.image2 : product.image1}
        alt={product.name}
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* Sizes Overlay */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-gray-100 text-black py-3 grid grid-cols-5 px-3  gap-1 transition-all duration-500 ${
          hovered ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {allSizes.map((size) => {
          const isAvailable = product.sizes.includes(size);

          return (
            <span
              key={size}
              className={`relative px-4 py-2 flex  justify-center items-center text-black font-semibold  bg-white text-sm transition ${
                isAvailable
                  ? "hover:bg-black hover:text-white cursor-pointer"
                  : "text-gray-400 border border-gray-400 cursor-not-allowed"
              }`}
            >
              {size}
              {!isAvailable && (
                <span className="absolute left-0 right-0 top-1/2 w-full h-[1px] bg-gray-300 rotate-[-30deg]"></span>
              )}
            </span>
          );
        })}
      </div>
      <div className="absolute top-3 right-3 bg-white text-black px-2 py-2 text-sm font-semibold rounded-full">
        <PiHeartStraight size={20} />
      </div>
    </div>
  );
};

export default HomeProductCard;
