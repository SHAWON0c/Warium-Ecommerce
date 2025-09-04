import React from 'react';
import { Outlet } from 'react-router-dom';
import '../App.css';
import '../index.css';
import Navbar from '../Shared/Nabvar';
import Footer from '../Shared/Footer';
import ScrollToTop from '../Animation/helper/ScrollToTop';

const Main = () => {
    return (
        <div>
          <ScrollToTop></ScrollToTop>
               <div className="w-full bg-white lg:max-w-[90%] lg:mx-auto ">
             <Navbar></Navbar>
           </div>
            <Outlet></Outlet>
           <Footer></Footer>
        </div>
    );
};

export default Main;