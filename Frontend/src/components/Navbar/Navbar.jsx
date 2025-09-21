import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import { PiHeartStraight } from "react-icons/pi";
import { LuUser } from "react-icons/lu";
import { AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import MobileSearchBox from "./MobileSearchBox";
import ResponsiveNav from "./ResponsiveNav";
import { IoClose } from "react-icons/io5";
import Drawer from "../Drawer";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // ✅ search toggle
  const [isExpanded, setIsExpanded] = useState(false);
  const handleSearchClick = () => setIsExpanded(true);
  const [opens, setOpens] = useState(false); // mobile menu
  const [isDrawerOpens, setIsDrawerOpens] = useState(false); // cart drawer

  return (
    <nav className="bg-white sticky top-0 py-2 md:py-2 z-50 shadow-md">
      <div className="max-w-full mx-auto px-4 sm:px-5 lg:px-12">
        <div className="grid grid-cols-3 items-center relative">
          {/* Left (Mobile): Menu & Search icons */}
          <div className="lg:hidden flex items-center gap-x-5 py-2">
            <span onClick={() => setOpens(true)}>
              <HiOutlineMenuAlt2 size={24} className="cursor-pointer" />
            </span>
            <span onClick={handleSearchClick}>
              <FiSearch size={22} className="cursor-pointer" />
            </span>
          </div>

          {/* Center: NavLinks */}
          <div className="hidden lg:flex items-center gap-x-2 py-2 relative w-full">
            <NavLinks />
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center">
            <img
              src="logo.png"
              alt="logo"
              className="md:cursor-pointer cursor-pointer h-10 md:h-14"
            />
            <div
              className="text-3xl md:hidden ml-4"
              onClick={() => setOpen(!open)}
            >
              <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
            </div>
          </div>

          {/* Right: Icons */}
          <div className="flex justify-end items-center space-x-6">
            <div className="hidden lg:block">
              <SearchBar />
            </div>
            <button className="text-amber-400 hidden md:block hover:text-amber-600 hover:-translate-y-1 transform transition-all duration-300">
              <PiHeartStraight size={26} />
            </button>
            <Link
              to="signin"
              className="text-amber-400 hover:text-amber-600 hover:-translate-y-1 transform transition-all duration-300"
            >
              <LuUser size={26} />
            </Link>
            <button
              onClick={() => setIsDrawerOpens(true)}
              className="text-amber-400 hover:text-amber-600 hover:-translate-y-1 transform transition-all duration-300"
            >
              <AiOutlineShopping size={26} />
            </button>
          </div>
        </div>

        {/* Mobile SearchBar */}
        {isExpanded && (
          <div className="lg:hidden mt-2">
            <MobileSearchBox
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            />
          </div>
        )}
      </div>
      {/* ✅ Mobile Menu Drawer */}
      {opens && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="bg-white w-72 h-full shadow-lg p-4 overflow-y-auto">
            {/* Nav Links (Mobile Mode) */}
            <ResponsiveNav isMobile={true} setOpens={setOpens} />
          </div>
        </div>
      )}
      {isDrawerOpens && (
        <Drawer
          isDrawerOpens={isDrawerOpens}
          setIsDrawerOpens={setIsDrawerOpens}
        />
      )}
    </nav>
  );
};

export default Navbar;
