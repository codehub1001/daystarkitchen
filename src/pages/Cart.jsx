// pages/Cart.jsx
import React, { useContext, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../components/CartContext";
import { PaystackButton } from "react-paystack";
import Loader from "../components/Loader";

const Cart = () => {
  const { cart, addToCart, reduceQuantity, removeFromCart, totalPrice, clearCart } =
    useContext(CartContext);

  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);

  // Automatically send WhatsApp order after payment
  const sendWhatsAppOrder = () => {
    if (cart.length === 0) return;

    const message = cart
      .map((i) => `${i.name} x${i.quantity} = ₦${i.price * i.quantity}`)
      .join("\n");

    const url = `https://wa.me/2348135430252?text=Hello!%20I%20would%20like%20to%20order:%0A${encodeURIComponent(
      message
    )}%0AName: ${customer.name}%0APhone: ${customer.phone}%0ATotal: ₦${totalPrice}`;

    // Open WhatsApp automatically
    window.open(url, "_blank");

    // Clear cart after sending
    clearCart();
  };

  // Paystack configuration
  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: "customer@example.com", // required by Paystack but you don’t use it
    amount: totalPrice * 100, // amount in kobo
    publicKey: "pk_test_9ea3b0b804c01facb41b4a04fdfb5ee51ce6071f", // test key
    text: "Pay & Order",
  };

  // Triggered when payment succeeds
  const onSuccess = () => {
    setLoading(false);
    sendWhatsAppOrder(); // automatic message
  };

  // Triggered if payment popup is closed without success
  const onClose = () => {
    setLoading(false);
    alert("Payment not completed. Try again.");
  };

  // Update customer info
  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
        <FiShoppingCart size={28} /> Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty</p>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Cart Items */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-32 w-full sm:w-32 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between w-full">
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="font-bold text-lg mt-2">
                    ₦{item.price} x {item.quantity} = ₦{item.price * item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => reduceQuantity(item)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-[#C0392B] text-white px-3 py-1 rounded hover:bg-[#E74C3C] transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="ml-auto text-red-500 hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Customer Info */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
            <h3 className="text-xl font-semibold mb-2">Customer Information</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={customer.name}
              onChange={handleInputChange}
              className="border p-3 rounded w-full focus:ring-2 focus:ring-[#C0392B] focus:outline-none"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={handleInputChange}
              className="border p-3 rounded w-full focus:ring-2 focus:ring-[#C0392B] focus:outline-none"
            />
          </div>

          {/* Total & Payment */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md gap-4">
            <span className="text-xl font-bold">Total: ₦{totalPrice}</span>

            {loading ? (
              <Loader />
            ) : (
              <PaystackButton
                {...paystackConfig}
                onSuccess={onSuccess}
                onClose={onClose}
                className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center w-full sm:w-auto gap-2 text-white ${
                  !customer.name || !customer.phone
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#25D366] hover:bg-green-600"
                }`}
                disabled={!customer.name || !customer.phone}
              >
                Pay & Order
              </PaystackButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
