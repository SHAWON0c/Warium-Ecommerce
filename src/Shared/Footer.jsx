import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import paymentCards from '../assets/images/banner/payment.png'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-8">
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 border-b border-gray-700 pb-8">
        {/* Popular Categories */}
        <div>
          <h3 className="text-white font-bold uppercase mb-4 border-b-2 border-red-400 inline-block">
            Popular Categories
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Fashion</li>
            <li>Electronic</li>
            <li>Cosmetic</li>
            <li>Health</li>
            <li>Watches</li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-white font-bold uppercase mb-4 border-b-2 border-red-400 inline-block">
            Products
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Prices Drop</li>
            <li>New Products</li>
            <li>Best Sales</li>
            <li>Contact Us</li>
            <li>Sitemap</li>
          </ul>
        </div>

        {/* Our Company */}
        <div>
          <h3 className="text-white font-bold uppercase mb-4 border-b-2 border-red-400 inline-block">
            Our Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Delivery</li>
            <li>Legal Notice</li>
            <li>Terms And Conditions</li>
            <li>About Us</li>
            <li>Secure Payment</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-bold uppercase mb-4 border-b-2 border-red-400 inline-block">
            Services
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Prices Drop</li>
            <li>New Products</li>
            <li>Best Sales</li>
            <li>Contact Us</li>
            <li>Sitemap</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold uppercase mb-4 border-b-2 border-red-400 inline-block">
            Contact
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start">
              <FaMapMarkerAlt className="mr-2 mt-1" />
              419 State 414 Rte Beaver Dams, New York(NY), 14812, USA
            </li>
            <li className="flex items-center">
              <FaPhoneAlt className="mr-2" />
              (607) 936-8058
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" />
              Example@Gmail.Com
            </li>
          </ul>
        </div>
      </div>

      {/* Payment Icons & Copyright */}
      <div className="flex flex-col items-center justify-center space-y-4 mt-10 ">
        <div>
          <img src={paymentCards} alt="" />
        </div>
        <p className="text-sm text-gray-400">
          Copyright © Anon All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
