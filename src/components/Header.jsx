import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { GiMeal } from "react-icons/gi"; // Food tray icon
import logo from "../assets/daystar.png";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Menu", path: "/menu", icon: <GiMeal size={22} /> },
    { name: "Cart", path: "/cart", icon: <FiShoppingCart size={22} /> },
  ];

  return (
    <header className="bg-white text-[#C0392B] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo with gentle bounce */}
        <Link to="/" className="flex items-center">
          <motion.img
            src={logo}
            alt="Daystar's Kitchen"
            className="h-16 w-16 object-cover rounded-full shadow-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 text-lg font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center space-x-1 px-2 py-1 rounded transition-all duration-300 transform hover:scale-105 ${
                location.pathname === link.path
                  ? "bg-[#C0392B] text-white shadow-md"
                  : "text-[#C0392B] hover:text-[#E74C3C]"
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none p-2 rounded hover:bg-[#E74C3C] transition-colors duration-300"
          >
            {isOpen ? <span className="text-2xl">✖</span> : <span className="text-2xl">☰</span>}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white px-4 py-3 space-y-2 shadow-inner border-t border-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 px-2 py-1 rounded transition-all duration-300 transform hover:scale-105 ${
                location.pathname === link.path
                  ? "bg-[#C0392B] text-white shadow-md"
                  : "text-[#C0392B] hover:text-[#E74C3C]"
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
