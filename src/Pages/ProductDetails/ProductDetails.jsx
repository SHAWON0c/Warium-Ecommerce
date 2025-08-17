// src/components/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaRegStar,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaPinterestP,
  FaWhatsapp,
} from "react-icons/fa";
import { BiMinus, BiPlus, BiShoppingBag, BiHeart, BiShow } from "react-icons/bi";
import axios from "axios";

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get product from state or sessionStorage
  const [product, setProduct] = useState(location.state?.product || null);

  // Qty, size, color
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "M");
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [mainImage, setMainImage] = useState(product?.images?.[0]?.[0] || "");
  const [activeTab, setActiveTab] = useState("detail");

  // Countdown example
  const [countdown, setCountdown] = useState({
    days: 365,
    hours: 23,
    minutes: 58,
    seconds: 24,
  });

  // Fetch product if not available (refresh fallback)
  useEffect(() => {
    if (!product) {
      const stored = sessionStorage.getItem("selectedProduct");
      if (stored) setProduct(JSON.parse(stored));
      else navigate("/products"); // redirect if no product
    } else {
      sessionStorage.setItem("selectedProduct", JSON.stringify(product));
      if (product.images?.[0]?.[0]) setMainImage(product.images[0][0]);
    }
  }, [product, navigate]);

  // Countdown timer
  useEffect(() => {
    const id = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (!product) return <div>Loading...</div>;

  const stockLeft = 29;
  const stockTotal = 100;
  const stockPercent = Math.max(6, Math.round(((stockTotal - stockLeft) / stockTotal) * 100));

  return (
    <div className="w-full mx-auto font-inter px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Product Images */}
        <div className="lg:col-span-6">
          <div className="bg-white border-thin p-6 rounded product-shadow">
            <img
              src={mainImage}
              alt={product.productName}
              className="w-full h-[540px] object-contain bg-muted-gray rounded"
            />
          </div>

          <div className="flex items-center gap-4 mt-4">
            {product.images[0]?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 p-2 rounded border ${mainImage === img ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"
                  } bg-white product-shadow`}
              >
                <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Details */}
        <div className="lg:col-span-6">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">{product.productName}</h1>

          <div className="flex items-center gap-3 mt-3">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }, (_, i) =>
                i < (product.rating || 0) ? <FaStar key={i} /> : <FaRegStar key={i} />
              )}
            </div>
            <a href="#reviews" className="text-sm text-gray-500 underline">
              Be the first to review this product
            </a>
          </div>

          <p className="text-sm text-gray-600 mt-4 leading-6 max-w-prose">{product.shortDesc}</p>

          {/* Stock / Countdown */}
          <div className="border rounded mt-6 p-5 bg-white">
            <div className="flex items-center justify-between">
              <div className="font-medium text-gray-800">
                Real Time <span className="inline-block bg-blue-600 text-white px-2 py-1 rounded ml-2">24</span> Visitor Right Now!
              </div>
              <div className="text-sm text-gray-500">
                Hurry up! left <span className="text-red-500 font-semibold">{stockLeft}</span> in stock
              </div>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded mt-3">
              <div
                className="h-2 rounded"
                style={{
                  width: `${stockPercent}%`,
                  background: "linear-gradient(90deg, #111827 0%, #a78bfa 100%)",
                }}
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mt-5 text-center">
              {["Days", "Hours", "Min", "Sec"].map((label, i) => (
                <div key={i} className="count-box">
                  <div className="text-xl font-semibold">
                    {i === 0
                      ? countdown.days
                      : i === 1
                        ? String(countdown.hours).padStart(2, "0")
                        : i === 2
                          ? String(countdown.minutes).padStart(2, "0")
                          : String(countdown.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-400">{label}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 text-center font-medium text-gray-700">Time is Running Out!</div>
          </div>

          {/* Price & SKU */}
          <div className="flex items-center justify-between mt-6 border-b pb-4">
            <div>
              <div className="text-sm text-gray-500">As low as</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">${product.price}</div>
            </div>
            <div className="text-sm text-gray-600">
              <div className="uppercase text-xs text-gray-400">In stock</div>
              <div className="font-semibold mt-1">SKU#: {product._id}</div>
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-4">
            <div className="text-sm font-medium text-gray-600">SIZE</div>
            <div className="flex gap-2 mt-2">
              {["S", "M", "L", "XL", "XXL"].map((sz) => {
                const isAvailable = product.sizes.includes(sz); // check if this size exists
                return (
                  <button
                    key={sz}
                    onClick={() => isAvailable && setSelectedSize(sz)} // only clickable if available
                    disabled={!isAvailable} // disables button if not available
                    className={`px-3 py-2 border rounded text-sm 
            ${selectedSize === sz && isAvailable ? "bg-gray-100 border-gray-300 font-semibold" : "bg-white border-gray-200"} 
            ${!isAvailable ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
          `}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>


          {/* Colors */}
          <div className="mt-4">
            <div className="text-sm font-medium text-gray-600">COLOR</div>
            <div className="flex gap-3 mt-3 items-center">
              {(product.colors || ["#2b6fb6", "#86c6ff", "#9ae6b4", "#f7c6b6"]).map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColorIndex(i)}
                  className={`w-7 h-7 rounded-full border-2 ${selectedColorIndex === i ? "border-blue-600 ring-2 ring-blue-100" : "border-gray-200"
                    }`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>

          {/* Qty & Actions */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border rounded overflow-hidden">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-50">
                <BiMinus size={18} />
              </button>
              <div className="px-6 py-2 text-sm">{qty}</div>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 hover:bg-gray-50">
                <BiPlus size={18} />
              </button>
            </div>

            <button className="flex items-center gap-2 px-6 py-3 rounded bg-brand-blue text-white font-semibold  bg-red-400  shadow hover:opacity-95 hover:bg-black transition-colors duration-300">
              <BiShoppingBag size={18} /> ADD TO CART
            </button>

            <button className="btn btn-ghost border p-2 rounded bg-blue-100">
              <BiHeart />
            </button>
            <button className="btn btn-ghost border p-2 rounded bg-blue-100">
              <BiShow />
            </button>
          </div>

          {/* Social icons */}
          <div className="flex gap-4 mt-6 text-gray-500">
            <FaFacebookF className="cursor-pointer" />
            <FaTwitter className="cursor-pointer" />
            <FaYoutube className="cursor-pointer" />
            <FaInstagram className="cursor-pointer" />
            <FaPinterestP className="cursor-pointer" />
            <FaWhatsapp className="cursor-pointer" />
          </div>
        </div>

        {/* Tabs */}

        <div className="lg:col-span-12 mt-10">
          <div className="tabs tabs-boxed bg-transparent p-0">
            <button
              className={`tab px-6 py-3 ${activeTab === "detail" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("detail")}
            >
              Detail
            </button>
            <button
              className={`tab px-6 py-3 ${activeTab === "moreInfo" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("moreInfo")}
            >
              More Information
            </button>
          </div>

          <div className="mt-4 bg-white border rounded p-6 text-gray-600 leading-7">
            {activeTab === "detail" ? product.shortDesc : product.fullDetail}
          </div>
        </div>


      </div>
    </div>
  );
};

export default ProductPage;
