import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
const Redirect = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

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
        return <Navigate to="/" replace />;
    }

    return children;
};

export default Redirect;
