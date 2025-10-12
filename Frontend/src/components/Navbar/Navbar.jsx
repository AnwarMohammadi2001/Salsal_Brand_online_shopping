import React, { useState, useRef, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import { PiHeartStraight } from "react-icons/pi";
import { LuUser } from "react-icons/lu";
import { AiOutlineShopping } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import MobileSearchBox from "./MobileSearchBox";
import ResponsiveNav from "./ResponsiveNav";
import Drawer from "../Drawer";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [opens, setOpens] = useState(false);
  const [isDrawerOpens, setIsDrawerOpens] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsUserModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserClick = () => {
    if (user) {
      setIsUserModalOpen((prev) => !prev);
    } else {
      navigate("/signin");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsUserModalOpen(false);
    navigate("/");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userLoggedOut"));
  };

  const handleViewProfile = () => {
    setIsUserModalOpen(false);
    navigate("/dashboard");
  };

  const handleSearchClick = () => setIsExpanded(true);

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
          </div>

          {/* Right: Icons */}
          <div className="flex justify-end items-center space-x-6 relative">
            <div className="hidden lg:block">
              <SearchBar />
            </div>
            <button className="text-amber-400 hidden md:block hover:text-amber-600 hover:-translate-y-1 transform transition-all duration-300">
              <PiHeartStraight size={26} />
            </button>

            {/* User Icon / Initial */}
            <div className="relative">
              <button
                onClick={handleUserClick}
                className={`text-amber-400 hover:-translate-y-1 transform transition-all duration-300 flex items-center justify-center w-10 h-10 rounded-full`}
              >
                {user?.username ? (
                  <span className="font-bold text-lg border rounded-full h-8 w-8 flex items-center justify-center text-gray-600">
                    {user.username[0].toUpperCase()}
                  </span>
                ) : (
                  <LuUser size={26} />
                )}
              </button>

              {/* Dropdown modal */}
              <AnimatePresence>
                {isUserModalOpen && (
                  <>
                    <div className="inset-0 z-40 fixed"></div>
                    <motion.div
                      ref={modalRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 5 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-[300px] bg-white shadow-lg rounded-lg px-4 py-6 z-50"
                    >
                      <div className="flex items-center gap-x-5">
                        <div className="border h-12 w-12 flex justify-center border-gray-300 items-center rounded-full bg-gray-200">
                          <span className="font-bold text-lg text-gray-600">
                            {user.username[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-1">
                            {user.username}
                          </h3>
                          <p className="text-gray-600 mb-3">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={handleViewProfile}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

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

      {/* Mobile Menu Drawer */}
      {opens && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="bg-white w-72 h-full shadow-lg p-4 overflow-y-auto">
            <ResponsiveNav isMobile={true} setOpens={setOpens} />
          </div>
        </div>
      )}

      {/* Cart Drawer */}
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
