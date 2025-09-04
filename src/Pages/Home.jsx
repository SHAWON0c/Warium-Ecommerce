import Herosection from './Herosection';
import Categories from './Categories';
import '../App.css';
import '../index.css';
import TestimonialServices from './TestimonialServices';
import BlogSection from './BlogSection';
import CartDrawer from './User/CarDrawer';
import EcommerceLayout from '../Layouts/EcommerceLayout';
import TshirtHome from '../AIfeatures/pages/TshirtHome';
import TshirtCustomizer from '../AIfeatures/pages/TshirtCustomizer';
import CanvasModel from '../AIfeatures/canvas';

const Home = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="w-full lg:max-w-[80%] lg:mx-auto">
                <Herosection />
            </div>

            {/* Main Content Centered */}
            <div className='lg:max-w-[70%] max-w-[90%] mx-auto flex flex-col gap-12'>
                <Categories />
                <EcommerceLayout />

                {/* T-shirt AI Section
                <div className="w-full">
                    <h1> hello </h1>
                    <CanvasModel />
                    <TshirtCustomizer />
                </div> */}


                {/* T-shirt AI Section */}
            


                <TestimonialServices />
                <BlogSection />
            </div>

            {/* Cart Drawer */}
            <CartDrawer isopen={true} />
        </div>
    );
};

export default Home;
