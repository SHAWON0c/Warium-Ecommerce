import React, { useContext, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Heart, ShoppingBag, User } from "lucide-react";
import electronic1 from '../assets/images/banner/electronics-banner-1.jpg'
import electronic2 from '../assets/images/banner/electronics-banner-2.jpg'
import men from '../assets/images/banner/mens-banner.jpg'
import women from '../assets/images/banner/womens-banner.jpg'
import '../CSS/style.css'
import { Navigate, NavLink } from "react-router";
import CartDrawer from '../Pages/User/Cart';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

import { useNavigate } from "react-router";
import Usecart from '../hooks/Usecart';

const Navbar = () => {
  const {user , logOut}= useContext(AuthContext);
  const [cart]=Usecart();


const navigate = useNavigate();
const handleLogout = () => {
  logOut()
    .then(() => {
      //("Logged out successfully");

      Swal.fire({
        title: "Logged Out",
        icon: "success",
        background: "#f0f0ff",
        color: "#333",
        confirmButtonColor: "#F87171",
        iconColor: "#F87171",
        timer: 1000,
        showConfirmButton: false,
      });

       // Correct way to navigate programmatically
       navigate('/login'); 
    })

    .catch(error => {
      console.error("Logout failed:", error);
    });
};


    const [isCartOpen, setIsCartOpen] = useState(false);
  
  return (

  <div className="">
    {/* Top bar */}


    <div className="flex justify-between items-center px-6 py-2 text-sm w-5/6 mx-auto">
      <div className="flex space-x-2 text-gray-500">
        <FaFacebookF />
        <FaTwitter />
        <FaInstagram />
        <FaLinkedinIn />
      </div>
      <p className="text-gray-600">FREE SHIPPING THIS WEEK ORDER OVER - $55</p>
      <div className="flex space-x-4 text-gray-600">
        <span>USD $</span>
        <span>ENGLISH</span>
      </div>
    </div>
    <div className=' border-b'></div>

    {/* Main Navbar */}
    <div className="flex items-center justify-between  px-6 py-4 w-5/6 mx-auto">
      <h1 className="text-2xl font-bold">Warium</h1>
      <div className="flex-1 mx-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter your product name..."
            className="w-full border border-gray-400 rounded-full px-4 py-2 outline-none"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">[icon ashbe] search</span>
        </div>
      </div>
      <div className="flex space-x-4 text-gray-700">
        {/* User Icon with Dropdown */}
        <div className="relative group">
          <User className="w-6 h-6 cursor-pointer" />
          <div className="absolute w-32 top-full -right-24 z-10 hidden group-hover:flex transition-all duration-400 ease-in-out flex-col space-y-1 bg-white shadow-md border rounded-md p-2 text-md">
            {
              user ? <> <button onClick={handleLogout} className="hover:text-red-400 text-left">Log Out</button> </> :<>
                        <NavLink to="/login"> <button className="hover:text-red-400 text-left">Log In</button></NavLink>
              </>
            }
           
            <NavLink to='/dashboard'><button className="hover:text-red-400 text-left">Dashboard</button></NavLink>
          </div>
        </div>

        {/* Heart Icon with Tooltip */}
        <div className="relative group">
          <Heart className="w-6 h-6 cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">0</span>
          <div className="absolute hidden group-hover:block bg-white shadow-md border rounded-md p-1 top-full right-0 z-10 text-xs transition-all duration-500">
            Wishlist
          </div>
        </div>

        {/* Shopping Bag Icon with Tooltip */}
        <div className="relative group">
          <button
             onClick={() => setIsCartOpen(true)}
           >
            <ShoppingBag 
         
          className="w-6 h-6 cursor-pointer " />
          </button>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">{cart.length}</span>
          <div className="absolute hidden group-hover:block bg-white shadow-md border rounded-md p-1 top-full right-0 z-10 text-xs">
            Left Shopping Cart
          </div>
        </div>
      </div>

    </div>

    {/* Bottom Navigation */}
    <nav className="flex justify-center space-x-8 border-t py-5 text-md font-semibold  relative">
      <div className="group relative inline-block">
        <NavLink to="/" className="text-gray-700 transition-colors duration-300 group-hover:text-red-400">
          HOME
        </NavLink>
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>
      </div>


      {/* CATEGORIES with Mega Menu */}
      <div className="group relative inline-block">
        <a href="#" className="text-gray-700 transition-colors duration-300 group-hover:text-red-400">CATEGORIES</a>
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>
        {/* Mega Menu Panel */}
        <div className=" absolute -left-[32px] -translate-x-1/4 top-full bg-white shadow-lg border mt-5 w-[1320px] rounded-md z-50 transition-all duration-500 ease-in-out opacity-0 invisible group-hover:opacity-100 group-hover:visible
">
          <div className="flex space-x-10 p-6">
            {/* Category columns */}
            <div className="space-y-2 ">
              <h3 className="font-semibold text-lg text-gray-600">Electronics</h3>
              <div className="border-b border-gray-300 w-72"></div>
              <ul className="space-y-4 text-gray-500">
                <li className='hred transition-colors duration-300 '>Desktop</li>
                <li className='hred transition-colors duration-300'>Laptop</li>
                <li className='hred transition-colors duration-300'>Camera</li>
                <li className='hred transition-colors duration-300'>Tablet</li>
                <li className='hred transition-colors duration-300'>Headphone</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-600 ">Men's</h3>

              <div className="border-b border-gray-300 w-72"></div>
              <ul className="space-y-4 text-gray-500 text-md">
                <li className='hred transition-colors duration-300'>Formal</li>
                <li className='hred transition-colors duration-300'>Casual</li>
                <li className='hred transition-colors duration-300'>Sports</li>
                <li className='hred transition-colors duration-300'>Jacket</li>
                <li className='hred transition-colors duration-300'>Sunglasses</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-600">Women's</h3>
              <div className="border-b border-gray-300 w-72"></div>
              <ul className="space-y-4 text-gray-400 ">
                <li className='hred transition-colors duration-300'>Formal</li>
                <li className='hred transition-colors duration-300'>Casual</li>
                <li className='hred transition-colors duration-300'>Perfume</li>
                <li className='hred transition-colors duration-300'>Cosmetics</li>
                <li className='hred transition-colors duration-300'>Bags</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-600">Electronics</h3>
              <div className="border-b border-gray-300 w-72"></div>
              <ul className="space-y-4 text-gray-400">
                <li className='hred transition-colors duration-300'>Smart Watch</li>
                <li className='hred transition-colors duration-300'>Smart TV</li>
                <li className='hred transition-colors duration-300'>Keyboard</li>
                <li className='hred transition-colors duration-300'>Mouse</li>
                <li className='hred transition-colors duration-300'>Microphone</li>
              </ul>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Banner cards */}
          <div className="grid grid-cols-4 gap-4 p-4">
            {/* Card 1 */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <img src={electronic1} alt="Headphone Collection" className="w-full" />
              <div className="p-4 text-center">
                <h4 className="font-semibold">Headphone Collection</h4>
                <p className="text-gray-600 text-sm mb-2">Flat 30% off</p>
                <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700">
                  SHOP NOW
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <img src={electronic2} alt="Men's Fashion" className="w-full" />
              <div className="p-4 text-center">
                <h4 className="font-semibold">Men's Fashion</h4>
                <p className="text-gray-600 text-sm mb-2">Flat 19% off</p>
                <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700">
                  SHOP NOW
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <img src={women} alt="Women's Fashion" className="w-full" />
              <div className="p-4 text-center">
                <h4 className="font-semibold">Women's Fashion</h4>
                <p className="text-gray-600 text-sm mb-2">Flat 35% off</p>
                <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700">
                  SHOP NOW
                </button>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <img src={men} alt="Mouse Collection" className="w-full" />
              <div className="p-4 text-center">
                <h4 className="font-semibold">Mouse Collection</h4>
                <p className="text-gray-600 text-sm mb-2">Flat 50% off</p>
                <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other nav items */}

      <div className='group relative'>
        <a href="#" className="text-gray-700 transition-colors duration-300 group-hover:text-red-400">MEN'S</a>
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>
        <div className='absolute  -translate-x-2 mt-5 bg-white top-full border rounded-lg z-50  transition-all duration-500 ease-in-out opacity-0 invisible group-hover:opacity-100 group-hover:visible'>
          <div className='w-[200px] p-4'>
            <ul className="space-y-2 ">
              <li className=" text-gray-500 hover:text-red-400 cursor-pointer transition-colors duration-300">Shirt</li>
              <li className="text-gray-500 hover:text-red-400 cursor-pointer transition-colors duration-300">Short & jeans</li>
              <li className="text-gray-500 hover:text-red-400 cursor-pointer transition-colors duration-300">Safety shoes</li>
              <li className="text-gray-500 hover:text-red-400 cursor-pointer transition-colors duration-300">Wallet</li>
            </ul>

          </div>
        </div>
      </div>
      <div className='group relative'>
        <a href="#" className="text-gray-700 transition-colors duration-300 group-hover:text-red-400">WOMEN'S</a>
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>
        <div className='absolute  -translate-x-2 mt-5 border bg-white top-full  rounded-lg z-50 transition-all duration-500 ease-in-out opacity-0 invisible group-hover:opacity-100 group-hover:visible'>
          <div className='w-[200px] p-4'>
            <ul className="space-y-2 ">
              <li className="text-gray-500 hover:text-red-400 cursor-pointer transition-colors duration-300">Dress & Frock</li>
              <li className="text-gray-500 hover:text-red-400 cursor-pointer transition-colors duration-300">Earrings</li>
              <li className="text-gray-500 hover:text-red-400 cursor-pointer transition-colors duration-300">Necklace</li>
              <li className="text-gray-500 hover:text-red-400 cursor-pointer transition-colors duration-300">Makeup kit</li>

            </ul>

          </div>
        </div>
      </div>
      <div className='group relative'>
        <a href="#" className="text-gray-700 transition-colors duration-300 group-hover:text-red-400">JEWELRY</a>
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>
        <div className='absolute  -translate-x-2 mt-5 border bg-white top-full  rounded-lg z-50 transition-all duration-500 ease-in-out opacity-0 invisible group-hover:opacity-100 group-hover:visible'>
          <div className='w-[200px] p-4'>
            <ul className="space-y-2 ">
              <li className=" text-gray-500 hover:text-red-400 cursor-pointer  transition-colors duration-300">Earrings</li>
              <li className="text-gray-500 hover:text-red-400 cursor-pointer  transition-colors duration-300">Couple rings</li>
              <li className="text-gray-500 hover:text-red-400 cursor-pointer  transition-colors duration-300">Necklace</li>
              <li className="text-gray-500 hover:text-red-400 cursor-pointer  transition-colors duration-300">Bracelets</li>
            </ul>

          </div>
        </div>
      </div>
      <div className='group relative'>
        <a href="#" className="text-gray-700 transition-colors duration-300 group-hover:text-red-400">PERFUME</a>
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>
        <div className='absolute  -translate-x-2 mt-5 border bg-white top-full  rounded-lg z-50 transition-all duration-500 ease-in-out opacity-0 invisible group-hover:opacity-100 group-hover:visible'>
          <div className='w-[200px] p-4'>
            <ul className="space-y-2 ">
              <li className=" text-gray-500 hover:text-red-400 cursor-pointer  transition-colors duration-3009">Cloths Perfume</li>
              <li className="text-gray-500 hover:text-red-400 cursor-pointer  transition-colors duration-300">Deodorant</li>
              <li className="text-gray-500 hover:text-red-400 cursor-pointer  transition-colors duration-300">Flower Fragrance</li>
              <li className="text-gray-500 hover:text-red-400 cursor-pointer  transition-colors duration-300">Air Freshener</li>
            </ul>

          </div>
        </div>
      </div>
      <div className='group relative inline-block' >
        <a href="#" className="text-gray-700 transition-colors duration-300 group-hover:text-red-400">BLOG</a>
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>
      </div>
      <div className='group relative inline-block'>
        <a href="#" className="text-gray-700 transition-colors duration-300 group-hover:text-red-400e">HOT OFFERS</a>
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>
      </div>
      <NavLink to="/aboutus">

        <p href="#" className="text-gray-700 transition-colors duration-300 group-hover:text-red-400e">ABOUT US</p>
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>

      </NavLink>


      {/* <div className='group relative inline-block'>
        <NavLink to="/login">

          <p href="#" className="text-gray-700 transition-colors duration-300 group-hover:text-red-400e">Login</p>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>

        </NavLink>
      </div> */}
    </nav>

<CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

  </div>
);
}
export default Navbar;
