// src/pages/Login.jsx
import React from 'react';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';

const Login = () => {
    return (


        <div>
            <div className="w-full bg-gray-100 border">
                <div className="h-[55px] max-w-[1320px] mx-auto flex justify-between items-center px-4">
                    <h1 className="text-lg font-semibold">Login</h1>
                    <nav className="flex items-center text-md text-gray-600 space-x-1 gap-2">
                        <span>Home</span>
                        <span className="mx-1 text-lg text-red-400">››</span>
                        <span className='text-red-400'>Login</span>
                    </nav>
                </div>
            </div>

            <div className=" mt-10 bg-white flex items-center justify-center ">
                <div className="bg-gray-50 border-spacing-2 rounded-3xl shadow-lg p-10 w-full max-w-3xl mb-10">
                    <h2 className="text-3xl font-bold text-center text-gray-600">Log In</h2>
                    <p className="text-center text-black mt-2 mb-6"> best place to buy and sell digital products</p>
                    {/* Sign up / Help */}
                    <div className="flex justify-between items-center text-sm mb-6">
                        <div className='flex justify-end mx-auto'>
                            <button className="font-medium text-gray-600">Do not have an account? <u className='text-red-400'>SignUp</u></button>

                        </div>
                        <button className="ml-4 font-medium text-gray-600">Help</button>
                        {/* <a href="#" className="flex items-center text-gray-600 underline">
                            <span className="mr-1">how to register</span>
                            <span className="bg-yellow-400 p-1 rounded-md ml-1">▶️</span>
                        </a> */}
                    </div>

                    <hr className="mb-6" />

                    {/* Login Form */}
                    <form className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Phone number, username or email"
                                className="flex-1 border border-red-200 rounded-md px-4 py-2 outline-none"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="flex-1 border border-red-200 rounded-md px-4 py-2 outline-none"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                Remember for 30 days
                            </label>
                            <a href="#" className="text-gray-600 underline">
                                Forgot password
                            </a>
                        </div>

                        <button className="w-1/2  mx-auto flex justify-center bg-red-400 hover:bg-black hover:text-white transition-colors duration-300 border text-black py-2 rounded-md font-semibold">
                            Sign in
                        </button>
                        <button className="w-1/2  mx-auto flex justify-center bg-gray-700 hover:bg-red-400 hover:text-black transition-colors duration-300 text-white py-2 rounded-md font-semibold">
                            Create New Account
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
                        By clicking button above, you agree to our{' '}
                        <span className="underline cursor-pointer">terms of use</span> and{' '}
                        <span className="underline cursor-pointer">privacy policies</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
