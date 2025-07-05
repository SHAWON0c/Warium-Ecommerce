import React from "react";
import { FaRocket, FaPhoneAlt, FaUndoAlt, FaMoneyBillWave, FaGlobe } from "react-icons/fa";
import author from "../assets/images/banner/testimonial-1.jpg"
import ctabanner from "../assets/images/banner/cta-banner.jpg";
import quotes from "../assets/images/icons/quotes.svg";
const TestimonialServices = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10 items-start mx-auto">
      {/* Testimonial Section */}
      <div className="md:col-span-1 md:col-start-1">
        <h3 className="font-bold text-lg mb-4 text-left border-b pb-2">Testimonial</h3>
        <div className="bg-white shadow rounded-lg p-8 text-center border flex flex-col justify-between h-full mt-10">
          <div className="max-w-[310px] max-h-[366px] text-center mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-pink-200 mb-4 flex items-center justify-center">
                <img className="rounded-full" src={author} alt="" />
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-1">ALAN DOE</h4>
              <p className="text-gray-500 text-sm mb-4">CEO & Founder Invision</p>
              <div className="text-pink-400 text-lg mb-2">
                <img className="w-6 h-6" src={quotes} alt="" />
              </div>
              <p className="text-gray-600 text-lg px-10">
                Lorem ipsum dolor sit amet consectetur.
                Lorem ipsum dolor sit amet.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summer Collection Section */}
      <div className="md:col-span-2">
        <div
          className="relative rounded-lg shadow overflow-hidden flex items-center justify-center w-[640px] h-[444px] bg-cover bg-center"
          style={{ backgroundImage: `url(${ctabanner})` }}
        >

          <div className=" border border-gray-300 text-center relative z-10 bg-gray-100 bg-opacity-75 p-4 rounded-lg">

            <h1 className=" text-red-800 w-32 mx-auto mb-2">25% Discount </h1>

            <h2 className="text-2xl font-bold mb-2">Summer Collection</h2>
            <p className="text-gray-600 mb-4 text-lg ">Starting at $10</p>
            <p className="font-bold text-gray-700 cursor-pointer w-32 bg-red-400 mx-auto rounded-lg hover:bg-black hover:text-white transition-colors duration-300 ">SHOP NOW</p>
          </div>

        </div>
      </div>



      {/* Our Services Section */}
      <div className="md:col-span-1">
        <h3 className="font-bold text-lg mb-4 text-left border-b pb-2">Our Services </h3>

        <div className="bg-white mt-10 shadow rounded-lg p-8 border flex flex-col justify-between h-full">
          <div>
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Our Services</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <FaGlobe className="text-red-400 mt-1" size={18} />
                <div>
                  <p className="font-semibold">Worldwide Delivery</p>
                  <p className="text-sm text-gray-500">For Order Over $100</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaRocket className="text-red-400 mt-1" size={18} />
                <div>
                  <p className="font-semibold">Next Day Delivery</p>
                  <p className="text-sm text-gray-500">UK Orders Only</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-red-400 mt-1" size={18} />
                <div>
                  <p className="font-semibold">Best Online Support</p>
                  <p className="text-sm text-gray-500">Hours: 8AM - 11PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaUndoAlt className="text-red-400 mt-1" size={18} />
                <div>
                  <p className="font-semibold">Return Policy</p>
                  <p className="text-sm text-gray-500">Easy & Free Return</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaMoneyBillWave className="text-red-400 mt-1" size={18} />
                <div>
                  <p className="font-semibold">30% Money Back</p>
                  <p className="text-sm text-gray-500">For Order Over $100</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
};

export default TestimonialServices;
