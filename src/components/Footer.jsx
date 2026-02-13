import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/daystar.png";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-[#C0392B] shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex items-center mb-6 md:mb-0">
          <img src={logo} alt="Daystar's Kitchen" className="h-14 w-14 rounded-full shadow-lg" />
        </div>

        {/* Navigation */}
        <div className="flex space-x-6 mb-6 md:mb-0">
          <Link
            to="/menu"
            className="hover:text-[#E74C3C] transition duration-300"
          >
            Menu
          </Link>
          <Link
            to="/cart"
            className="hover:text-[#E74C3C] transition duration-300"
          >
            Cart
          </Link>
        </div>

        {/* WhatsApp Icon */}
        <div className="flex space-x-4">
          <a
            href="https://wa.me/yourwhatsappnumber"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#25D366] transition duration-300"
          >
            <FaWhatsapp size={28} />
          </a>
        </div>
      </div>

      {/* Bottom text */}
      <div className="border-t border-gray-200 text-center text-sm py-4 text-gray-500">
        &copy; {new Date().getFullYear()} Daystar's Kitchen. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
