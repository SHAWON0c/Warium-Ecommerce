import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from '../hooks/UseAxiosSecure';
import UseAuth from '../hooks/UseAuth';


const DashBoard = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user info from DB
  const { data: userInfo, isLoading: userLoading } = useQuery({
    queryKey: ['userInfo', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    }
  });

  if (userLoading) {
    return <div className="p-6 text-center">Loading dashboard...</div>;
  }

  const role = userInfo?.role || null;

  // Sidebar menu config
  const menus = {
    vendor: [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/profile/public', label: 'Public Profile' },
      { path: '/uploads', label: 'Uploads' },
      { path: '/track-shipping', label: 'Track Shipping' },
      { path: '/settings', label: 'Settings' },
    ],
    user: [
      { path: '/dashboard/user-profile', label: 'User Profile' },
      { path: '/dashboard/history', label: 'History' },
      { path: '/wishlist', label: 'Wishlist' },
      { path: '/cart', label: 'Cart & Checkout' },
      { path: '/dashboard/track-order', label: 'Track Order' },
      { path: '/dashboard/invoice', label: 'Invoice' },
    ],
    admin: [
      { path: '/dashboard/makeadmin', label: 'Make Admin' },
      { path: '/dashboard/all-users', label: 'All Users' },
      { path: '/dashboard/all-vendors', label: 'All Vendors' },
      { path: '/dashboard/all-moderators', label: 'All Moderators' },
    ],
    moderator: [
      { path: '/moderator/all-vendors', label: 'All Vendors' },
      { path: '/moderator/all-users', label: 'All Users' },
    ]
  };

  // Fallback to user menu if no role
  const currentMenu = menus[role] || menus.user;

  return (
    <div>
      {/* Header */}
      <div className="w-full bg-gray-100 border">
        <div className="h-[55px] max-w-[1320px] mx-auto flex justify-between items-center px-4">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <nav className="flex items-center text-md text-gray-600 space-x-1 gap-2">
            <span>Home</span>
            <span className="mx-1 text-lg text-red-400">››</span>
            <span className="text-red-400">{role ? role.toUpperCase() : "USER"}</span>
          </nav>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-[70%] mx-auto mt-10 mb-10">
        {/* Sidebar */}
        <div className="col-span-1 border rounded-md bg-white h-auto sticky top-4">
          <div className="text-center py-6 border-b">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="User Avatar"
              className="w-20 h-20 rounded-full mx-auto mb-3 border"
            />
            <h2 className="font-semibold">{user?.displayName || "Guest User"}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
          <ul className="p-4 space-y-4">
            {currentMenu.map((item, index) => (
              <li key={index} className="border-b pb-2 cursor-pointer hover:text-red-400">
                <Link to={item.path} className="block hover:text-red-500">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="col-span-3 border rounded-md bg-white p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
