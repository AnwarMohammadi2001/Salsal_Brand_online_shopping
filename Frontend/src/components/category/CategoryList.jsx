import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const CategoryList = () => {
  return (
    <div className="bg-amber-50">
      <div className="max-w-[90%] mx-auto px-4  min-h-[90vh]  pb-10">
        {/* Heading */}
        <div className="flex justify-between items-center py-7">
          <h2 className="text-2xl font-bold text-center">دسته بندی ها</h2>
          <Link
            to="/allcategory"
            className="flex items-center gap-x-1 cursor-pointer group"
          >
            <p>دیدن بشتر</p>
            <IoIosArrowRoundBack size={20} className="group-hover:-translate-x-1 transition-transform duration-300 " />
          </Link>
        </div>

        {/* First Row */}
        <div className="grid grid-cols-4 gap-5 h-[300px]">
          <div className="col-span-2 relative rounded-md overflow-hidden">
            <img
              src="/cat/cat1.jpg"
              alt="لباس مردانه"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold text-lg">
              لباس مردانه
            </div>
          </div>
          <div className="col-span-1 relative rounded-md overflow-hidden">
            <img
              src="/cat/cat2.jpg"
              alt="لباس زنانه"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold">
              لباس زنانه
            </div>
          </div>
          <div className="col-span-1 relative rounded-md overflow-hidden">
            <img
              src="/cat/cat3.jpg"
              alt="کفش"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold">
              کفش
            </div>
          </div>
        </div>

        {/* Second Row (reversed) */}
        <div className="grid grid-cols-4 gap-5 h-[300px] mt-5">
          <div className="col-span-1 relative rounded-md overflow-hidden">
            <img
              src="/cat/cat4.jpg"
              alt="زیورات"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold">
              زیورات
            </div>
          </div>
          <div className="col-span-1 relative rounded-md overflow-hidden">
            <img
              src="/cat/cat6.jpg"
              alt="کیف"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold">
              کیف
            </div>
          </div>
          <div className="col-span-2 relative rounded-md overflow-hidden">
            <img
              src="/cat/cat7.jpg"
              alt="ساعت"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold text-lg">
              ساعت
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
