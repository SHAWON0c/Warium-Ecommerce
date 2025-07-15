import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const FooterWhite = () => {
  return (
    <footer className="bg-white border-t text-gray-600 text-sm">
      <div className="max-w-[1320px] mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo & Contact Info */}
        <div className="space-y-4 col-span-2">
          <div className="flex items-center space-x-2">
            <img
              src="https://i.ibb.co/j5vYmcg/logo.png" // Replace with your logo
              alt="Ekka"
              className="w-8 h-8"
            />
            <span className="font-semibold text-lg text-gray-800">Ekka</span>
          </div>
          <p>71 Pilgrim Avenue Chevy Chase, east california.</p>
          <p><strong>Call Us:</strong> +44 0123 456 789</p>
          <p><strong>Email:</strong> example@ec-email.com</p>
          <div className="flex space-x-4 pt-2 text-gray-500">
            <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
            <FaTwitter className="hover:text-sky-500 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaLinkedinIn className="hover:text-blue-800 cursor-pointer" />
          </div>
        </div>

        {/* Information */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 mb-1">Information</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-blue-600">About us</a></li>
            <li><a href="#" className="hover:text-blue-600">FAQ</a></li>
            <li><a href="#" className="hover:text-blue-600">Delivery Information</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact us</a></li>
          </ul>
        </div>

        {/* Account */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 mb-1">Account</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-blue-600">My Account</a></li>
            <li><a href="#" className="hover:text-blue-600">Order History</a></li>
            <li><a href="#" className="hover:text-blue-600">Wish List</a></li>
            <li><a href="#" className="hover:text-blue-600">Specials</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 mb-1">Services</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-blue-600">Discount Returns</a></li>
            <li><a href="#" className="hover:text-blue-600">Policy & policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Customer Service</a></li>
            <li><a href="#" className="hover:text-blue-600">Term & condition</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-4 px-4 text-center flex flex-col md:flex-row items-center justify-between max-w-[1320px] mx-auto">
        <p className="text-gray-500">&copy; 2025 <span className="text-blue-600 font-semibold">EKKA</span>. All Rights Reserved</p>
        <div className="flex gap-2 mt-2 md:mt-0">
          <img src="https://i.ibb.co/GcwT1Pj/visa.png" alt="Visa" className="h-6" />
          <img src="https://i.ibb.co/rQDvYsm/paypal.png" alt="Paypal" className="h-6" />
          <img src="https://i.ibb.co/qJzKr7Z/skrill.png" alt="Skrill" className="h-6" />
          <img src="https://i.ibb.co/1RjSFKj/mastercard.png" alt="MasterCard" className="h-6" />
          <img src="https://i.ibb.co/KGcg7Ky/visa-electron.png" alt="Visa Electron" className="h-6" />
        </div>
      </div>
    </footer>
  );
};

export default FooterWhite;
