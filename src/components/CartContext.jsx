import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initialization
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart (or increase quantity)
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  // Reduce quantity of an item
  const reduceQuantity = (item) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  // Remove an item completely from cart
  const removeFromCart = (item) => {
    setCart((prev) => prev.filter((i) => i.id !== item.id));
  };

  // Clear the cart
  const clearCart = () => setCart([]);

  // Get quantity of a specific item
  const getQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  // Total items and price
  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        reduceQuantity,
        removeFromCart,
        clearCart,
        getQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
