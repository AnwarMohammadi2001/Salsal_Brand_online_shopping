import React from "react";

const ShopNow = () => {
  return (
    <div className="min-h-[80vh]  w-full px-5 md:px-10 lg:px-12 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 h-full w-full">
        <div className="">
          <img src="image4.avif" alt="" className="rounded-md" />
          <div className="py-2">
            <p className="text-xl font-semibold">SHOP WOMEN</p>
          </div>
        </div>
        <div className="">
          {" "}
          <img src="image5.avif" alt="" className="rounded-md" />
          <div className="py-2">
            <p className="text-xl font-semibold">SHOP MEN</p>
          </div>
        </div>
        <div className="">
          {" "}
          <img src="image6.avif" alt="" className="rounded-md" />
          <div className="py-2">
            <p className="text-xl font-semibold">SHOP ACCESSORIES</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopNow;
