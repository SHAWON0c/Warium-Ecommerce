import React from 'react';
import profile_bg from '../../assets/images/banner/profile-bg.jpg'; // or .png, .webp, etc.

import { FaEdit } from 'react-icons/fa';
const UserProfile = () => {
    return (
        <div>
            <div className="space-y-6 relative">
                {/* Banner Image */}
                <div className="relative">
                    <img
                        src={profile_bg}
                        alt="Profile Banner"
                        className="w-full h-48 object-cover rounded"
                    />
                    <button className="absolute top-3 right-3 bg-red-400 text-gray-700 font-semibold px-4 py-2 text-sm rounded">
                        Edit Detail
                    </button>

                    {/* Avatar */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-32 flex flex-col items-center">
                        <img
                            src="https://i.pravatar.cc/150"
                            alt="avatar"
                            className="w-28 h-28 rounded-full border-8 border-white shadow-lg"
                        />
                    </div>
                </div>

                {/* User Info */}
                <div className=" pt-8 text-center">
                    <h2 className="text-xl font-semibold">MARIANA JOHNS</h2>
                    <p className="text-gray-500">( Business Man )</p>
                </div>
            </div>

            <p>hello name !</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, nobis? Architecto atque pariatur commodi nisi nostrum alias repellendus ullam voluptate magnam corporis non cupiditate necessitatibus, minus facilis mollitia in! Neque!</p>
            <div className=' border-b border-gray-100 mt-2 mb-2'></div>

            <h1>ACCOUNT INFORMATION</h1>
            <div className="flex justify-between gap-x-8">
                <div className="w-1/2">
                    <h1 className="font-semibold text-md text-gray-600 bg-gray-200 p-2 text-left flex items-center justify-between">
                        E-mail Address <FaEdit />
                    </h1>
                    <div className="mt-2 space-y-1">
                        <p className="text-gray-400">Email1: support1@gmail.com</p>
                        <p className="text-gray-400">Email2: support2@gmail.com</p>
                    </div>
                </div>

                <div className="w-1/2">
                   <h1 className="font-semibold text-md text-gray-600 bg-gray-200 p-2 text-left flex items-center justify-between">
                        E-mail Address <FaEdit />
                    </h1>
                    <div className="mt-2 space-y-1">
                        <p className="text-gray-400">Email1: support3@gmail.com</p>
                        <p className="text-gray-400">Email2: support4@gmail.com</p>
                    </div>
                </div>

                
            </div>

              <div className="flex justify-between gap-x-8 mt-10">
                <div className="w-1/2">
                    <h1 className="font-semibold text-md text-gray-600 bg-gray-200 p-2 text-left flex items-center justify-between">
                        E-mail Address <FaEdit />
                    </h1>
                    <div className="mt-2 space-y-1">
                        <p className="text-gray-400">Email1: support1@gmail.com</p>
                        <p className="text-gray-400">Email2: support2@gmail.com</p>
                    </div>
                </div>

                <div className="w-1/2">
                   <h1 className="font-semibold text-md text-gray-600 bg-gray-200 p-2 text-left flex items-center justify-between">
                        E-mail Address <FaEdit />
                    </h1>
                    <div className="mt-2 space-y-1">
                        <p className="text-gray-400">Email1: support3@gmail.com</p>
                        <p className="text-gray-400">Email2: support4@gmail.com</p>
                    </div>
                </div>

                
            </div>



        </div>
    );
};

export default UserProfile;