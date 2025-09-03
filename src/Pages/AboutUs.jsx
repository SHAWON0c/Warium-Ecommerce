import React, { useEffect, useState, useRef } from 'react';
import aboutImg from '../assets/images/about/1.jpg';

const testimonials = [
    {
        id: 1,
        name: 'John Doe',
        position: 'General Manager',
        comment:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        rating: 5,
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
        id: 2,
        name: 'Jane Smith',
        position: 'Marketing Head',
        comment:
            "Great service and excellent team! Highly recommended for anyone seeking professional results.",
        rating: 4,
        image: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
    {
        id: 3,
        name: 'Robert Johnson',
        position: 'CEO',
        comment:
            "Outstanding experience from start to finish. They delivered exactly what we needed.",
        rating: 5,
        image: 'https://randomuser.me/api/portraits/men/46.jpg',
    },
];

const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
    "/img6.jpg",
    "/img7.jpg",
    "/img8.jpg",
];

const AboutUs = () => {
    const [current, setCurrent] = useState(0);
    const scrollRef = useRef(null); // ✅ ADD THIS LINE

    const handleSelect = (index) => {
        setCurrent(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollLeft += 1;
                if (
                    scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
                    scrollRef.current.scrollWidth
                ) {
                    scrollRef.current.scrollLeft = 0; // Reset when end is reached
                }
            }
        }, 20); // Speed control

        return () => clearInterval(interval);
    }, []);

    const { name, position, comment, rating } = testimonials[current];

    return (
        <div>
            {/* Breadcrumb */}
            <div className="w-full bg-gray-100 border">
                <div className="h-[55px] max-w-[1320px] mx-auto flex justify-between items-center px-4">
                    <h1 className="text-lg font-semibold">About Us</h1>
                    <nav className="flex items-center text-md text-gray-600 space-x-1 gap-2">
                        <span>Home</span>
                        <span className="mx-1 text-lg text-red-400">››</span>
                        <span className='text-red-300'>About us</span>
                    </nav>
                </div>
            </div>

            {/* About Section */}
            <div className="flex flex-col justify-center mx-auto items-center max-w-[1320px] mt-20">
                <h1 className="text-black text-3xl font-bold mb-2">About Us</h1>
                <p className="text-sm text-gray-500">about our Business website</p>
            </div>

            <div className="flex items-center max-w-[1320px] mx-auto mt-10 gap-6">
                <img className="w-[670px] h-auto" src={aboutImg} alt="About" />
                <div>
                    <h1 className="text-xl text-gray-500 pb-2 font-semibold">What is Warium?</h1>
                    <p className="pb-2 text-left text-base text-gray-700">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam fuga quo commodi quas labore itaque, eos nihil perferendis nulla? Id odio magnam accusamus veniam fuga, doloribus maiores dignissimos minus asperiores?
                    </p>
                    <p className="pb-2 text-left text-base text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, repellat numquam. Magnam fugit modi esse! Accusamus eligendi quisquam sequi consequuntur. Rem reiciendis qui saepe laudantium placeat reprehenderit dolore tempore quod.
                    </p>
                    <p className="text-base text-gray-700">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem obcaecati perspiciatis tempora, quis vel ea, reiciendis voluptates dolorum alias neque sint dolores consectetur eius rerum. Totam quis quasi ad vel!
                    </p>
                </div>
            </div>

            {/* Testimonial */}
            <div className="bg-[#F9F9F9] py-16 mt-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-semibold text-gray-800">Client Review</h2>
                    <p className="text-gray-500 mt-2">What say client about us</p>
                </div>

                {/* Slider */}
                <div className="relative overflow-hidden max-w-4xl mx-auto rounded-3xl">
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {testimonials.map((t) => (
                            <div key={t.id} className="min-w-full p-8 bg-white rounded shadow relative">
                                <div className="absolute top-4 left-4 text-4xl text-gray-400">&ldquo;</div>
                                <div className="text-center px-8">
                                    <p className="text-gray-600 text-lg mb-6">{t.comment}</p>
                                    <h3 className="text-xl font-semibold text-orange-500">{t.name}</h3>
                                    <p className="text-gray-500">{t.position}</p>
                                    <div className="flex justify-center mt-2 text-pink-500">
                                        {Array.from({ length: t.rating }).map((_, idx) => (
                                            <span key={idx}>★</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-4 text-4xl text-gray-400">&rdquo;</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Images */}
                <div className="flex justify-center space-x-4 mt-8">
                    {testimonials.map((t, index) => (
                        <img
                            key={t.id}
                            src={t.image}
                            alt={t.name}
                            onClick={() => handleSelect(index)}
                            className={`w-16 h-16 rounded-full border-4 cursor-pointer transition-all duration-300 ${current === index ? 'border-orange-500 scale-110' : 'border-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Instagram Feed */}
            <section className="py-16 bg-white">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Instagram Feed</h2>
                    <p className="text-gray-500">Share your store with us</p>
                </div>

                <div className="relative overflow-hidden">
                    <div className="flex animate-insta-slide">
                        {images.concat(images).map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Insta ${index + 1}`}
                                className="w-64 h-72 object-cover rounded-md shrink-0 mx-2"
                            />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutUs;
