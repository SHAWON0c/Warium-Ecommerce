// src/components/ProductPage.jsx
import React, { useEffect, useState } from "react";
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
import img1 from '../../assets/images/products/jacket-1.jpg';
import img2 from '../../assets/images/products/jacket-1.jpg';
import img3 from '../../assets/images/products/jacket-1.jpg';
import img4 from '../../assets/images/products/jacket-1.jpg';

const ProductPage = () => {
  const images = [img1,img2,img3,img4];

  const [mainImage, setMainImage] = useState(images[0]);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const [countdown, setCountdown] = useState({
    days: 365,
    hours: 23,
    minutes: 58,
    seconds: 24,
  });

  // Live countdown (decrements seconds)
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

  // stock / progress example
  const stockLeft = 29;
  const stockTotal = 100;
  const stockPercent = Math.max(6, Math.round(((stockTotal - stockLeft) / stockTotal) * 100)); // avoid 0 width

  return (
    <div className=" w-full mx-auto font-inter px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: images */}
        <div className="lg:col-span-6">
          <div className="bg-white border-thin p-6 rounded product-shadow">
            <img
              src={mainImage}
              alt="Hoodie main"
              className="w-full h-[540px] object-contain bg-muted-gray rounded"
            />
          </div>

          <div className="flex items-center gap-4 mt-4">
            {images.map((img, idx) => (
              <button
                key={img}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 p-2 rounded border ${
                  mainImage === img ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"
                } bg-white product-shadow`}
              >
                <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: details */}
        <div className="lg:col-span-6">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">
            Unisex Cotton Neck Hoodie
          </h1>

          <div className="flex items-center gap-3 mt-3">
            <div className="flex text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaRegStar />
            </div>
            <a href="#reviews" className="text-sm text-gray-500 underline">
              Be the first to review this product
            </a>
          </div>

          <p className="text-sm text-gray-600 mt-4 leading-6 max-w-prose">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1990.
          </p>

          {/* Real-time / stock card */}
          <div className="border rounded mt-6 p-5 bg-white">
            <div className="flex items-center justify-between">
              <div className="font-medium text-gray-800">
                Real Time <span className="inline-block bg-blue-600 text-white px-2 py-1 rounded ml-2">24</span> Visitor Right Now!
              </div>
              <div className="text-sm text-gray-500">Hurry up! left <span className="text-red-500 font-semibold">{stockLeft}</span> in stock</div>
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
              <div className="count-box">
                <div className="text-xl font-semibold">{countdown.days}</div>
                <div className="text-xs text-gray-400">Days</div>
              </div>
              <div className="count-box">
                <div className="text-xl font-semibold">{String(countdown.hours).padStart(2, "0")}</div>
                <div className="text-xs text-gray-400">Hours</div>
              </div>
              <div className="count-box">
                <div className="text-xl font-semibold">{String(countdown.minutes).padStart(2, "0")}</div>
                <div className="text-xs text-gray-400">Min</div>
              </div>
              <div className="count-box">
                <div className="text-xl font-semibold">{String(countdown.seconds).padStart(2, "0")}</div>
                <div className="text-xs text-gray-400">Sec</div>
              </div>
            </div>

            <div className="mt-3 text-center font-medium text-gray-700">Time is Running Out!</div>
          </div>

          {/* Price + stock */}
          <div className="flex items-center justify-between mt-6 border-b pb-4">
            <div>
              <div className="text-sm text-gray-500">As low as</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">$97.00</div>
            </div>
            <div className="text-sm text-gray-600">
              <div className="uppercase text-xs text-gray-400">In stock</div>
              <div className="font-semibold mt-1">SKU#: WH12</div>
            </div>
          </div>

          {/* Size */}
          <div className="mt-4">
            <div className="text-sm font-medium text-gray-600">SIZE</div>
            <div className="flex gap-2 mt-2">
              {["S", "M", "L", "XL"].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3 py-2 border rounded text-sm ${selectedSize === sz ? "bg-gray-100 border-gray-300 font-semibold" : "bg-white border-gray-200"}`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mt-4">
            <div className="text-sm font-medium text-gray-600">COLOR</div>
            <div className="flex gap-3 mt-3 items-center">
              {["#2b6fb6", "#86c6ff", "#9ae6b4", "#f7c6b6"].map((c, i) => (
                <button
                  key={c}
                  onClick={() => setSelectedColorIndex(i)}
                  className={`w-7 h-7 rounded-full border-2 ${selectedColorIndex === i ? "border-blue-600 ring-2 ring-blue-100" : "border-gray-200"}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>

          {/* Qty + actions */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border rounded overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-gray-50"
                aria-label="decrease"
              >
                <BiMinus size={18} />
              </button>
              <div className="px-6 py-2 text-sm">{qty}</div>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 hover:bg-gray-50"
                aria-label="increase"
              >
                <BiPlus size={18} />
              </button>
            </div>

            <button className="flex items-center gap-2 px-6 py-3 rounded bg-brand-blue text-white font-semibold shadow hover:opacity-95">
              <BiShoppingBag size={18} /> ADD TO CART
            </button>

            <button className="btn btn-ghost border p-2 rounded"><BiHeart /></button>
            <button className="btn btn-ghost border p-2 rounded"><BiShow /></button>
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

        {/* Tabs area spanning full width below */}
        <div className="lg:col-span-12 mt-10">
          <div className="tabs tabs-boxed bg-transparent p-0">
            <a className="tab tab-active px-6 py-3">Detail</a>
            <a className="tab px-6 py-3">More Information</a>
            <a className="tab px-6 py-3" id="reviews">Reviews</a>
          </div>

          <div className="mt-4 bg-white border rounded p-6">
            <p className="text-gray-600 leading-7">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
