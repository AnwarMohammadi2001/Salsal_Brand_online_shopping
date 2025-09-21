import React from "react";

const ShopNow = () => {
  return (
    <div className="min-h-[80vh]  w-full px-5 md:px-10 lg:px-12 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 h-full w-full">
        <div className="">
          <img src="img1.webp" alt="" className="rounded-md h-[600px]" />
          <div className="py-2">
            <p className="text-xl ">خرید لباس عروس</p>
          </div>
        </div>
        <div className="">
          {" "}
          <img src="img2.jpg" alt="" className="rounded-md h-[600px] w-full" />
          <div className="py-2">
            <p className="text-xl">خرید گند افغانی</p>
          </div>
        </div>
        <div className="">
          {" "}
          <img src="img3.jpg" alt="" className="rounded-md h-[600px]" />
          <div className="py-2">
            <p className="text-xl">خرید پنجابی</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopNow;
