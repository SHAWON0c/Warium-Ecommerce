import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 12;
  const totalPages = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleNavigate = (product) => {
    sessionStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate("/products/details", { state: { product } });
  };

  const getRandomProducts = () => {
    if (!products.length) return [];
    const randomProducts = [];
    const count = Math.min(productsPerPage, products.length);
    const usedIndexes = new Set();

    while (randomProducts.length < count) {
      const index = Math.floor(Math.random() * products.length);
      if (!usedIndexes.has(index)) {
        usedIndexes.add(index);
        randomProducts.push(products[index]);
      }
    }
    return randomProducts;
  };

  const randomProducts = getRandomProducts();

  // --- Skeleton Loader ---
  const SkeletonCard = () => (
    <div className="animate-pulse bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="w-full h-56 bg-gray-200"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-8">
      <h1 className="font-semibold text-gray-800 mb-8 text-xl sm:text-2xl md:text-3xl">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {isLoading
          ? Array.from({ length: productsPerPage }).map((_, i) => <SkeletonCard key={i} />)
          : randomProducts.map((product) => (
            <Link
              key={product._id}
              onClick={() => handleNavigate(product)}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 flex flex-col"
            >
              {/* Badge */}
              {product.labelType && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs sm:text-sm font-semibold uppercase px-2 sm:px-3 py-1 rounded-full shadow-lg z-20">
                  {product.labelType}
                </span>
              )}

              {/* Product Images */}
              <div className="relative w-full h-60 sm:h-64 md:h-72 lg:h-64 overflow-hidden">
                <img
                  src={product.images[0][0]}
                  alt={product.productName}
                  className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                {product.images[0][1] && (
                  <img
                    src={product.images[0][1]}
                    alt={product.productName}
                    className="absolute top-0 left-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                )}
              </div>

              {/* Hover Buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
                {[faHeart, faEye, faShoppingCart].map((icon, idx) => (
                  <button
                    key={idx}
                    className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-900 hover:text-white transition"
                  >
                    <FontAwesomeIcon icon={icon} />
                  </button>
                ))}
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="text-gray-400 text-xs sm:text-sm uppercase font-semibold mb-1">
                    {product.category}
                  </div>
                  <h2 className="text-gray-800 font-semibold text-sm sm:text-base md:text-lg mb-2 truncate">
                    {product.productName}
                  </h2>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`text-yellow-400 text-sm mr-0.5 ${i >= (product.rating || 0) ? "opacity-40" : ""}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mt-auto gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">${product.price}.00</span>
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through text-sm sm:text-base">${product.oldPrice}.00</span>
                    )}
                  </div>
                  <button className=" py-1 md:h-8 md:w-16 flex items-center justify-center bg-black text-white rounded-lg text-xs sm:text-sm hover:bg-gray-900 transition">
                    Buy Now
                  </button>



                </div>
              </div>
            </Link>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center mt-10 gap-3">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-full font-semibold transition ${currentPage === i + 1
              ? "bg-red-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>

  );
};

export default ProductsSection;
