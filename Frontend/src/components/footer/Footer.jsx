import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const icons = [FaFacebook, FaInstagram, FaTiktok, FaWhatsapp];
  return (
    <div className="w-full h-[400px] bg-stone-900 px-5 md:px-20">
      <div className="h-[150px]  border-amber-50"></div>
      <div className="h-[250px]  border-amber-50 flex flex-col items-center justify-center px-5 md:px-20 py-3">
        <div className="border border-gray-400 h-[150px] w-full  rounded-md relative">
          <div className="absolute left-1/2 -translate-1/2 bg-stone-900 flex items-center gap-x-4 px-5">
            {icons.map((Icon, index) => (
              <div
                key={index}
                className="text-3xl  cursor-pointer text-gray-400"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
