// src/components/MainProductCartSkeleton.jsx
import React from "react";

const MainProductCartSkeleton = () => {
  return (
    <div className="animate-pulse relative w-[300px] h-[390px] lg:w-[284px] lg:h-[440px] bg-gray-100 rounded-md overflow-hidden space-y-3">
      {/* Image placeholder */}
      <div className="w-full h-[350px] bg-gray-200 rounded-md"></div>

      {/* Product info placeholders */}
      <div className="px-3 flex flex-col gap-2">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div> {/* category */}
        <div className="h-5 bg-gray-200 rounded w-2/3"></div> {/* name */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>{" "}
          {/* price AFN */}
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>{" "}
          {/* price USD */}
        </div>
      </div>

      {/* Heart icon placeholder */}
      <div className="absolute top-3 right-3 w-8 h-8 bg-gray-200 rounded-full"></div>
    </div>
  );
};

export default MainProductCartSkeleton;
