// src/components/ProductPage.jsx
import React, { useContext, useEffect, useState } from "react";
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

import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Usecart from "../../hooks/Usecart";

import UseAuth from "../../hooks/UseAuth";
import { faL } from "@fortawesome/free-solid-svg-icons";
const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();


  // Get product from state or sessionStorage
  const [product, setProduct] = useState(location.state?.product || null);

  console.log(product?.userEmail);

  // Qty, size, color
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [mainImage, setMainImage] = useState(product?.images?.[0]?.[0] || "");
  const [activeTab, setActiveTab] = useState("detail");
  const [cart, isLoading, isError, refetch] = Usecart();
  const [showDiscountBox, setShowDiscountBox] = useState(false);





  const [reviews, setReviews] = useState([
    { id: 1, name: "Rahim", text: "Great product! Worth every penny." },
    { id: 2, name: "Karim", text: "Good quality, but delivery was a bit late." },
    { id: 3, name: "Sadia", text: "Excellent build and performance." },
  ]);
  const { user } = UseAuth();
  console.log(user);
  const axiosSecure = useAxiosSecure();

  const [newReview, setNewReview] = useState("");
  // console.log(product);

  const handleAddToCart = (product) => {

    if (!selectedSize) {
      Swal.fire({
        title: "Select a size",
        icon: "warning",
      });

      return;
    } if (product.colors && !product.colors[selectedColorIndex]) {
      Swal.fire({
        title: "Select a color",
        icon: "warning",
      });
      return;
    }
    if (user && user.email) {
      const cartItem = {
        ProductMainID: product._id,
        userEmail: user.email,
        productName: product.productName,
        category: product.category,
        images: product.images,
        labelType: product.labelType,
        oldPrice: product.oldPrice,
        price: product.price,
        quantity: qty, // ✅ user-selected quantity
        size: selectedSize, // ✅ user-selected size
        color: product.colors?.[selectedColorIndex] || null, // ✅ user-selected color
        tags: product.tags,
        discount: product.discount
      };



      axiosSecure.post('/carts', cartItem)
        .then(res => refetch())
        .catch(err => console.error(err));

      Swal.fire({
        title: "Cart added successfully!",
        icon: "success",
        draggable: true
      });
    } else {
      Swal.fire({
        title: "Login Required?",
        text: "You won't be able to add cart without login",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login"
      }).then(result => {
        if (result.isConfirmed) navigate('/login');
      });
    }
  };

  const handleAddReview = () => {
    if (newReview.trim() === "") return;
    const newEntry = {
      id: reviews.length + 1,
      name: "Anonymous", // later you can link with logged-in user
      text: newReview,
    };
    setReviews([newEntry, ...reviews]); // add new review at top
    setNewReview("");
  };

  const handleIncrease = () => {
    if (qty < product.quantity) {
      setQty(qty + 1);
    } else {
      Swal.fire({
        title: "Stock limit reached!",
        text: `You can only purchase up to ${product.quantity} items.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };


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

  const stockLeft = product.quantity;
  const stockTotal = 100;
  const stockPercent = Math.max(6, Math.round(((stockTotal - stockLeft) / stockTotal) * 100));
  const width = 100;

  return (
    <div className="w-full mx-auto font-inter px-4 py-5 lg:px-6 lg:py-10 -mt-10 lg:-mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Product Images */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-white border-thin p-6 rounded product-shadow">
            <img
              key={product._id}
              src={mainImage}
              alt={product.productName}
              className="w-full lg:h-[540px] object-contain bg-muted-gray rounded"
            />
          </div>

          <div className="flex items-center gap-4 mt-4">
            {product.images[0]?.map((img, idx) => (
              <button
                key={product.id}
                onClick={() => setMainImage(img)}
                className={`w-10 h-10 lg:w-20 lg:h-20 p-2 rounded border ${mainImage === img ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"
                  } bg-white product-shadow`}
              >
                <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Details */}
        <div className="lg:col-span-6 flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-between">
            {/* Top content */}
            <div>
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

              <p className="text-sm text-gray-600 mt-2 leading-6 max-w-prose">{product.shortDesc}</p>

              {/* Stock / Countdown */}
              <div className="border rounded mt-2 p-5 bg-white">
                <div className="flex items-center justify-between flex-col lg:flex-row">
                  <div className="font-medium text-gray-800">
                    Real Time <span className="inline-block bg-blue-600 text-white px-2 py-1 rounded ml-2">24</span> Visitor Right Now!
                  </div>
                  <div className="text-sm text-gray-500">
                    Hurry up! left <span className="text-red-500 font-semibold">{stockLeft}</span> in stock
                  </div>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded mt-3">
                  <div
                    className="h-2 rounded transition-all duration-500"
                    style={{
                      width: `${stockPercent}%`,
                      background: "linear-gradient(90deg, #ef4444 0%, #f59e0b 100%)",
                    }}
                  />
                </div>


                <div className="grid grid-cols-4 gap-4 mt-3 text-center text-black">
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

                <div className="mt-2 text-center font-medium text-gray-700">Time is Running Out!</div>
              </div>

              {/* Price & SKU */}
              <div className="flex items-center justify-between mt-2 border-b pb-0">
                <div>
                  <div className="text-sm text-gray-500">As low as</div>
                  <div className="text-2xl font-bold  mt-1 text-red-500">${product.price}</div>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="uppercase text-xs text-red-500 font-bold">In stock</div>
                  <div className="font-semibold mt-1">SKU#: {product._id}</div>
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-4 text-black">
                <div className="text-sm font-medium text-gray-600">SIZE</div>
                <div className="flex gap-2 mt-1">
                  {["S", "M", "L", "XL", "XXL"].map((sz) => {
                    const isAvailable = product.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        onClick={() => isAvailable && setSelectedSize(sz)}
                        disabled={!isAvailable}
                        className={`px-3 py-2 border rounded text-xs 
                  ${selectedSize === sz && isAvailable ? "bg-gray-100 border-gray-300 font-semibold" : "bg-white border-gray-200"} 
                  ${!isAvailable ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors */}
              <div className="mt-2 pb-0">
                <div className="text-sm font-medium text-gray-600">COLOR</div>
                <div className="flex gap-3 mt-2 items-center">
                  {(product.colors || ["#2b6fb6", "#86c6ff", "#9ae6b4", "#f7c6b6"]).map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColorIndex(i)}
                      className={`w-7 h-7 rounded-full border-2 ${selectedColorIndex === i ? "border-blue-600 ring-2 ring-blue-100" : "border-gray-200"}`}
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>


              {/* Actions & Social Icons */}
              <div className="mt-3 flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                {/* Left: Actions */}
                <div>
                  <div className="flex items-center gap-4 text-black">
                    {/* Qty Control */}
                    <div className="flex items-center border rounded overflow-hidden px-2 bg-white shadow-sm">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="hover:bg-gray-50 px-2 py-1"
                      >
                        <BiMinus size={16} />
                      </button>
                      <div className="px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm font-medium">
                        {qty}
                      </div>
                      <button
                        onClick={handleIncrease}
                        className="hover:bg-gray-50 px-2 py-1"
                      >
                        <BiPlus size={16} />
                      </button>
                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="text-xs flex items-center gap-2 px-5 py-2 lg:px-7 lg:py-3 
                   rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white 
                   font-semibold shadow hover:opacity-95 hover:from-black hover:to-gray-800 
                   transition-all duration-300"
                    >
                      <BiShoppingBag size={18} />
                      <span className="whitespace-nowrap">ADD TO CART</span>
                    </button>

                    {/* Wishlist & Quick View */}
                    <button className="border p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                      <BiHeart size={18} />
                    </button>
                    <button className="border p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                      <BiShow size={18} />
                    </button>
                  </div>

                  {/* Socials */}
                  <div className="flex gap-4 mt-3 text-gray-500">
                    <FaFacebookF className="cursor-pointer hover:text-blue-600" />
                    <FaTwitter className="cursor-pointer hover:text-sky-500" />
                    <FaYoutube className="cursor-pointer hover:text-red-500" />
                    <FaInstagram className="cursor-pointer hover:text-pink-500" />
                    <FaPinterestP className="cursor-pointer hover:text-red-600" />
                    <FaWhatsapp className="cursor-pointer hover:text-green-500" />
                  </div>
                </div>

                {/* Right: Discount (Only Seller Sees) */}

              </div>

              {product?.userEmail === user?.email && (
                <div className="flex flex-col items-start gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 
                    text-white px-5 py-4 rounded-xl shadow-md mt-2">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    🎉 Add a Special Discount
                  </h4>

                  <button
                    onClick={() => setShowDiscountBox(true)}
                    className="mt-2 px-4 py-2 bg-white text-orange-600 rounded-lg font-semibold shadow hover:bg-gray-100"
                  >
                    + Set Discount
                  </button>

                  <p className="text-sm opacity-90">
                    As the seller, you can set a custom discount for this product to attract more buyers.
                  </p>
                  {showDiscountBox && (
                    <div className="mt-4 p-4 border border-orange-400 rounded-lg bg-orange-50">
                      <h4 className="font-bold text-orange-600 mb-2">Set Discount</h4>
                      <input
                        type="number"
                        placeholder="Enter discount %"
                        className="border rounded px-3 py-2 w-full text-black"
                      />
                      <button
                        className="mt-2 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                        onClick={()=> handleAddDiscount()}
                      >
                        Apply Discount
                      </button>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>


        </div>



        {/* Tabs */}

        <div className="lg:col-span-12 mt-2">
          {/* Tabs */}
          <div className="tabs tabs-boxed bg-transparent p-0 flex">
            <button
              className={`tab lg:px-6 lg:py-3 !text-black border ${activeTab === "detail"
                ? "bg-white border-gray-300"
                : "bg-gray-100 hover:bg-gray-200 border-gray-200"
                }`}
              onClick={() => setActiveTab("detail")}
            >
              Detail
            </button>
            <button
              className={`tab lg:px-6 lg:py-3 !text-black border ${activeTab === "moreInfo"
                ? "bg-white border-gray-300"
                : "bg-gray-100 hover:bg-gray-200 border-gray-200"
                }`}
              onClick={() => setActiveTab("moreInfo")}
            >
              More Information
            </button>
            <button
              className={`tab lg:px-6 lg:py-3 !text-black border ${activeTab === "reviews"
                ? "bg-white border-gray-300"
                : "bg-gray-100 hover:bg-gray-200 border-gray-200"
                }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4 bg-white border border-gray-200 rounded p-6 !text-black leading-7">
            {activeTab === "detail" && <p>{product.shortDesc}</p>}
            {activeTab === "moreInfo" && <p>{product.fullDetail}</p>}

            {activeTab === "reviews" && (
              <div className="!text-black">
                {/* Add Review Box */}
                <div className="mb-6">
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 bg-white !text-black focus:outline-none focus:ring focus:ring-purple-300"
                    rows="3"
                    placeholder="Write your review..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                  />
                  <button
                    onClick={handleAddReview}
                    className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Submit Review
                  </button>
                </div>

                {/* Review List */}
                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                      >
                        <p className="font-semibold !text-black">{review.name}</p>
                        <p className="!text-black mt-1">{review.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="!text-black">No reviews yet. Be the first one!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>





      </div>
    </div>
  );
};

export default ProductPage;
