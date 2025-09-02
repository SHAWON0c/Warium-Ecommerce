import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import banner1 from '../assets/images/banner/banner-5.jpg';
import banner2 from '../assets/images/banner/6.jpg';
import banner3 from '../assets/images/banner/banner-4.jpg';
import "../CSS/Categories.css"; // Custom scrollbar & buttons CSS

const Herosection = () => {
  const sliderRef = useRef(null);
  const banners = [banner1, banner2, banner3];
  const bannerTexts = [
    { title: "Trending Item", subtitle1: "mens latest fashion sale", subtitle2: "Starting at $20.00" },
    { title: "Trending Accessories", subtitle1: "Modern sunglasses", subtitle2: "Starting at $15.00" },
    { title: "Sale Offer", subtitle1: "New fashion summer sale", subtitle2: "Starting at $29.99" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((currentIndex + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToSlide = (index) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.clientWidth * index,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const prevSlide = () => goToSlide((currentIndex - 1 + banners.length) % banners.length);
  const nextSlide = () => goToSlide((currentIndex + 1) % banners.length);

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
      >
        {banners.map((banner, index) => (
          <div key={index} className="relative min-w-full snap-start group">
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-[200px] sm:h-[300px] md:h-[450px] lg:h-full object-cover md:object-contain object-top transform transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay Text */}
            <div className=" mt-10 lg:mt-0 absolute bottom-8 sm:bottom-16 md:bottom-24 lg:bottom-36 left-4 sm:left-12 md:left-20 lg:left-32 text-white p-2 sm:p-4 rounded max-w-[40%] sm:max-w-[460px] bg-gradient-to-t from-black/50 to-transparent lg:bg-none items-center lg:none">
              <h2 className="text-red-400 font-medium text-sm sm:text-xl md:text-2xl mb-0 lg:mb-1 sm:mb-2">{bannerTexts[index].title}</h2>
              <h1 className="uppercase font-extrabold text-base sm:text-2xl md:text-4xl lg:text-[2.65rem] mb-2 text-black">{bannerTexts[index].subtitle1}</h1>
              <p className="font-semibold text-gray-200 text-sm sm:text-base md:text-lg lg:text-2xl mt-2">{bannerTexts[index].subtitle2}</p>
              <button className='bg-red-400 text-white px-4 py-2 sm:px-6 sm:py-3 mt-2 rounded-md hover:bg-black transition-colors duration-300 font-semibold text-xs sm:text-sm md:text-base'>
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 z-20 
               bg-black/50 text-white w-10 h-10 flex items-center justify-center 
               rounded-full hover:bg-red-500 transition-colors duration-300 hidden lg:flex"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 z-20 
               bg-black/50 text-white w-10 h-10 flex items-center justify-center 
               rounded-full hover:bg-red-500 transition-colors duration-300 hidden lg:flex"
      >
        <FaChevronRight />
      </button>


      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {banners.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-red-500 scale-125' : 'bg-gray-400'
              }`}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Herosection;
