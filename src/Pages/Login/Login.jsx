import React, { useContext, useState } from 'react';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2'

import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
const Login = () => {

    const { signIn, signInWithGoogle } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    // Step 1: Set up state
    const [formData, setFormData] = useState({
        emailOrPhone: '',
        password: '',
        remember: false
    });

    const axiosPublic = useAxiosPublic();

    // Handle Google login
    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                };
                axiosPublic.post('/users', userInfo)
                    .then((res) => {
                        console.log('User saved:', res.data);
                        navigate(from, { replace: true });
                    })
                    .catch((error) => {
                        console.error('Error saving user:', error);
                    });



            })
            .catch((error) => {
                console.error("Google login failed: ", error.message);
            });
    };

    // Step 2: Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };




    // Step 3: Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // //("Form Data Submitted:", formData);
        const { emailOrPhone, password } = formData;


        signIn(emailOrPhone, password)
            .then(result => {
                const user = result.user;
                //("User signed in:", user);

                //sweet alert2

                Swal.fire({
                    title: "Login Successful ",
                    icon: "success",
                    background: "#f0f0ff",
                    color: "#333",
                    confirmButtonColor: "#F87171",
                    iconColor: "#F87171",
                    timer: 1000,             // Auto-close after 2000 ms (2 seconds)
                    showConfirmButton: false // Hide the confirm button
                });

                navigate(from, { replace: true });



                // Optional: navigate to home or dashboard
            })
            .catch(error => {
                console.error("Login failed:", error.message);

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: 'Check the email and password again',
                    background: "#f0f0ff",
                    confirmButtonColor: "#F87171",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(); // reloads the page
                    }
                });

                // Show toast or error UI
            });


        // You can now send formData to backend or perform validation
    };




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

            <div className="mt-10 bg-white flex items-center justify-center">
                <div className="bg-gray-50 border-spacing-2 rounded-3xl shadow-lg p-10 w-full max-w-3xl mb-10">
                    <h2 className="text-3xl font-bold text-center text-gray-600">Log In</h2>
                    <p className="text-center text-black mt-2 mb-6">Best place to buy and sell digital products</p>

                    <div className="flex justify-between items-center text-sm mb-6">
                        <div className='flex justify-end mx-auto'>
                            <button className="font-medium text-gray-600">Do not have an account?<NavLink to='/register'><u className='text-red-400'>SignUp</u></NavLink> </button>
                        </div>
                        <button className="ml-4 font-medium text-gray-600">Help</button>
                    </div>

                    <hr className="mb-6" />

                    {/* Form Starts */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                name="emailOrPhone"
                                value={formData.emailOrPhone}
                                onChange={handleChange}
                                placeholder="Phone number, username or email"
                                className="flex-1 border border-red-200 rounded-md px-4 py-2 outline-none"
                            />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="flex-1 border border-red-200 rounded-md px-4 py-2 outline-none"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Remember for 30 days
                            </label>
                            <a href="#" className="text-gray-600 underline">Forgot password</a>
                        </div>

                        <button
                            type="submit"
                            className="w-1/2 mx-auto flex justify-center bg-red-400 hover:bg-black hover:text-white transition-colors duration-300 border text-black py-2 rounded-md font-semibold"
                        >
                            Sign in
                        </button>

                        <button
                            type="button"
                            className="w-1/2 mx-auto flex justify-center bg-gray-700 hover:bg-red-400 hover:text-black transition-colors duration-300 text-white py-2 rounded-md font-semibold"
                        >
                            Create New Account
                        </button>
                    </form>

                    <div className="my-4 text-center text-gray-600">Or continue with</div>
                    <div className="flex justify-center gap-4">
                        <FaGoogle onClick={handleGoogleLogin} className="text-2xl text-red-500 cursor-pointer" />
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
