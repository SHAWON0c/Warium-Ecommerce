import React, { useState } from "react";

export default function CheckoutPage() {
  const [coupon, setCoupon] = useState("");
  const [delivery, setDelivery] = useState("free");
  const [payment, setPayment] = useState("cod");

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* New Customer */}
        

        {/* Returning Customer */}
      

        {/* Billing Details */}
        <div className="border rounded-lg p-5 shadow-sm">
          <h2 className="font-semibold mb-3">Billing Details</h2>
          <div className="flex items-center space-x-6 mb-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="addressType" />
              <span>I want to use an existing address</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="addressType" defaultChecked />
              <span>I want to use new address</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border p-2 rounded" placeholder="First Name *" />
            <input className="border p-2 rounded" placeholder="Last Name *" />
          </div>
          <input
            className="border p-2 rounded w-full mt-3"
            placeholder="Address Line 1"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <input className="border p-2 rounded" placeholder="City *" />
            <input className="border p-2 rounded" placeholder="Post Code" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <input className="border p-2 rounded" placeholder="Country *" />
            <input className="border p-2 rounded" placeholder="Region/State" />
          </div>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            PLACE ORDER
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="space-y-6">
        {/* Summary */}
        <div className="border rounded-lg p-5 shadow-sm">
          <h2 className="font-semibold mb-3">Summary</h2>
          <div className="flex justify-between">
            <span>Sub-Total</span>
            <span>$80.00</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges</span>
            <span>$80.00</span>
          </div>
          <div className="flex justify-between text-red-500">
            <span>Coupon Discount</span>
            <button className="text-blue-600 text-sm">Apply Coupon</button>
          </div>
          <div className="flex justify-between font-semibold mt-2">
            <span>Total Amount</span>
            <span>$80.00</span>
          </div>

          {/* Example Products */}
          <div className="mt-4 border-t pt-3 space-y-3">
            <div className="flex space-x-3">
              <img
                src="https://via.placeholder.com/60"
                alt="product"
                className="w-14 h-14 rounded"
              />
              <div>
                <p className="font-medium">Baby toy teddy bear</p>
                <p className="text-sm text-gray-500">
                  <del>$90.00</del> <span className="text-red-500">$60.00</span>
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <img
                src="https://via.placeholder.com/60"
                alt="product"
                className="w-14 h-14 rounded"
              />
              <div>
                <p className="font-medium">Smart 1 watch 2GB</p>
                <p className="text-sm text-gray-500">
                  <del>$70.00</del> <span className="text-red-500">$50.00</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Method */}
        <div className="border rounded-lg p-5 shadow-sm">
          <h2 className="font-semibold mb-3">DELIVERY METHOD</h2>
          <label className="flex items-center space-x-2 mb-2">
            <input
              type="radio"
              name="delivery"
              checked={delivery === "free"}
              onChange={() => setDelivery("free")}
            />
            <span>Free Shipping ($0.00)</span>
          </label>
          <label className="flex items-center space-x-2 mb-2">
            <input
              type="radio"
              name="delivery"
              checked={delivery === "flat"}
              onChange={() => setDelivery("flat")}
            />
            <span>Flat Rate ($5.00)</span>
          </label>
          <textarea
            placeholder="Add Comments About Your Order"
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Payment Method */}
        <div className="border rounded-lg p-5 shadow-sm">
          <h2 className="font-semibold mb-3">PAYMENT METHOD</h2>
          <label className="flex items-center space-x-2 mb-2">
            <input
              type="radio"
              name="payment"
              checked={payment === "cod"}
              onChange={() => setPayment("cod")}
            />
            <span>Cash On Delivery</span>
          </label>
          <textarea
            placeholder="Add Comments About Your Order"
            className="border w-full p-2 rounded"
          />
          <div className="flex items-center space-x-2 mt-3">
            <input type="checkbox" />
            <span className="text-sm">
              I have read and agree to the{" "}
              <a href="#" className="text-blue-600 underline">
                Terms & Conditions
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
