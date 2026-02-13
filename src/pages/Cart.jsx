import React, { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../components/CartContext";
import { PaystackButton } from "react-paystack";

const Cart = () => {
  const { cart, addToCart, reduceQuantity, removeFromCart, totalPrice, clearCart } =
    useContext(CartContext);

  // Send WhatsApp order after successful payment
  const sendWhatsAppOrder = () => {
    if (cart.length === 0) return;

    const message = cart
      .map((i) => `${i.name} x${i.quantity} = ₦${i.price * i.quantity}`)
      .join("\n");

    const url = `https://wa.me/234XXXXXXXXXX?text=Hello!%20I%20would%20like%20to%20order:%0A${encodeURIComponent(
      message
    )}%0ATotal: ₦${totalPrice}`;

    window.open(url, "_blank");
    clearCart(); // Clear cart after sending
  };

  // Paystack configuration
  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: "customer@example.com", // could be collected from user
    amount: totalPrice * 100, // amount in kobo
    publicKey: "YOUR_PAYSTACK_PUBLIC_KEY", // replace with your key
    text: "Pay & Order",
  };

  const onSuccess = () => {
    sendWhatsAppOrder();
  };

  const onClose = () => {
    alert("Payment not completed. Try again.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
        <FiShoppingCart size={28} /> Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty</p>
      ) : (
        <div className="flex flex-col gap-6">
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

          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
            <span className="text-xl font-bold">Total: ₦{totalPrice}</span>

            {/* Paystack Payment Button */}
            <PaystackButton
              {...paystackConfig}
              onSuccess={onSuccess}
              onClose={onClose}
              className="bg-[#25D366] text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition flex items-center gap-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
