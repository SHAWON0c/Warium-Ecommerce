import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaCrown, FaSnowflake, FaGlasses } from "react-icons/fa";
import { GiShorts } from "react-icons/gi";
import "../CSS/Categories.css"; // Custom scrollbar & buttons CSS

const Categories = () => {
  const scrollRef = useRef(null);

  const categories = [
    { title: "DRESS & FROCK", count: 53, icon: <FaCrown size={28} className="text-teal-500" /> },
    { title: "WINTER WEAR", count: 58, icon: <FaSnowflake size={28} className="text-blue-400" /> },
    { title: "GLASSES & LENS", count: 68, icon: <FaGlasses size={28} className="text-slate-600" /> },
    { title: "SHORTS & JEANS", count: 84, icon: <GiShorts size={28} className="text-indigo-600" /> },
    { title: "DRESS & FROCK", count: 53, icon: <FaCrown size={28} className="text-teal-500" /> },
    { title: "WINTER WEAR", count: 58, icon: <FaSnowflake size={28} className="text-blue-400" /> },
    { title: "GLASSES & LENS", count: 68, icon: <FaGlasses size={28} className="text-slate-600" /> },
    { title: "SHORTS & JEANS", count: 84, icon: <GiShorts size={28} className="text-indigo-600" /> },
  ];

  const scroll = (dir) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full max-w-full mx-auto px-0 mt-4">
      <button
        onClick={() => scroll("left")}
        className="scroll-btn left "
        aria-label="Scroll Left"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={() => scroll("right")}
        className="scroll-btn right"
        aria-label="Scroll Right"
      >
        <FaChevronRight />
      </button>

      {/* Wrap scrollable area in this div to detect hover */}
      <div className="scrollbar-container">
        <div
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-thin-custom mt-4 h-auto w-full"
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex-shrink-0 snap-start bg-white p-4 rounded-lg border shadow-sm w-[260px]"
            >
              <div className="flex items-center gap-4">
                <div className="bg-slate-100 p-3 rounded-md">{cat.icon}</div>
                <div className="flex flex-col">
                  <div className="font-semibold text-sm text-black">
                    {cat.title}
                    <span className="ml-2 text-gray-500 text-xs font-normal">
                      ({cat.count})
                    </span>
                  </div>
                  <button className="text-pink-500 text-sm mt-1 hover:underline">
                    Show All
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
