import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AdminRequest = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    // --- ACTION HANDLERS ---
    const handleMakeAdmin = async (userId) => {
        console.log('Make Admin:', userId);
        // await axiosSecure.patch(`/users/admin/${userId}`);
        // refetch();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${userId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                "Deleted!",
                                "Item has been removed from your cart.",
                                "success"
                            );
                            refetch(); // 🟢 Update cart items
                        } else {
                            Swal.fire(
                                "Error!",
                                "Item could not be deleted.",
                                "error"
                            );
                        }
                    })
                    .catch(() => {
                        Swal.fire(
                            "Error!",
                            "Something went wrong while deleting.",
                            "error"
                        );
                    });
            }
        });

    };

    const handleMakeModerator = async (userId) => {
        console.log('Make Moderator:', userId);
        // await axiosSecure.patch(`/users/moderator/${userId}`);
        // refetch();
    };

    const handleSuspend = async (userId) => {
        console.log('Suspend:', userId);
        // await axiosSecure.patch(`/users/suspend/${userId}`);
        // refetch();
    };

    const handleDelete = async (userId) => {
        console.log('Delete:', userId);
        // await axiosSecure.delete(`/users/${userId}`);
        // refetch();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${userId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                "Deleted!",
                                "Item has been removed from your cart.",
                                "success"
                            );
                            refetch(); // 🟢 Update cart items
                        } else {
                            Swal.fire(
                                "Error!",
                                "Item could not be deleted.",
                                "error"
                            );
                        }
                    })
                    .catch(() => {
                        Swal.fire(
                            "Error!",
                            "Something went wrong while deleting.",
                            "error"
                        );
                    });
            }
        });



    };

    return (
        <div className="p-6">
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-700 mb-4">
                Total Users: {users.length}
            </h1>

            {/* User Table */}
            <div className="bg-white rounded-xl shadow border">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">User List</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="px-6 py-3">User ID</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-b hover:bg-gray-50 text-gray-700 items-center"
                                >
                                    <td className="px-6 py-4">{user._id.slice(0, 6)}...</td>
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4 space-x-2 whitespace-nowrap items-center flex">
                                        {user.role !== 'admin' && (
                                            <button
                                                onClick={() => handleMakeAdmin(user._id)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            >
                                                Admin
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleMakeModerator(user._id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            Moderator
                                        </button>
                                        <button
                                            onClick={() => handleSuspend(user._id)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                        >
                                            Suspend
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="text-red-500 text-xl hover:text-red-700 ml-4 inline-flex items-center"
                                            title="Delete user"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-6 text-gray-500">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminRequest;
