import React, { useState } from "react";
import shampo from '../../assets/images/products/shampoo.jpg';
import facewash from '../../assets/images/products/shampoo.jpg'; // Example second deal

const deals = [
    {
        id: 1,
        title: "Shampoo, Conditioner & Facewash Packs",
        description: "Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet",
        price: 150,
        oldPrice: 200,
        image: shampo,
        sold: 20,
        available: 40
    },
    {
        id: 2,
        title: "Facewash & Skincare Combo Pack",
        description: "Another amazing skincare pack to refresh your skin",
        price: 120,
        oldPrice: 180,
        image: facewash,
        sold: 10,
        available: 50
    }
];

const DealOfTheDay = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentDeal = deals[currentIndex];
    const percentageSold = (currentDeal.sold / (currentDeal.sold + currentDeal.available)) * 100;

    return (
        <div>
            <h1 className="font-semibold text-gray-800 mb-3">Deal Of The Day</h1>
            <div className="relative p-6 md:p-10 bg-white border rounded-md flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {/* Left-top arrow for previous deal */}
                {currentIndex > 0 && (
                    <button
                        className="absolute top-2 left-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 z-10"
                        onClick={() => setCurrentIndex(currentIndex - 1)}
                    >
                        ←
                    </button>
                )}

                <img
                    className="w-full md:w-[464px] object-cover rounded-md"
                    src={currentDeal.image}
                    alt={currentDeal.title}
                />

                <div className="flex-1 space-y-4">
                    <h4 className="text-base md:text-md font-semibold text-black mb-1 uppercase">{currentDeal.title}</h4>
                    <p className="text-sm md:text-md text-gray-500">{currentDeal.description}</p>
                    <p className="text-lg md:text-xl">
                        <span className="text-red-400 font-bold text-lg md:text-xl">${currentDeal.price}.00</span>{" "}
                        <span className="line-through text-gray-400 text-sm md:text-base">${currentDeal.oldPrice}.00</span>
                    </p>

                    <button className="mt-3 bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-black transition-colors duration-300 text-sm md:text-base w-full md:w-auto">
                        ADD TO CART
                    </button>

                    <div className="space-y-4  text-black">
                        <div className="flex flex-col sm:flex-row justify-between text-sm font-semibold mt-2 gap-2 sm:gap-0 text-black">
                            <span className="text-black">ALREADY SOLD: <span className="text-black">{currentDeal.sold}</span></span>
                            <span>AVAILABLE: <span className="text-black">{currentDeal.available}</span></span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-red-400 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentageSold}%` }}
                            ></div>
                        </div>

                        <h2 className="text-sm md:text-base font-bold">HURRY UP! OFFER ENDS IN:</h2>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                            <div className="bg-gray-100 rounded-lg p-3 md:p-4">
                                <div className="text-lg md:text-xl font-bold">360</div>
                                <div className="text-xs md:text-sm uppercase">Days</div>
                            </div>
                            <div className="bg-gray-100 rounded-lg p-3 md:p-4">
                                <div className="text-lg md:text-xl font-bold">24</div>
                                <div className="text-xs md:text-sm uppercase">Hours</div>
                            </div>
                            <div className="bg-gray-100 rounded-lg p-3 md:p-4">
                                <div className="text-lg md:text-xl font-bold">59</div>
                                <div className="text-xs md:text-sm uppercase">Min</div>
                            </div>
                            <div className="bg-gray-100 rounded-lg p-3 md:p-4">
                                <div className="text-lg md:text-xl font-bold">00</div>
                                <div className="text-xs md:text-sm uppercase">Sec</div>
                            </div>
                        </div>

                        {/* Next Deal Button */}
                        {currentIndex < deals.length - 1 && (
                            <button
                                className="mt-3 bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm md:text-base"
                                onClick={() => setCurrentIndex(currentIndex + 1)}
                            >
                                → Next Deal
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DealOfTheDay;
