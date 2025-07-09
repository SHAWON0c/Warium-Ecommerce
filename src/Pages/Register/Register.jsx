import React from 'react';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';

const Register = () => {
  return (
    <div>
      <div>
        <div className="w-full bg-gray-100 border">
          <div className="h-[55px] max-w-[1320px] mx-auto flex justify-between items-center px-4">
            <h1 className="text-lg font-semibold">Login</h1>
            <nav className="flex items-center text-md text-gray-600 space-x-1 gap-2">
              <span>Home</span>
              <span className="mx-1 text-lg text-red-400">››</span>
              <span className="text-red-400">Register</span>
            </nav>
          </div>
        </div>

        <div className="mt-10 bg-white flex items-center justify-center">
          <div className="bg-gray-50 border-spacing-2 rounded-3xl shadow-lg p-10 w-full max-w-3xl mb-10">
            <h2 className="text-3xl font-bold text-center text-gray-600">Register</h2>
            <p className="text-center text-black mt-2 mb-6">
              Best place to buy and sell digital products
            </p>

            {/* Navigation Links */}
            <div className="flex justify-between items-center text-sm mb-6">
              <div className="flex justify-end mx-auto">
                <button className="font-medium text-gray-600">
                  Already have an account?{' '}
                  <u className="text-red-400 cursor-pointer">Sign In</u>
                </button>
              </div>
              <button className="ml-4 font-medium text-gray-600">Help</button>
            </div>

            <hr className="mb-6" />

            {/* Register Form */}
            <form className="space-y-4">
              <div className="flex flex-col gap-4">
                {/* First Row: First Name, Last Name */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p>First Name*</p>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full border border-red-200 rounded-md px-4 py-2 outline-none"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <p>Last Name*</p>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full border border-red-200 rounded-md px-4 py-2 outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Second Row: Email, Phone */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p>Email*</p>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full border border-red-200 rounded-md px-4 py-2 outline-none"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <p>Phone*</p>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full border border-red-200 rounded-md px-4 py-2 outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Third Row: Password, Confirm Password */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p>Password*</p>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full border border-red-200 rounded-md px-4 py-2 outline-none"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <p>Confirm Password*</p>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      className="w-full border border-red-200 rounded-md px-4 py-2 outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center text-sm">
                <input type="checkbox" className="mr-2" required />
                <span>
                  I agree to the{' '}
                  <span className="underline cursor-pointer text-red-400">
                    terms and conditions
                  </span>
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-red-400 hover:bg-black hover:text-white transition-colors duration-300 border text-black py-2 rounded-md font-semibold"
              >
                Register Account
              </button>
            </form>

            {/* Social Logins */}
            <div className="my-4 text-center text-gray-600">Or continue with</div>
            <div className="flex justify-center gap-4">
              <FaGoogle className="text-2xl text-red-500 cursor-pointer" />
              <FaFacebook className="text-2xl text-blue-700 cursor-pointer" />
              <FaTwitter className="text-2xl text-blue-700 cursor-pointer" />
            </div>

            <p className="text-xs text-center mt-4 text-gray-500">
              By clicking the button above, you agree to our{' '}
              <span className="underline cursor-pointer">terms of use</span> and{' '}
              <span className="underline cursor-pointer">privacy policies</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
