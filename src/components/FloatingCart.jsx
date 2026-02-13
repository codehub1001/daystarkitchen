// components/FloatingCart.jsx
import React, { useContext, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

const FloatingCart = () => {
  const { cart, totalItems, totalPrice } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-[#C0392B] text-white p-4 rounded-full shadow-lg hover:bg-[#E74C3C] transition flex items-center justify-center"
      >
        <FiShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-black w-5 h-5 text-xs rounded-full flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Preview */}
      {isOpen && (
        <div className="mt-2 w-72 max-h-96 bg-white shadow-xl rounded-lg overflow-y-auto p-4 flex flex-col">
          <h3 className="text-lg font-bold mb-2">Your Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">Cart is empty</p>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x ₦{item.price}
                      </p>
                    </div>
                    <p className="font-semibold">₦{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 border-t pt-3 flex justify-between items-center">
                <span className="font-bold">Total: ₦{totalPrice}</span>
                <Link
                  to="/cart"
                  className="bg-[#25D366] text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingCart;
