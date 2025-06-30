import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-white shadow-md px-4 md:px-10 py-5 flex items-center justify-between">
      {/* Shop Name */}
      <div className="text-2xl font-bold text-primary">Shop Center</div>

      {/* Search Box */}
      <div className="hidden md:flex flex-1 mx-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4 text-gray-700 text-xl">
        <FaUser className="cursor-pointer hover:text-blue-500" />
        <FaHeart className="cursor-pointer hover:text-red-500" />
        <FaShoppingCart className="cursor-pointer hover:text-green-500" />
      </div>
    </header>
  );
}
