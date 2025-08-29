import React from "react";
import cloth1 from '../../assets/images/products/clothes-1.jpg';

const ProductCard = ({ title, category, price, oldPrice }) => (
    <div className="p-4 border rounded-xl bg-white flex flex-row">
        <div>
            <img className="w-20" src={cloth1} alt="" />
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

const MiniProductsSection = ({ title, products }) => (
    <div>
        <h3 className="font-semibold text-gray-800 mb-3 text-left">{title}</h3>
        <div className="grid gap-4">
            {products.map((item, i) => (
                <div key={i} className={`${i >= 2 ? "hidden md:block" : ""}`}>
                    <ProductCard {...item} />
                </div>
            ))}
        </div>
    </div>
);

export default MiniProductsSection;
