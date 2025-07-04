import React, { useRef, useState } from "react";
import cloth1 from '../assets/images/products/clothes-1.jpg'
import { Progress } from "@material-tailwind/react";

// icon section
import dress from '../assets/images/icons/dress.svg'
import shoe from '../assets/images/icons/shoes.svg'
import jewelry from '../assets/images/icons/jewelry.svg'
import perfume from '../assets/images/icons/perfume.svg'
import cosmetics from '../assets/images/icons/cosmetics.svg'
import glass from '../assets/images/icons/glasses.svg'
import bag from '../assets/images/icons/bag.svg'

//best-seller-image
import babyShoe from '../assets/images/products/1.jpg'
import menCloth from '../assets/images/products/2.jpg'
import girlShirt from '../assets/images/products/3.jpg'
import Hat from '../assets/images/products/4.jpg'


//Deal of the day 
import shampo from '../assets/images/products/shampoo.jpg'

const EcommerceLayout = () => {


    const sold = 20;
    const available = 40;
    const total = sold + available;
    const percentageSold = (sold / total) * 100;


    const [openIndex, setOpenIndex] = useState(null);
    const contentRefs = useRef([]);
    const categories = [
        {
            name: "Clothes",
            icon: dress,
            subItems: [
                { name: "Shirt", count: 300 },
                { name: "Shorts & Jeans", count: 120 },
                { name: "Jacket", count: 80 },
                { name: "Dress & Frock", count: 80 },
            ],
        },
        {
            name: "Footwear",
            icon: shoe,
            subItems: [
                { name: "Sports", count: 150 },
                { name: "Formal", count: 60 },
                { name: "Casual", count: 45 },
                { name: "Safety Shoes", count: 45 },
            ],
        },
        {
            name: "Jewelry",
            icon: jewelry,
            subItems: [
                { name: "Earrings", count: 40 },
                { name: "Couple Rings", count: 50 },
                { name: "Necklace", count: 30 },
            ],
        },
        {
            name: "Perfume",
            icon: perfume,
            subItems: [
                { name: "Clothes Perfume", count: 40 },
                { name: "Deodorant", count: 50 },
                { name: "Flower Fragrance", count: 30 },
                { name: "Air Freshener", count: 30 },
            ],
        },
        {
            name: "Cosmetics",
            icon: cosmetics,
            subItems: [
                { name: "Shampoo", count: 40 },
                { name: "Sunscreen", count: 50 },
                { name: "Body Wash", count: 30 },
                { name: "Makeup kit", count: 30 },
            ],
        },
        {
            name: "Glasses",
            icon: glass,
            subItems: [
                { name: "Sunglasses", count: 40 },
                { name: "Lenses", count: 50 },

            ],
        },
        {
            name: "Bags",
            icon: bag,
            subItems: [
                { name: "Shopping Bag", count: 40 },
                { name: "Gym Backpack", count: 50 },
                { name: "Purse", count: 30 },
                { name: "Wallet", count: 30 },
            ],
        },
        // ...add rest like Perfume, Cosmetics, etc.
    ];




     const products = [
    {
      id: 1,
      label: "15%",
      labelColor: "bg-green-500",
      category: "JACKET",
      title: "Mens Winter Leathers Jackets",
      rating: 3,
      price: "$48.00",
      oldPrice: "$75.00",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      label: "SALE",
      labelColor: "bg-black",
      category: "SHIRT",
      title: "Pure Garment Dyed Cotton Shirt",
      rating: 3,
      price: "$45.00",
      oldPrice: "$56.00",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      label: "",
      labelColor: "",
      category: "JACKET",
      title: "MEN Yarn Fleece Full-Zip Jacket",
      rating: 3,
      price: "$58.00",
      oldPrice: "$65.00",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 4,
      label: "NEW",
      labelColor: "bg-pink-400",
      category: "SKIRT",
      title: "Black Floral Wrap Midi Skirt",
      rating: 5,
      price: "$25.00",
      oldPrice: "$35.00",
      image: "https://via.placeholder.com/150"
    }
  ];

    const toggleCategory = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };



    function renderStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div className="flex text-yellow-400 gap-0.5 text-sm">
                {[...Array(fullStars)].map((_, i) => (
                    <span key={"full" + i}>★</span>
                ))}
                {halfStar && <span>☆</span>}
                {[...Array(emptyStars)].map((_, i) => (
                    <span key={"empty" + i} className="text-gray-300">★</span>
                ))}
            </div>
        );
    }



    const bestSellers = [
        { image: babyShoe, name: "Baby Fabric Shoes", price: 4.00, old: 5.00, rating: 4 },
        { image: menCloth, name: "Men's Hoodies T-Shirt", price: 7.00, old: 17.00, rating: 3.5 },
        { image: girlShirt, name: "Girls T-Shirt", price: 3.00, old: 5.00, rating: 5 },
        { image: Hat, name: "Woolen Hat For Men", price: 12.00, old: 15.00, rating: 4.5 },
    ];


    const newArrivals = [
        { title: "Relaxed Short Full Sleep", category: "Clothes", price: 45, oldPrice: 120 },
        { title: "Girls Pnk Embro Design", category: "Clothes", price: 61, oldPrice: 90 },
        { title: "Black Floral Wrap Midi", category: "Clothes", price: 76, oldPrice: 25 },
        { title: "Pure Garment Dyed Coat", category: "Mens Fashion", price: 68, oldPrice: 31 },
    ];

    const trending = [
        { title: "Running & Trekking Shoes", category: "Sports", price: 49, oldPrice: 150 },
        { title: "Trekking & Running Shoes", category: "Sports", price: 78, oldPrice: 36 },
        { title: "Women's Party Wear Shoes", category: "Party Wear", price: 94, oldPrice: 42 },
        { title: "Sports Claw Women's Shoes", category: "Sports", price: 54, oldPrice: 65 },
    ];

    const topRated = [
        { title: "Pocket Watch Leather Band", category: "Watches", price: 50, oldPrice: 34 },
        { title: "Silver Deer Heart Necklace", category: "Jewellery", price: 84, oldPrice: 30 },
        { title: "Titan 100 Ml Womens Perfume", category: "Perfume", price: 42, oldPrice: 10 },
        { title: "Men's Leather Reversible Belt", category: "Belt", price: 24, oldPrice: 10 },
    ];

    const ProductCard = ({ title, category, price, oldPrice }) => (
        <div className="p-4 border rounded-xl bg-white flex flex-row">
            {/* <div className="w-full h-24 bg-gray-100 mb-3 rounded" /> */}
            <div>
                <img
                    className="w-20"
                    src={cloth1} alt="" />
            </div>
            <div>
                <h4 className="text-sm font-semibold text-black mb-1">{title}</h4>
                <p className="text-md text-gray-700 mb-1">{category}</p>
                <p className="text-sm ">
                    <span className="text-red-400 font-bold text-lg ">${price}.00</span>{" "}
                    <span className="line-through text-gray-400 text-xs mx-2">${oldPrice}</span>
                </p>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6  bg-white min-h-screen font-sans mt-10">
            {/* Sidebar */}
            <div className="sticky top-2 h-fit">
                <div className="p-4 border rounded-md bg-white">
                    <h3 className="font-semibold mb-4 text-gray-800 uppercase text-lg tracking-wide">Category</h3>
                    <ul className="space-y-3">
                        {categories.map((cat, i) => (
                            <li key={i}>
                                {/* Header */}
                                <div
                                    onClick={() => toggleCategory(i)}
                                    className={`flex justify-between items-center text-sm text-gray-800 cursor-pointer transition-all duration-300 ${openIndex === i ? "border-b py-2" : ""
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <img className="w-6 h-6 object-contain" src={cat.icon} alt={cat.name} />
                                        <h1 className="text-gray-500 text-lg font-semibold">{cat.name}</h1>
                                    </div>
                                    <span className="text-gray-500 text-lg transition-transform duration-300">
                                        {openIndex === i ? "−" : "+"}
                                    </span>
                                </div>

                                {/* Animated Content */}
                                <div
                                    ref={(el) => (contentRefs.current[i] = el)}
                                    style={{
                                        maxHeight: openIndex === i ? `${contentRefs.current[i]?.scrollHeight}px` : "0px",
                                    }}
                                    className="overflow-hidden transition-all duration-500 ease-in-out"
                                >
                                    <ul className=" mt-2 space-y-1 text-sm text-gray-600 py-1">
                                        {cat.subItems.map((sub, j) => (
                                            <li
                                                key={j}
                                                className="flex justify-between hover:text-black cursor-pointer"
                                            >
                                                <span className="text-md font-semibold text-gray-500 hover:text-black">{sub.name}</span>
                                                <span className="text-gray-400">({sub.count})</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="mt-6">
                    <h3 className="font-semibold mb-4 text-gray-700 uppercase text-sm tracking-wide">Best Sellers</h3>
                    <ul className="space-y-4">
                        {bestSellers.map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <img className="w-20 rounded-lg" src={item.image} alt={item.name} />
                                <div>
                                    <p className="text-md font-base text-gray-800">{item.name}</p>
                                    {/* Star rating */}
                                    {renderStars(item.rating)}
                                    <div className="flex flex-row gap-3 items-center">
                                        <div className="text-sm text-gray-500 line-through">${item.old}.00</div>
                                        <div className="text-md font-semibold text-gray-700">${item.price}.00</div>
                                    </div>

                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>


            {/* Main Content */}
            <div className="md:col-span-3 space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">New Arrivals</h3>
                        <div className="grid gap-4">
                            {newArrivals.map((item, i) => (
                                <ProductCard key={i} {...item} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Trending</h3>
                        <div className="grid gap-4">
                            {trending.map((item, i) => (
                                <ProductCard key={i} {...item} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Top Rated</h3>
                        <div className="grid gap-4">
                            {topRated.map((item, i) => (
                                <ProductCard key={i} {...item} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Deal Of The Day */}
                <div className="p-10 bg-white border rounded-md flex items-center gap-8">
                    <img
                        className="w-[464px]"
                        src={shampo} alt="shmapo image" />
                    <div>
                        <h4 className="text-md font-semibold  text-black mb-1 uppercase">shampoo, conditioner & facewash packs</h4>
                        <p className="text-md text-gray-500 mb-2">Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet</p>
                        <p>
                            <span className="text-red-400 font-bold text-xl">$150.00</span>{" "}
                            <span className="line-through text-gray-400">$200.00</span>
                        </p>
                        <button className="mt-3 bg-red-400 text-white px-4 py-2 rounded-lg">ADD TO CART</button>

                        <div className="max-w-md mx-auto  space-y-4">
                            <div className="flex justify-between text-sm font-semibold mt-2">
                                <span>ALREADY SOLD: <span className="text-black ">{sold}</span></span>
                                <span>AVAILABLE: <span className="text-black">{available}</span></span>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-red-400 h-2 rounded-full"
                                    style={{ width: `${percentageSold}%` }}
                                ></div>
                            </div>

                            <h2 className="text-sm font-bold">HURRY UP! OFFER ENDS IN:</h2>

                            <div className="grid grid-cols-4 gap-2 text-center">
                                <div className="bg-gray-100 rounded-lg p-4">
                                    <div className="text-xl font-bold">360</div>
                                    <div className="text-xs uppercase">Days</div>
                                </div>

                                <div className="bg-gray-100 rounded-lg p-4">
                                    <div className="text-xl font-bold">24</div>
                                    <div className="text-xs uppercase">Hours</div>
                                </div>

                                <div className="bg-gray-100 rounded-lg p-4">
                                    <div className="text-xl font-bold">59</div>
                                    <div className="text-xs uppercase">Min</div>
                                </div>

                                <div className="bg-gray-100 rounded-lg p-4">
                                    <div className="text-xl font-bold">00</div>
                                    <div className="text-xs uppercase">Sec</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                  <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-xl p-4 relative hover:shadow-lg transition bg-white"
              >
                {product.label && (
                  <span className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded ${product.labelColor}`}>
                    {product.label}
                  </span>
                )}

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-contain mb-4"
                />

                <div className="text-pink-500 text-xs uppercase mb-1">{product.category}</div>
                <div className="text-base font-semibold mb-1">{product.title}</div>

                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={`text-yellow-400 ${i < product.rating ? '' : 'opacity-30'}`}>
                      ★
                    </span>
                  ))}
                </div>

                <div className="text-sm">
                  <span className="font-bold mr-2">{product.price}</span>
                  <span className="line-through text-gray-400">{product.oldPrice}</span>
                </div>
              </div>
            ))}
          </div>
            </div>
        </div>
    );
};

export default EcommerceLayout;
