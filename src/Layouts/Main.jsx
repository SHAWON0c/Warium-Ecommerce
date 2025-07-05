import React from 'react';
import { Outlet } from 'react-router-dom';
import '../App.css';
import '../index.css';
import Navbar from '../Shared/Nabvar';
import Footer from '../Shared/Footer';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
           <Footer></Footer>
        </div>
    );
};

export default Main;