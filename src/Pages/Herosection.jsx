import { useEffect, useRef, useState } from 'react';
import banner1 from '../assets/images/banner/banner-1.jpg';
import banner2 from '../assets/images/banner/banner-2.jpg';
import banner3 from '../assets/images/banner/banner-3.jpg';
import "../CSS/Categories.css"; // Custom scrollbar & buttons CSS
const Herosection = () => {
  const sliderRef = useRef(null);
  const banners = [banner1, banner2, banner3];
  const bannerTexts = [
    { title: "Trending Item", subtitle1: "Women's latest fashion sale", subtitle2: "Startting at $20.00", },
    { title: "Trending accessories", subtitle1: "Modern sunglasses", subtitle2: "starting at $ 15.00", },
    { title: "Sale Offer", subtitle1: "New fashion summer sale", subtitle2: "starting at $ 29.99", },
  ];


  // Track current slide index in state to highlight dots
  const [currentIndex, setCurrentIndex] = useState(0);



  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const slider = sliderRef.current;
        index = (index + 1) % banners.length;
        setCurrentIndex(index);  // update state for dots
        slider.scrollTo({
          left: slider.clientWidth * index,
          behavior: 'smooth',
        });
      }
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <>
      <div
        ref={sliderRef}

        className="flex items-center gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth  rounded-lg mt-0 h-auto w-[1320px]"
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className="relative min-w-full h-full rounded-lg overflow-hidden snap-start"
          >
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-contain object-top -mb-12"
            />

            <div className="absolute bottom-36 left-32 text-white  bg-opacity-50 p-4 rounded max-w-[460px]">
              <h2 className="  text-3xl text-red-400 font-sm mb-2 ">{bannerTexts[index].title}</h2>
              <h1 className="uppercase text-[2.65rem] font-extrabold text-black leading-none">{bannerTexts[index].subtitle1}</h1>
              <p className="font-semibold text-gray-400 text-2xl mt-2">{bannerTexts[index].subtitle2}</p>
              <button className='text-wite bg-red-400 w-24 h-10 rounded-md mt-2 hover:bg-black transition-colors duration-300'> shop now</button>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Dots */}
      <div className="flex justify-center gap-3 mt-4">
        {banners.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            onClick={() => {
              // On dot click, scroll slider to that index and update currentIndex
              if (sliderRef.current) {
                sliderRef.current.scrollTo({
                  left: sliderRef.current.clientWidth * idx,
                  behavior: 'smooth',
                });
                setCurrentIndex(idx);
              }
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default Herosection;
