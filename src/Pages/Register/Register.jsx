import React, { useContext, useState } from 'react';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const Register = () => {

  const axiosPublic = useAxiosPublic();


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const { createUser } = useContext(AuthContext);


  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!formData.agree) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    // Create user with email and password
    createUser(formData.email, formData.password)
      .then((result) => {
        const loggedUser = result.user;
        //('User Registered:', loggedUser);
        const userInfo =
        {
          name: formData.firstName,
          email: formData.email
        }

        
        axiosPublic.post('/users', userInfo)
          .then(res => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "user created successfully ",
                showConfirmButton: false,
                timer: 1500
              });
            }
          })

        alert('Registration successful!');
      })
      .catch((error) => {
        console.error('Registration Error:', error.message);
        alert(error.message);
      });
  };

  return (
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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              {/* First Row: First Name, Last Name */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <p>First Name*</p>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full border border-red-200 rounded-md px-4 py-2 outline-none"
                    required
                  />
                </div>
                <div className="flex-1">
                  <p>Last Name*</p>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full border border-red-200 rounded-md px-4 py-2 outline-none"
                    required
                  />
                </div>
                <div className="flex-1">
                  <p>Phone*</p>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full border border-red-200 rounded-md px-4 py-2 outline-none"
                    required
                  />
                </div>
                <div className="flex-1">
                  <p>Confirm Password*</p>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full border border-red-200 rounded-md px-4 py-2 outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center text-sm">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mr-2"
                required
              />
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
  );
};

export default Register;
