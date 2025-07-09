import React from 'react';

const VendorUplaod = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-[1320px] mx-auto mt-10 mb-10">
            {/* Sidebar */}
            <div className="col-span-1 border rounded-md bg-white max-h-64">
                <ul className="p-4 space-y-4">
                    <li className="border-b pb-2 cursor-pointer hover:text-red-400">Dashboard</li>
                    <li className="border-b pb-2 cursor-pointer hover:text-red-400">Public Profile</li>
                    <li className=" border-b pb-2 cursor-pointer hover:text-red-400">Uploads</li>
                    <li className=" border-b pb-2 cursor-pointer hover:text-red-400">Track Shipping</li>
                    <li className=" cursor-pointer hover:text-blue-500">Settings (Edit)</li>
                </ul>
            </div>

            {/* Product Form */}
            <div className="col-span-3 border rounded-md bg-white p-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Left: Image Upload */}
                    <div>
                        <div className="border p-4 rounded-md mb-4">
                            <div className="w-full h-80 flex items-center justify-center bg-gray-100 rounded-md">
                                <p className="text-gray-400 text-center">
                                    765 X 850 <br />
                                    Please choose image according to the aspect ratio
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-full h-20 bg-gray-100 flex items-center justify-center rounded-md"
                                    >
                                        <p className="text-xs text-gray-400 text-center">
                                            765 X 850 <br />x btn
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Form Inputs */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Product Name</label>
                                <input
                                    type="text"
                                    className="w-full border rounded-md px-3 py-2"
                                    placeholder="Product Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Select Categories</label>
                                <select className="w-full border rounded-md px-3 py-2">
                                    <option>Laptop</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Sort Description</label>
                            <textarea
                                className="w-full border rounded-md px-3 py-2"
                                rows={3}
                                placeholder="Description"
                            ></textarea>
                        </div>

                        <div className="flex items-center gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Colors</label>
                                <div className="flex gap-2">
                                    <div className="w-6 h-6 rounded-full bg-pink-500 cursor-pointer"></div>
                                    <div className="w-6 h-6 rounded-full bg-green-500 cursor-pointer"></div>
                                    <div className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer"></div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Size</label>
                                <div className="flex gap-2">
                                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                                        <label key={size} className="flex items-center gap-1">
                                            <input type="checkbox" /> {size}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Price (In USD)</label>
                                <input
                                    type="text"
                                    className="w-full border rounded-md px-3 py-2"
                                    placeholder="Price"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Quantity</label>
                                <input
                                    type="text"
                                    className="w-full border rounded-md px-3 py-2"
                                    placeholder="Quantity"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Full Detail</label>
                            <textarea
                                className="w-full border rounded-md px-3 py-2"
                                rows={4}
                                placeholder="Full Details"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                Product Tags (comma separated)
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2"
                                placeholder="Tags"
                            />
                        </div>

                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorUplaod;