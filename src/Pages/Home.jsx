import React from 'react';
import Nabvar from '../Shared/Nabvar';

import Herosection from './Herosection';
import Categories from './Categories';
import '../App.css';
import '../index.css';
import EcommerceLayout from './EcommerceLayout';
import TestimonialServices from './TestimonialServices';
import BlogSection from './BlogSection';
import BrandDirectory from './BrandDirectory';
import Footer from '../Shared/Footer';
import CartDrawer from './User/Cart';


const Home = () => {
    return (
        <div>
            {/* <Nabvar></Nabvar> */}
            <div className='max-w-[1320px] mx-auto'>

                <Herosection></Herosection>
                <Categories></Categories>
                <EcommerceLayout></EcommerceLayout>
                <TestimonialServices></TestimonialServices>
                <BlogSection></BlogSection>
               

            </div>
            <CartDrawer isopen={true}></CartDrawer>
             <BrandDirectory></BrandDirectory>
          
             </div>
             
    );
};

export default Home;