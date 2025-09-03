import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import UseAuth from "../../hooks/UseAuth";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

// Expanded color palette
const colorPalette = {
  Red: "bg-red-500",
  Blue: "bg-blue-500",
  Green: "bg-green-500",
  Yellow: "bg-yellow-500",
  Purple: "bg-purple-500",
  Pink: "bg-pink-500",
  Black: "bg-black",
  White: "bg-white border",
  Gray: "bg-gray-500",
  Orange: "bg-orange-500",
};

const VendorUpload = () => {
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("shirts");
  const [shortDesc, setShortDesc] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [labelType, setLabelType] = useState("New");
  const [quantity, setQuantity] = useState("");
  const [fullDetail, setFullDetail] = useState("");
  const [tags, setTags] = useState("");
  const { user } = UseAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const [isEdit, setIsEdit] = useState(false);
  const [productId, setProductId] = useState(null);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (typeof img !== "string") URL.revokeObjectURL(img);
      });
    };
  }, [images]);

  // Fetch product if ID exists
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const res = await axiosSecure.get(`/products/${id}`);
        const product = res.data;

        setIsEdit(true);
        setProductId(product._id);
        setProductName(product.productName);
        setCategory(product.category);
        setShortDesc(product.shortDesc);
        setSelectedColors(product.colors || []);
        setSizes(product.sizes || []);
        setPrice(product.price);
        setOldPrice(product.oldPrice);
        setDiscount(product.discount);
        setLabelType(product.labelType || "New");
        setQuantity(product.quantity);
        setFullDetail(product.fullDetail);
        setTags((product.tags || []).join(","));
        setImages(product.images?.[0]|| []);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        alert("Failed to load product data");
      }
    };

    fetchProduct();
  }, [id, axiosSecure]);

  // Handle image selection
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files].slice(0, 6));
    e.target.value = null;
  };

  // Remove selected image
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Toggle size selection
  const handleSizeChange = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Toggle color selection
  const handleColorChange = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user?.email) {
    alert("User not logged in!");
    return;
  }

  try {
    const productData = {
      userEmail: user.email,
      productName,
      category,
      shortDesc,
      colors: selectedColors,
      sizes,
      price,
      oldPrice,
      discount,
      labelType,
      quantity,
      fullDetail,
      tags: tags.split(",").map((t) => t.trim()),
      images: images, // keep existing images as-is
    };

    if (isEdit) {
      await axiosSecure.put(`/products/${productId}`, productData);
      alert("Product updated successfully!");
    } else {
      await axiosSecure.post("/products", productData);
      alert("Product uploaded successfully!");
    }

    // Reset form (optional)
    setProductName("");
    setCategory("shirts");
    setShortDesc("");
    setSelectedColors([]);
    setSizes([]);
    setPrice("");
    setOldPrice("");
    setDiscount("");
    setLabelType("New");
    setQuantity("");
    setFullDetail("");
    setTags("");
    setIsEdit(false);
    setProductId(null);

  } catch (error) {
    console.error("Error saving product:", error);
    alert("Failed to save product.");
  }
};


  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-[1320px] mx-auto mt-10 mb-10">
      <div className="col-span-4 justify-center border rounded-md bg-white p-6">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* Left: Image Upload */}
          <div>
            <div className="border p-4 rounded-md mb-4">
              <div className="w-full h-80 flex items-center justify-center bg-gray-100 rounded-md relative overflow-hidden">
                {images[0] ? (
                  <img
                    src={
                      typeof images[0] === "string"
                        ? images[0]
                        : URL.createObjectURL(images[0])
                    }
                    alt="Main"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-gray-400 text-center">
                    765 X 850 <br />
                    Please choose image according to the aspect ratio
                  </p>
                )}
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
                          src={
                            typeof images[i] === "string"
                              ? images[i]
                              : URL.createObjectURL(images[i])
                          }
                          alt={`Thumb ${i}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full text-xs px-1"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <p className="text-xs text-gray-400 text-center">765 X 850</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form Inputs */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Product Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Select Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option>JACKETS</option>
                  <option>T-SHIRT</option>
                  <option>SPORTS</option>
                  <option>JEWELLERY</option>
                  <option>PERFUME</option>
                  <option>COSMETICS</option>
                  <option>PARTY WEAR</option>
                  <option>WATCH</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Short Description
              </label>
              <textarea
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                rows={3}
                placeholder="Description"
              ></textarea>
            </div>

            {/* Colors & Sizes */}
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Colors</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(colorPalette).map(([name, className]) => (
                    <div
                      key={name}
                      title={name}
                      onClick={() => handleColorChange(name)}
                      className={`w-6 h-6 rounded-full cursor-pointer ${className} ${
                        selectedColors.includes(name) ? "ring-2 ring-black" : ""
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Size</label>
                <div className="flex gap-2">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <label key={size} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={sizes.includes(size)}
                        onChange={() => handleSizeChange(size)}
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Price, Quantity, Old Price, Discount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Price (USD)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Price"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Quantity"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Old Price (USD)</label>
                <input
                  type="number"
                  value={oldPrice}
                  onChange={(e) => setOldPrice(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Old Price"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Discount (%)</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="20, 30, etc."
                />
              </div>
            </div>

            {/* Label Type */}
            <div>
              <label className="block text-sm font-semibold mb-1">Label Type</label>
              <select
                value={labelType}
                onChange={(e) => setLabelType(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              >
                <option>New</option>
                <option>SALE</option>
              </select>
            </div>

            {/* Full Detail */}
            <div>
              <label className="block text-sm font-semibold mb-1">Full Detail</label>
              <textarea
                value={fullDetail}
                onChange={(e) => setFullDetail(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                rows={4}
                placeholder="Full Details"
              ></textarea>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold mb-1">Product Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Tags"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700"
            >
              {isEdit ? "Update Product" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorUpload;
