import React from 'react';
import { Outlet } from 'react-router-dom';

const DashBoard = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default DashBoard;