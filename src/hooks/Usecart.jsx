import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import UseAuth from './UseAuth';


const Usecart = () => {
    // tan stack query 
    const axiosSecure =UseAxiosSecure();
    const {user}=UseAuth();

      const { data: cart = [], isLoading, isError, refetch } = useQuery({
        queryKey:['cart' , user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/carts?email=${user.email}`);

            // console.log(res.data);
            return res.data;
            
           
        }
    })

    return [cart, isLoading, isError, refetch];

  
};

export default Usecart;