import React, { useContext } from "react";
import { CartContext } from "../components/CartContext";

// Sample menu items
const menuItems = [
  {
    id: 1,
    name: "Jollof Rice",
    description: "Spicy Nigerian jollof rice with vegetables and chicken",
    price: 2000,
    image:
      "https://images.pexels.com/photos/35800540/pexels-photo-35800540.jpeg?auto=compress&cs=tinysrgb&w=1080",
  },
  {
    id: 2,
    name: "Egusi Soup",
    description: "Rich egusi soup served with pounded yam",
    price: 2500,
    image:
      "https://images.pexels.com/photos/34501905/pexels-photo-34501905.jpeg?auto=compress&cs=tinysrgb&w=1080",
  },
  {
    id: 3,
    name: "Fried Rice",
    description: "Classic Nigerian fried rice with shrimp and chicken",
    price: 2200,
    image:
      "https://images.pexels.com/photos/34772940/pexels-photo-34772940.jpeg?auto=compress&cs=tinysrgb&w=1080",
  },
];

const Menu = () => {
  const { addToCart, reduceQuantity, getQuantity } = useContext(CartContext);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">Our Menu</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {menuItems.map((item) => {
          const quantity = getQuantity(item.id);

          return (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 flex-1">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">₦{item.price}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => reduceQuantity(item)}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition"
                      disabled={quantity === 0}
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-[#C0392B] text-white px-3 py-1 rounded hover:bg-[#E74C3C] transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
