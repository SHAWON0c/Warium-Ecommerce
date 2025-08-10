import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAdmin from '../../hooks/useAdmin';
import useMakeAdmin from '../../hooks/useMakeAdmin';  // add this import
import useMakeModerator from '../../hooks/useMakeModerator';
import useAxiosSecure from '../../hooks/UseAxiosSecure';


const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();

  // Use useQuery and get refetch from here only, DO NOT accept refetch as prop
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

  // Use the refetch from useQuery in your custom hook
  const handleMakeAdmin = useMakeAdmin(refetch);

    const handleMakeModerator= useMakeModerator(refetch);

  if (isLoading) return <p className="p-6">Loading users...</p>;

  // Your other handlers (suspend, delete) remain unchanged
  const handleSuspend = (userId) => {
    console.log('Suspend:', userId);
    // Example patch:
    // axiosSecure.patch(`/users/suspend/${userId}`).then(refetch);
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to restore this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${userId}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'User has been removed.', 'success');
              refetch();
            }
          })
          .catch(() => {
            Swal.fire('Error', 'Could not delete user.', 'error');
          });
      }
    });
  };

  // Return your exact same UI JSX here
  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Total Users: {users.length}</h1>

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
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50 text-gray-700">
                  <td className="px-6 py-4">{user._id.slice(0, 6)}...</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4 flex gap-2 items-center whitespace-nowrap">
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => handleMakeAdmin(user._id, user.requestId)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Make Admin
                      </button>
                    )}

                    {user.role !== 'moderator' && (
                      <button
                        onClick={() => handleMakeModerator(user._id, user.requestId)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Make Moderator
                      </button>
                    )}
                    <button
                      onClick={() => handleSuspend(user._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Suspend
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 text-xl hover:text-red-700"
                      title="Delete user"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
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
