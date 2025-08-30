import React from "react";
import Usecart from "../../hooks/Usecart";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const CartDrawer = ({ isOpen, onClose }) => {
  const [cart, , , refetch] = Usecart();
  const axiosSecure = UseAxiosSecure();

  const subTotal = cart.reduce((acc, item) => acc + parseFloat(item.price.replace('$', '')) * item.quantity, 0);
  const vat = subTotal * 0.2;
  const total = subTotal + vat;

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
              Swal.fire("Deleted!", "Item removed from cart.", "success");
              refetch();
            } else {
              Swal.fire("Error!", "Item could not be deleted.", "error");
            }
          })
          .catch(() => Swal.fire("Error!", "Something went wrong.", "error"));
      }
    });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-[420px] h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">My Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-3xl font-bold transition-colors">×</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 mt-20">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img src={item.images[0]} alt={item.productName} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="text-gray-800 font-medium">{item.productName}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
                <TiDelete
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 text-2xl cursor-pointer hover:text-red-700 transition-colors"
                />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-5 bg-white sticky bottom-0">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Sub-Total:</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 text-sm">
              <span>VAT (20%):</span>
              <span>${vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-800 font-semibold text-lg border-t border-gray-200 pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              View Cart
            </button>
            <button className="flex-1 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
