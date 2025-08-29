import React, { useContext, useEffect, useRef, useState } from "react";
import cloth1 from '../assets/images/products/clothes-1.jpg'
import { Progress } from "@material-tailwind/react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEye, faRefresh, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import '../CSS/sale.css'

//Deal of the day 
import shampo from '../assets/images/products/shampoo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from "../Provider/AuthProvider";
import UseAuth from "../hooks/UseAuth";
import Swal from 'sweetalert2'
import { Outlet, useNavigate } from "react-router-dom";

import UseAxiosSecure from "../hooks/UseAxiosSecure";
import Usecart from "../hooks/Usecart";

const ProductDetailslayout = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [bestSellers, SetbestSellers] = useState([])
    const [timeline, setTimeline] = useState([])

    const sold = 20;
    const available = 40;
    const total = sold + available;
    const percentageSold = (sold / total) * 100;
    const [openIndex, setOpenIndex] = useState(null);
    const contentRefs = useRef([]);
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const navigate = useNavigate();
    const [cart, isLoading, isError, refetch] = Usecart();


    useEffect(() => {
        fetch("/BestSeller.json")
            .then(res => res.json())
            .then((data) => SetbestSellers(data))

    }, [])
    useEffect(() => {
        fetch("/timeline.json")
            .then(res => res.json())
            .then((data) => setTimeline(data))

    }, [])
    //(timeline);


    useEffect(() => {
        fetch("/categories.json")
            .then(res => res.json())
            .then((data) => setCategories(data))
    }, [])
    // //(categories);

    useEffect(() => {
        fetch("https://warium-ecommerce-server-api.onrender.com/products")
            .then(res => res.json())
            .then((data) => setProducts(data))

    }, [])






    const toggleCategory = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleAddToCart = product => {
        if (user && user.email) {
            //toDo:sent to database
            // //(user, product);
            const carItem = {
                ProductMainID: product._id,
                email: user.email,
                title: product.title,
                price: product.price,
                image: product.image
            }
            axiosSecure.post('/carts', carItem)
                .then(res => {
                    //(res.data);
                    refetch(); // <-- add parentheses to call the function
                })
                .catch(error => {
                    console.error('Error adding to cart:', error);
                });



        }
        else {

            Swal.fire({
                title: "Login Required?",
                text: "You won't be able to add cart without login",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
        }

    }



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
        <div className="max-w-[80%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6  bg-white min-h-screen font-sans mt-10">
                {/* Sidebar */}
                <div className=" hidden lg:block lg:sticky top-2 h-fit">
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
                    <Outlet></Outlet>

                </div>









            </div>
        </div>
    );
};

export default ProductDetailslayout;
