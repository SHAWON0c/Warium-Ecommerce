import React from 'react';
import Nabvar from '../Shared/Nabvar';
import Footer from '../Shared/Footer';
import Herosection from './Herosection';
import Categories from './Categories';
import '../App.css';
import '../index.css';
import EcommerceLayout from './EcommerceLayout';

const Home = () => {
    return (
        <div>
            <Nabvar></Nabvar>
            <div className='max-w-[1320px] mx-auto'>

                <Herosection></Herosection>
                <Categories></Categories>
                <EcommerceLayout></EcommerceLayout>

            </div>
        </div>
    );
};

export default Home;