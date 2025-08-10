import React, { useState } from 'react';

import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../hooks/useAuth';

const MakeRequest = () => {
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = UseAuth(); // Firebase user
    const axiosSecure = useAxiosSecure();

    // ✅ Fetch full user info from MongoDB by email
    const { data: userInfo, isLoading: userLoading } = useQuery({
        queryKey: ['userInfo', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!role) {
            setMessage('❗ Please select a role.');
            return;
        }

        if (!user?.email || !userInfo?._id) {
            setMessage('⚠️ User not found.');
            return;
        }

        if (userLoading) {
            setMessage('🔄 Please wait, loading user info...');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const res = await axiosSecure.post('/role-requests', {
                userId: userInfo._id, // ✅ MongoDB _id
                email: user.email,
                requestedRole: role,
                status: 'pending',
                name: user.displayName || user.name || userInfo?.name || 'Unknown',
            });

            if (res?.data?.insertedId) {
                setMessage('✅ Role request submitted successfully!');
            } else {
                setMessage('⚠️ Could not submit the request.');
            }
        } catch (error) {
            console.error(error);
            setMessage('❌ Failed to submit role request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto border rounded shadow">
            <h1 className="text-xl font-bold mb-4">Request a Role</h1>

            <form onSubmit={handleSubmit}>
                <label className="block mb-2 font-semibold">
                    Select Role:
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="block w-full mt-1 p-2 border rounded"
                    >
                        <option value="">-- Choose an option --</option>
                        <option value="vendor">Vendor</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                    </select>
                </label>

                <button
                    type="submit"
                    disabled={loading || userLoading}
                    className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Submitting...' : userLoading ? 'Loading user...' : 'Submit Request'}
                </button>
            </form>

            {message && (
                <p className="mt-4 text-center text-sm font-medium text-gray-700">{message}</p>
            )}
        </div>
    );
};

export default MakeRequest;
