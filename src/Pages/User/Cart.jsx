import React, { useEffect, useState } from "react";

const CartDrawer = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("/CartElement.json") // from public folder
      .then((res) => res.json())
      .then((data) => setCartItems(data));
  }, []);

  const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const vat = subTotal * 0.2;
  const total = subTotal + vat;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">My Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-2xl">×</button>
        </div>

        {/* Items */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-150px)]">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span>Sub-Total:</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>VAT (20%):</span>
            <span>${vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
              View Cart
            </button>
            <button className="w-full py-2 bg-black text-white rounded hover:bg-gray-800">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
