import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchBox = ({ value, onChange, placeholder = "جستجو..." }) => {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none  transition"
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <IoSearchOutline size={20} />
      </span>
    </div>
  );
};

export default SearchBox;
