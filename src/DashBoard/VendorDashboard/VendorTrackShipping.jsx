import React from 'react';
import { FaTruck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const shippingSteps = ['Order Placed', 'Processed', 'Shipped', 'Out for Delivery', 'Delivered'];

// Example order data
const orders = [
  {
    id: 'ORD123456',
    customer: 'John Doe',
    product: 'Wireless Headphones',
    statusIndex: 2, // index in shippingSteps
  },
  {
    id: 'ORD123457',
    customer: 'Jane Smith',
    product: 'Smart Watch',
    statusIndex: 3,
  },
];

const VendorTrackShipping = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Track Shipping</h1>

      <div className="bg-white shadow-lg rounded-2xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">Shipping Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-700">{order.id}</td>
                  <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500">{order.product}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {shippingSteps.map((step, index) => (
                        <div key={step} className="flex items-center gap-1">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              index <= order.statusIndex
                                ? 'bg-blue-600 border-blue-600'
                                : 'border-gray-300'
                            }`}
                          >
                            {index < order.statusIndex && <FaCheckCircle className="text-white text-xs" />}
                          </div>
                          <span
                            className={`text-xs ${
                              index <= order.statusIndex ? 'text-gray-800 font-semibold' : 'text-gray-400'
                            }`}
                          >
                            {step}
                          </span>
                          {index < shippingSteps.length - 1 && (
                            <div
                              className={`h-1 flex-1 ${
                                index < order.statusIndex ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                            ></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500 font-medium">
                    No shipping orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorTrackShipping;
