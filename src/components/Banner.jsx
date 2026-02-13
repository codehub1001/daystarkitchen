import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GiKnifeFork, GiMeal } from "react-icons/gi";

// Nigerian food images from Pexels
const images = [
  "https://images.pexels.com/photos/35800540/pexels-photo-35800540.jpeg?auto=compress&cs=tinysrgb&w=1080",
  "https://images.pexels.com/photos/34772940/pexels-photo-34772940.jpeg?auto=compress&cs=tinysrgb&w=1080",
  "https://images.pexels.com/photos/34501905/pexels-photo-34501905.jpeg?auto=compress&cs=tinysrgb&w=1080"
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] lg:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Animated Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1, rotate: -1 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.1, rotate: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full bg-cover bg-center rounded-lg shadow-inner"
          style={{ backgroundImage: `url(${images[current]})` }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Banner Content */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        {/* Floating icons */}
        <motion.div
          className="flex items-center gap-3 mb-4 text-yellow-400 text-2xl sm:text-3xl md:text-4xl"
          animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <GiKnifeFork size={30} />
          <GiMeal size={30} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-xl"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
        >
          Welcome to Daystar's Kitchen
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-yellow-400 mb-6 drop-shadow-md max-w-3xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          Enjoy authentic Nigerian meals, from jollof rice to egusi soup, delivered straight to your door.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          <Link
            to="/menu"
            className="bg-[#C0392B] text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-[#E74C3C] hover:scale-110 transition-transform duration-300 shadow-lg flex items-center gap-2"
          >
            <GiMeal size={22} />
            See Menu
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
