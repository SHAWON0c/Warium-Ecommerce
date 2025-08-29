import React, { useEffect, useRef, useState } from "react";
import cloth1 from '../assets/images/products/clothes-1.jpg';
import { Progress } from "@material-tailwind/react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEye, faRefresh, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import '../CSS/sale.css';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

// Hooks
import UseAuth from "../hooks/UseAuth";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import Usecart from "../hooks/Usecart";

// Components
import ProductsSection from "../Pages/Products/Products";
import MiniProductsSection from "../Pages/MiniProductsSection/MiniProductsSection";
import DealOfTheDay from "../Pages/DealOfTheDay/DealofTheDay";

// Category icons
import dressIcon from "../assets/images/icons/dress.svg";
import shoesIcon from "../assets/images/icons/shoes.svg";
import jewelryIcon from "../assets/images/icons/jewelry.svg";
import perfumeIcon from "../assets/images/icons/perfume.svg";
import cosmeticsIcon from "../assets/images/icons/cosmetics.svg";
import glassesIcon from "../assets/images/icons/glasses.svg";
import bagIcon from "../assets/images/icons/bag.svg";

const EcommerceLayout = () => {
    const [categories, setCategories] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const contentRefs = useRef([]);
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();
    const [cart, isLoading, isError, refetch] = Usecart();

    // Static categories with imported icons
    useEffect(() => {
        const staticCategories = [
            { name: "Clothes", icon: dressIcon, subItems: [
                { name: "Shirt", count: 300 },
                { name: "Shorts & Jeans", count: 120 },
                { name: "Jacket", count: 80 },
                { name: "Dress & Frock", count: 80 }
            ] },
            { name: "Footwear", icon: shoesIcon, subItems: [
                { name: "Sports", count: 150 },
                { name: "Formal", count: 60 },
                { name: "Casual", count: 45 },
                { name: "Safety Shoes", count: 45 }
            ] },
            { name: "Jewelry", icon: jewelryIcon, subItems: [
                { name: "Earrings", count: 40 },
                { name: "Couple Rings", count: 50 },
                { name: "Necklace", count: 30 }
            ] },
            { name: "Perfume", icon: perfumeIcon, subItems: [
                { name: "Clothes Perfume", count: 40 },
                { name: "Deodorant", count: 50 },
                { name: "Flower Fragrance", count: 30 },
                { name: "Air Freshener", count: 30 }
            ] },
            { name: "Cosmetics", icon: cosmeticsIcon, subItems: [
                { name: "Shampoo", count: 40 },
                { name: "Sunscreen", count: 50 },
                { name: "Body Wash", count: 30 },
                { name: "Makeup kit", count: 30 }
            ] },
            { name: "Glasses", icon: glassesIcon, subItems: [
                { name: "Sunglasses", count: 40 },
                { name: "Lenses", count: 50 }
            ] },
            { name: "Bags", icon: bagIcon, subItems: [
                { name: "Shopping Bag", count: 40 },
                { name: "Gym Backpack", count: 50 },
                { name: "Purse", count: 30 },
                { name: "Wallet", count: 30 }
            ] },
        ];

        setCategories(staticCategories);
    }, []);

    // Fetch Best Sellers
    useEffect(() => {
        fetch("/BestSeller.json")
            .then(res => res.json())
            .then(data => setBestSellers(data));
    }, []);

    // Fetch Timeline
    useEffect(() => {
        fetch("/timeline.json")
            .then(res => res.json())
            .then(data => setTimeline(data));
    }, []);

    const toggleCategory = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleAddToCart = product => {
        if (user && user.email) {
            const cartItem = {
                ProductMainID: product._id,
                email: user.email,
                title: product.title,
                price: product.price,
                image: product.image
            };
            axiosSecure.post('/carts', cartItem)
                .then(res => refetch())
                .catch(err => console.error('Error adding to cart:', err));
        } else {
            Swal.fire({
                title: "Login Required?",
                text: "You need to login to add to cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then(result => {
                if (result.isConfirmed) navigate('/login');
            });
        }
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div className="flex text-yellow-400 gap-0.5 text-sm">
                {[...Array(fullStars)].map((_, i) => <span key={"full" + i}>★</span>)}
                {halfStar && <span>☆</span>}
                {[...Array(emptyStars)].map((_, i) => <span key={"empty" + i} className="text-gray-300">★</span>)}
            </div>
        );
    };

    // Sample Product Arrays
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

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white min-h-screen font-sans mt-10">
            {/* Sidebar */}
            <div className="sticky top-2 h-fit hidden sm:block">
                <div className="p-4 border rounded-md bg-white">
                    <h3 className="font-semibold mb-4 text-gray-800 uppercase text-lg tracking-wide">Category</h3>
                    <ul className="space-y-3">
                        {categories.map((cat, i) => (
                            <li key={i}>
                                <div
                                    onClick={() => toggleCategory(i)}
                                    className={`flex justify-between items-center text-sm text-gray-800 cursor-pointer transition-all duration-300 ${openIndex === i ? "border-b py-2" : ""}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <img className="w-6 h-6 object-contain" src={cat.icon} alt={cat.name} />
                                        <h1 className="text-gray-500 text-lg font-semibold">{cat.name}</h1>
                                    </div>
                                    <span className="text-gray-500 text-lg transition-transform duration-300">
                                        {openIndex === i ? "−" : "+"}
                                    </span>
                                </div>

                                <div
                                    ref={(el) => (contentRefs.current[i] = el)}
                                    style={{ maxHeight: openIndex === i ? `${contentRefs.current[i]?.scrollHeight}px` : "0px" }}
                                    className="overflow-hidden transition-all duration-500 ease-in-out"
                                >
                                    <ul className="mt-2 space-y-1 text-sm text-gray-600 py-1">
                                        {cat.subItems.map((sub, j) => (
                                            <li key={j} className="flex justify-between hover:text-black cursor-pointer">
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

                {/* Best Sellers */}
                <div className="mt-6">
                    <h3 className="font-semibold mb-4 text-gray-700 uppercase text-sm tracking-wide">Best Sellers</h3>
                    <ul className="space-y-4">
                        {bestSellers.map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <img className="w-20 rounded-lg" src={item.image} alt={item.name} />
                                <div>
                                    <p className="text-md font-base text-gray-800">{item.name}</p>
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
                    <MiniProductsSection title="New Arrivals" products={newArrivals} />
                    <MiniProductsSection title="Trending" products={trending} />
                    <MiniProductsSection title="Top Rated" products={topRated} />
                </div>

                <DealOfTheDay />
                <ProductsSection />
            </div>
        </div>
    );
};

export default EcommerceLayout;
