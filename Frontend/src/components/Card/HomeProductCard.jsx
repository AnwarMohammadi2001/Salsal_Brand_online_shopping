import { Heart } from "lucide-react";
import React, { useState } from "react";
import { PiHeartStraight } from "react-icons/pi";

const HomeProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);


  return (
    <div
      className="relative w-[300px] h-[390px] lg:w-[350px] lg:h-[520px] group cursor-pointer overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Images */}
      <img
        src={hovered ? product.image2 : product.image1}
        alt={product.name}
        className="w-full h-[430px] object-cover transition-all duration-500"
      />
      <div className="py-3 px-3 flex text-gray-700 text-sm flex-col gap-1">
        <p>{product.category}</p>
        <p>{product.name}</p>
        <div className="flex justify-between items-center">
          <p>{product.price_afn}</p>
          <p className="flex items-center gap-x-4">
            {product.price_usd}
            <span>دالر</span>
          </p>
        </div>
      </div>
      <div className="absolute top-3 right-3 bg-white text-black px-2 py-2 text-sm font-semibold rounded-full">
        <PiHeartStraight size={20} />
      </div>
    </div>
  );
};

export default HomeProductCard;
