import React, { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryLists } from "../../redux/slices/categoryListSlice";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { lists, loading } = useSelector((state) => state.categoryList);

  useEffect(() => {
    dispatch(fetchCategoryLists());
  }, [dispatch]);

  if (loading) return <p className="text-center py-10">در حال بارگذاری...</p>;

  if (!lists || lists.length === 0)
    return (
      <p className="text-center text-gray-500 py-10">
        هیچ دسته‌بندی‌ای یافت نشد.
      </p>
    );

  // Split the lists
  const firstSection = lists.slice(0, 3);
  const secondSection = lists.slice(3, 6);

  return (
    <div className="">
      <div className="md:max-w-[90%] mx-auto px-5 h-auto md:min-h-[90vh] pb-10">
        {/* Heading */}
        <div className="flex justify-between items-center py-7">
          <h2 className="text-sm md:text-lg lg:text-2xl font-bold text-center">
            دسته بندی ها
          </h2>
          <Link
            to="/allcategory"
            className="flex items-center gap-x-1 cursor-pointer group"
          >
            <p className="text-xs md:text-base">دیدن بشتر</p>
            <IoIosArrowRoundBack
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* --- First Section (0-2) --- */}
        <div className="grid grid-cols-4 gap-1 md:gap-5 h-[150px] md:h-[250px] lg:h-[300px]">
          {firstSection.map((item, index) => (
            <div
              key={item._id}
              className={`relative rounded-md overflow-hidden ${
                index === 0 ? "col-span-2" : "col-span-1"
              }`}
            >
              <img
                src={`http://localhost:5000/${item.image}`}
                alt={item.category?.name || "category"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold text-lg">
                {item.category?.name || "بدون نام"}
              </div>
            </div>
          ))}
        </div>

        {/* --- Second Section (3-5) --- */}
        <div className="grid grid-cols-4 gap-1 md:gap-5 h-[150px] md:h-[250px] lg:h-[300px] mt-5">
          {secondSection.map((item, index) => (
            <div
              key={item._id}
              className={`relative rounded-md overflow-hidden ${
                index === 2 ? "col-span-2" : "col-span-1"
              }`}
            >
              <img
                src={`http://localhost:5000/${item.image}`}
                alt={item.category?.name || "category"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold text-lg">
                {item.category?.name || "بدون نام"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
