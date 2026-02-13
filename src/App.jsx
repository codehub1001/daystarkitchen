// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import LoaderWrapper from "./components/LoaderWrapper"; // new component

const Home = () => <Banner />;

const App = () => {
  return (
    <CartProvider>
      <Router>
        <LoaderWrapper>
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </LoaderWrapper>
      </Router>
    </CartProvider>
  );
};

export default App;
