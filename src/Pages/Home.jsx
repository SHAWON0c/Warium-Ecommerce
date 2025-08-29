import React from 'react';
import Nabvar from '../Shared/Nabvar';

import Herosection from './Herosection';
import Categories from './Categories';
import '../App.css';
import '../index.css';
import TestimonialServices from './TestimonialServices';
import BlogSection from './BlogSection';
import BrandDirectory from './BrandDirectory';
import Footer from '../Shared/Footer';
import CartDrawer from './User/Cart';
import EcommerceLayout from '../Layouts/EcommerceLayout';

const Home = () => {
    return (
        <div>
            {/* Full-width on mobile, 80% centered on desktop */}
            <div className="w-full lg:max-w-[80%] lg:mx-auto">
                <Herosection />
            </div>

            {/* Main Content Centered */}
            <div className='max-w-[80%] mx-auto'>
                <Categories />
                <EcommerceLayout />
                <TestimonialServices />
                <BlogSection />
            </div>

            <CartDrawer isopen={true} />
            <BrandDirectory />
        </div>
    );
};

export default Home;
