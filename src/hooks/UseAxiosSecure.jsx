import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = UseAuth();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access-token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error?.response?.status;
                console.log('Interceptor caught error:', status);

                if (status === 401 || status === 403 || status ===404 ) {
                    console.warn('Unauthorized. Logging out...');
                    try {
                        logOut(); // must return Promise
                        localStorage.removeItem('access-token')
                        
                        console.log('Logged out successfully');

                        setTimeout(() => {
                            navigate('/login');
                        }, 100);
                    } catch (logoutError) {
                        console.error("LogOut failed:", logoutError);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate, logOut]);

    return axiosSecure;
};

export default useAxiosSecure;
