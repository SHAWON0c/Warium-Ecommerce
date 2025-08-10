import React, { useEffect, useState } from "react";
import Usecart from "../../hooks/Usecart";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
const CartDrawer = ({ isOpen, onClose }) => {

  const [cart, isLoading, isError, refetch] = Usecart();
  const subTotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return acc + price;
  }, 0);

  const vat = subTotal * 0.2;
  const total = subTotal + vat;
  const axiosSecure = UseAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Item has been removed from your cart.",
                "success"
              );
              refetch(); // 🟢 Update cart items
            } else {
              Swal.fire(
                "Error!",
                "Item could not be deleted.",
                "error"
              );
            }
          })
          .catch(() => {
            Swal.fire(
              "Error!",
              "Something went wrong while deleting.",
              "error"
            );
          });
      }
    });
  };



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
        className={`fixed top-0 right-0 w-auto h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">My Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-2xl">×</button>
        </div>

        {/* Items */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-150px)]">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-600">
                    {item.price} × {item.quantity}
                  </p>
                </div>
                <TiDelete
                  onClick={() => handleDelete(item._id)}
                  className="text-2xl" />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2 border-t space-y-2 -mt-16">
          <div className="flex justify-between text-sm">
            <span>Sub-Total:</span>
            <span>${subTotal}</span>
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
