import { useEffect, useState } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEye, faRefresh, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterWhite from "../../Shared/FooterWhite";


const colorMap = {
  Red: "#f87171",
  Green: "#34d399",
  Blue: "#60a5fa",
  White: "#f3f4f6",
  Black: "#111827",
  Yellow: "#facc15",
  Gray: "#9ca3af",
  Navy: "#1e3a8a",
};

const Wishlist = () => {


  const [products, setProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});

  useEffect(() => {
    fetch("/Wishlist.json")
      .then(res => res.json())
      .then((data) => {
        setProducts(data);
        const initialColors = {};
        data.forEach(p => {
          if (p.colors?.length > 0) {
            initialColors[p.id] = p.colors[0];
          }
        });
        setSelectedColors(initialColors);
      });
  }, []);



  const handleColorSelect = (productId, color) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: color,
    }));
  };

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
      <div className="flex justify-center py-20">
        <div className="max-w-[1320px] w-full justify-center flex">
          <div className="flex flex-row gap-6 flex-wrap">
            {products.map(product => {
              const selectedColor = selectedColors[product.id];

              return (
                <div
                  key={product.id}
                  className="border rounded-xl p-4 relative hover:shadow-lg transition bg-white overflow-hidden group w-72"
                >
                  {/* Label */}
                  {product.label && product.label.toLowerCase() === "sale" ? (
                    <div className="absolute top-0 left-[-30px] rotate-[-45deg] bg-black text-white uppercase text-[11px] py-[5px] px-[40px] font-bold shadow-md z-20">
                      {product.label}
                    </div>
                  ) : product.label ? (
                    <span
                      className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded ${product.labelColor} z-20`}
                    >
                      {product.label}
                    </span>
                  ) : null}

                  {/* Product Images */}
                  <div className="relative w-full h-40 mb-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                    />
                    <img
                      src={product.hoverImage}
                      alt={product.title}
                      className="w-full h-full object-contain absolute top-0 left-0 opacity-0 group-hover:opacity-100 transform scale-100 group-hover:scale-[1.19] transition-all duration-500 ease-in-out"
                    />

                    {/* Icons */}
                    <div className="absolute top-2 right-2 flex flex-col space-y-2 transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-30">
                      <button className="w-7 h-7 border border-gray-300 flex items-center justify-center bg-white rounded shadow hover:bg-black hover:text-white">
                        <FontAwesomeIcon icon={faHeart} className="text-sm" />
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center bg-white rounded shadow hover:bg-black hover:text-white">
                        <FontAwesomeIcon icon={faEye} className="text-sm" />
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center bg-white rounded shadow hover:bg-black hover:text-white">
                        <FontAwesomeIcon icon={faRefresh} className="text-sm" />
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center bg-white rounded shadow hover:bg-black hover:text-white">
                        <FontAwesomeIcon icon={faShoppingCart} className="text-sm" />
                      </button>
                    </div>
                  </div>

                  {/* Category & Title */}
                  <div className="text-red-500 text-xs uppercase mb-1">{product.category}</div>
                  <div className="text-base font-semibold mb-1 text-gray-700">{product.title}</div>

                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`text-yellow-400 ${i < product.rating ? "" : "opacity-30"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="text-sm mb-2">
                    <span className="font-bold mr-2">{product.price}</span>
                    <span className="line-through text-gray-400">{product.oldPrice}</span>
                  </div>

                  {/* Color Options */}
                  {/* Color Options */}
                  {Array.isArray(product.colors) && (
                    <div className="flex gap-2 mt-2">
                      {product.colors.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleColorSelect(product.id, color)}
                          className={`w-5 h-5 rounded-full border-2 transition ${selectedColors[product.id] === color ? "border-gray-800 scale-110" : "border-gray-300"
                            }`}
                          style={{ backgroundColor: colorMap[color] || "#ccc" }}
                        ></button>
                      ))}
                    </div>
                  )}
                  9
                </div>
              );
            })}
          </div>
        </div>
      </div>


    </div>
  );
};

export default Wishlist;
