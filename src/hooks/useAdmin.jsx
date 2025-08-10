import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxiosSecure from './UseAxiosSecure';

const useAdmin = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: isAdmin,
        isLoading,
        isError
    } = useQuery({
        enabled: !!user?.email,
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data?.admin;
        }
    });

    if (isAdmin === true) {
        console.log("✅ This user is an admin.");
    }
    else{
        console.log('user is not adim');
    }

    return [isAdmin, isLoading, isError];
};

export default useAdmin;
