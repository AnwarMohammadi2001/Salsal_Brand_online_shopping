// src/components/HomeProductCardSkeleton.jsx
import React from "react";

const HomeProductCardSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4 w-[300px] h-[390px] lg:w-[350px] lg:h-[520px]">
      {/* Image Placeholder */}
      <div className="w-full h-[430px] bg-gray-200 rounded-md"></div>

      {/* Text Placeholder */}
      <div className="space-y-2 px-3 py-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex justify-between mt-2">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>

      {/* Heart icon placeholder */}
      <div className="absolute top-3 right-3 w-8 h-8 bg-gray-200 rounded-full"></div>
    </div>
  );
};

export default HomeProductCardSkeleton;
