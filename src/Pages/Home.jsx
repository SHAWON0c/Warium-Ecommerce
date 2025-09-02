import Herosection from './Herosection';
import Categories from './Categories';
import '../App.css';
import '../index.css';
import TestimonialServices from './TestimonialServices';
import BlogSection from './BlogSection';
import CartDrawer from './User/CartCheckout';
import EcommerceLayout from '../Layouts/EcommerceLayout';
import TshirtHome from '../AIfeatures/pages/TshirtHome';
import TshirtCustomizer from '../AIfeatures/pages/TshirtCustomizer';
import CanvasModel from '../AIfeatures/canvas';

const Home = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="w-full lg:max-w-[90%] lg:mx-auto">
                <Herosection />
            </div>

            {/* Main Content Centered */}
            <div className='max-w-[80%] mx-auto flex flex-col gap-12'>
                <Categories />
                <EcommerceLayout />

                {/* T-shirt AI Section
                <div className="w-full">
                    <h1> hello </h1>
                    <CanvasModel />
                    <TshirtCustomizer />
                </div> */}


                {/* T-shirt AI Section */}
                <div className="w-full flex flex-col items-center gap-6 my-12 px-4 lg:px-0">
                    {/* Heading and Button */}
                    <div className="text-center flex flex-col items-center gap-3 justify-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                            Customize Your T-shirt
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 max-w-xl">
                            Create your unique style using our AI-powered 3D customization tool.
                        </p>
                        <button
                            onClick={() => alert("Start Customizing!")}
                            className="mt-3 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                        >
                            Start Customizing
                        </button>
                    </div>

                    {/* Canvas Model */}
                    {/* <div className="w-full flex justify-center mt-2 mx-auto">
                        <CanvasModel />
                    </div> */}

                    {/* T-shirt Customizer */}
                    {/* <div className="w-full mt-2 ">
                        <TshirtCustomizer />
                    </div> */}
                </div>


                <TestimonialServices />
                <BlogSection />
            </div>

            {/* Cart Drawer */}
            <CartDrawer isopen={true} />
        </div>
    );
};

export default Home;
