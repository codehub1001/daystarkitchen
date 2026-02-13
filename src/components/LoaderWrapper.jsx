// components/LoaderWrapper.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader"; // your animated logo loader

const LoaderWrapper = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader on every route change
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200); // duration of loader
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="relative">
      {children} {/* Render page content immediately */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-50 transition-opacity">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default LoaderWrapper;
