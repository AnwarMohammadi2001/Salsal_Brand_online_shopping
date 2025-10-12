import React, { useState } from "react";
import { PiHeartStraight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const MainProductCart = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

const handleClick = () => {
  const categorySlug =
    product.category?.slug || slugify(product.category?.nameEn);
  const productSlug = slugify(product.name); // ✅ slugify product name
  navigate(`/collections/${categorySlug}/${product._id}`);
};



  // Use frontImage and backImage directly
  const FRONT_IMAGE_URL = `http://localhost:5000/${product.frontImage}`;
  const BACK_IMAGE_URL = product.backImage
    ? `http://localhost:5000/${product.backImage}`
    : FRONT_IMAGE_URL;

  return (
    <div
      onClick={handleClick}
      className="relative w-[300px] h-[390px] lg:w-[284px] lg:h-[440px] group cursor-pointer overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={hovered ? BACK_IMAGE_URL : FRONT_IMAGE_URL}
        alt={product.name}
        className="w-full h-[350px] object-cover transition-all duration-500"
      />

      <div className="py-3 px-3 flex text-gray-700 text-sm flex-col gap-1">
        <p>{product.category.nameFa || product.category.Fa}</p>
        <p>{product.name}</p>
        <div className="flex justify-between items-center">
          <p>{product.priceAFN} افغانی</p>
          <p className="flex items-center gap-x-2">
            {product.priceUSD} <span>دالر</span>
          </p>
        </div>
      </div>
      <div className="absolute top-3 right-3 bg-white text-black px-2 py-2 text-sm font-semibold rounded-full">
        <PiHeartStraight size={20} />
      </div>
    </div>
  );
};

export default MainProductCart;
