import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners'; // ✅ Import spinner

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <PropagateLoader
                    color="rgb(248, 113, 113)"
                    cssOverride={{}}
                    loading
                    size={15}
                    speedMultiplier={0}
                />
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{from:location}} replace />;
};

export default PrivateRoute;
