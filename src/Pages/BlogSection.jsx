import React from "react";
import blog1 from "../assets/images/banner/blog-1.jpg"
import blog2 from "../assets/images/banner/blog-2.jpg"
import blog3 from "../assets/images/banner/blog-3.jpg"
import blog4 from "../assets/images/banner/blog-4.jpg"
const BlogSection = () => {
  const blogs = [
    {
      category: "Fashion",
      title: "Clothes Retail KPIs 2021 Guide for Clothes Executives.",
      author: "Mr Admin",
      date: "Apr 06, 2022",
      imageBg: blog1
    },
    {
      category: "Clothes",
      title: "Curbside fashion Trends: How to Win the Pickup Battle.",
      author: "Mr Robin",
      date: "Jan 18, 2022",
      imageBg: blog2
    },
    {
      category: "Shoes",
      title: "EBT vendors: Claim Your Share of SNAP Online Revenue.",
      author: "Mr Selsa",
      date: "Feb 10, 2022",
      imageBg: blog3
    },
    {
      category: "Electronics",
      title: "Curbside fashion Trends: How to Win the Pickup Battle.",
      author: "Mr Pawar",
      date: "Mar 15, 2022",
      imageBg:blog4
    },
  ];

  return (
    <div className=" mx-auto py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogs.map((blog, index) => (
          <div key={index} className="">
            <div className="h-48  mb-4">
                <img 
                className="rounded-lg"
                src={blog.imageBg} alt="" />
            </div>
            <p className="text-pink-500 text-sm font-semibold mb-2">{blog.category}</p>
            <h3 className="font-bold text-lg text-gray-800 mb-2 leading-snug">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-500">
              By <span className="text-gray-700 font-medium">{blog.author}</span> / {blog.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection; 