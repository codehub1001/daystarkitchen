// components/Loader.jsx
import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/daystar.png"; // your logo path

const Loader = () => (
  <motion.div
    className="fixed top-0 left-0 w-full h-screen bg-white z-50 flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.img
      src={logo}
      alt="Daystar Logo"
      className="w-24 h-24 sm:w-32 sm:h-32"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: [0.8, 1.05, 0.95, 1], opacity: [0, 1, 0.9, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

export default Loader;
