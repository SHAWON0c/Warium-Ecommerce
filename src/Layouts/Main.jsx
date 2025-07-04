import React from 'react';
import { Outlet } from 'react-router-dom';
import '../App.css';
import '../index.css';
const Main = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;