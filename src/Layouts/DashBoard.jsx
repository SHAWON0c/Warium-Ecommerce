import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
const DashBoard = () => {
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-[1320px] mx-auto mt-10 mb-10 ">
                {/* Sidebar */}
                <div className="col-span-1 border rounded-md bg-white h-[270px] sticky top-4">
                    <ul className="p-4 space-y-4">
                        <li className="border-b pb-2 cursor-pointer hover:text-red-400">
                            <Link to="/dashboard" className="block hover:text-red-500">Dashboard</Link>
                        </li>
                        <li className="border-b pb-2 cursor-pointer hover:text-red-400">
                            <Link to="/dashboard/makeadmin" className="block hover:text-red-500">Make Admin</Link>
                        </li>
                        <li className="border-b pb-2 cursor-pointer hover:text-red-400">
                            <Link to="/profile/history" className="block hover:text-red-500">PublicProfile</Link>
                        </li>

                        <li className="border-b pb-2 cursor-pointer hover:text-red-400">
                            <Link to="/profile/history" className="block hover:text-red-500">Uploads</Link>
                        </li>
                        <li className="border-b pb-2 cursor-pointer hover:text-red-400">
                            <Link to="/profile/history" className="block hover:text-red-500">Tract Shipping</Link>
                        </li>
                        <li className="border-b pb-2 cursor-pointer hover:text-red-400">
                            <Link to="/profile/history" className="block hover:text-red-500">Setting</Link>
                        </li>


                    </ul>
                </div>

                {/* Product Form */}
                <div className="col-span-3 border rounded-md bg-white p-6 sticky ">
                    <Outlet></Outlet>

                </div>
            </div>
        </div>
    );
};

export default DashBoard;