import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const VendorUpload = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...fileURLs].slice(0, 6)); // Limit to 6 images
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-[1320px] mx-auto mt-10 mb-10">
      {/* Product Form */}
      <div className="col-span-4 justify-center border rounded-md bg-white p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Image Upload */}
          <div>
            <div className="border p-4 rounded-md mb-4">
              {/* Main Upload Area */}
              <div className="w-full h-80 flex items-center justify-center bg-gray-100 rounded-md relative overflow-hidden">
                {images[0] ? (
                  <img
                    src={images[0]}
                    alt="Main"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-gray-400 text-center">
                    765 X 850 <br />
                    Please choose image according to the aspect ratio
                  </p>
                )}

                {/* Upload Icon */}
                <label className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-200">
                  <FaPlus className="text-blue-600" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-20 bg-gray-100 flex items-center justify-center rounded-md relative overflow-hidden"
                  >
                    {images[i] ? (
                      <>
                        <img
                          src={images[i]}
                          alt={`Thumb ${i}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(i)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full text-xs px-1"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <p className="text-xs text-gray-400 text-center">
                        765 X 850
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form Inputs */}
          <div className="space-y-4">
            {/* Product Name & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Product Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Select Categories
                </label>
                <select className="w-full border rounded-md px-3 py-2">
                  <option>Laptop</option>
                </select>
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Short Description
              </label>
              <textarea
                className="w-full border rounded-md px-3 py-2"
                rows={3}
                placeholder="Description"
              ></textarea>
            </div>

            {/* Colors & Size */}
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Colors
                </label>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-pink-500 cursor-pointer"></div>
                  <div className="w-6 h-6 rounded-full bg-green-500 cursor-pointer"></div>
                  <div className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer"></div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Size
                </label>
                <div className="flex gap-2">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <label key={size} className="flex items-center gap-1">
                      <input type="checkbox" /> {size}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Price (In USD)
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Price"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Quantity
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Quantity"
                />
              </div>
            </div>

            {/* Full Detail */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Full Detail
              </label>
              <textarea
                className="w-full border rounded-md px-3 py-2"
                rows={4}
                placeholder="Full Details"
              ></textarea>
            </div>

            {/* Tags */}
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

export default VendorUpload;
