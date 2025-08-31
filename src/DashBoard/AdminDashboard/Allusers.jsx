import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAdmin from '../../hooks/useAdmin';
import useMakeAdmin from '../../hooks/useMakeAdmin';
import useMakeModerator from '../../hooks/useMakeModerator';
import useMakeVendor from '../../hooks/useMakeVendor';
import useAxiosSecure from '../../hooks/UseAxiosSecure';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      return res.data;
    },
  });

  const handleMakeAdmin = useMakeAdmin(refetch);
  const handleMakeModerator = useMakeModerator(refetch);
  const handleMakeVendor = useMakeVendor(refetch);

  const handleSuspend = (userId) => {
    Swal.fire({
      title: 'Suspend User?',
      text: "This user won't be able to login.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#facc15', // yellow
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, suspend!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/suspend/${userId}`).then(() => refetch());
      }
    });
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: 'Delete User?',
      text: 'This action is irreversible!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${userId}`).then(() => refetch());
      }
    });
  };

  if (isLoading)
    return <p className="p-6 text-center text-gray-500">Loading users...</p>;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Total Users: {users.length}
      </h1>

      <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
        {/* Table Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-700">User List</h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase tracking-wide">
              <tr>
                <th className="px-6 py-3 text-left">User ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {user._id.slice(0, 6)}...
                  </td>
                  <td className="px-6 py-4 text-gray-700">{user.name}</td>
                  <td className="px-6 py-4 text-gray-500">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full capitalize ${user.role === 'admin'
                          ? 'bg-blue-100 text-blue-700'
                          : user.role === 'moderator'
                            ? 'bg-purple-100 text-purple-700'
                            : user.role === 'vendor'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end flex-wrap gap-2">
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => handleMakeAdmin(user._id, user.requestId)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md shadow hover:bg-blue-600 transition"
                        >
                          Make Admin
                        </button>
                      )}
                      {user.role !== 'moderator' && (
                        <button
                          onClick={() => handleMakeModerator(user._id, user.requestId)}
                          className="bg-purple-500 text-white px-3 py-1 rounded-md shadow hover:bg-purple-600 transition"
                        >
                          Make Moderator
                        </button>
                      )}
                      {user.role !== 'vendor' && (
                        <button
                          onClick={() => handleMakeVendor(user._id, user.requestId)}
                          className="bg-green-500 text-white px-3 py-1 rounded-md shadow hover:bg-green-600 transition"
                        >
                          Make Vendor
                        </button>
                      )}
                      <button
                        onClick={() => handleSuspend(user._id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md shadow hover:bg-yellow-600 transition"
                      >
                        Suspend
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-500 hover:text-red-700 text-lg transition"
                        title="Delete user"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 font-medium"
                  >
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

export default AllUsers;
