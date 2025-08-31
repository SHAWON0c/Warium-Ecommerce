import React, { useState } from 'react';
import { FaUser, FaBell, FaLock, FaCreditCard } from 'react-icons/fa';

const tabs = [
  { id: 'profile', label: 'Profile', icon: <FaUser /> },
  { id: 'account', label: 'Account', icon: <FaCreditCard /> },
  { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
  { id: 'password', label: 'Password', icon: <FaLock /> },
];

const VendorSetting = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-white md:w-64 w-full border-r shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        </div>
        <nav className="p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition hover:bg-gray-100 ${
                activeTab === tab.id ? 'bg-gray-100 font-semibold' : 'text-gray-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Profile Settings</h2>
            <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
              <label className="block">
                <span className="text-gray-700">Full Name</span>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Email</span>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Save Profile
              </button>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Account Settings</h2>
            <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
              <label className="block">
                <span className="text-gray-700">Vendor/Store Name</span>
                <input
                  type="text"
                  placeholder="My Store"
                  className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Store URL</span>
                <input
                  type="text"
                  placeholder="www.mystore.com"
                  className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                Save Account
              </button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Notification Settings</h2>
            <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="h-4 w-4" />
                <span>Email notifications</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="h-4 w-4" />
                <span>SMS notifications</span>
              </label>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                Save Notifications
              </button>
            </div>
          </div>
        )}

        {activeTab === 'password' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
            <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
              <label className="block">
                <span className="text-gray-700">Current Password</span>
                <input
                  type="password"
                  placeholder="********"
                  className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">New Password</span>
                <input
                  type="password"
                  placeholder="********"
                  className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Confirm New Password</span>
                <input
                  type="password"
                  placeholder="********"
                  className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                Change Password
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VendorSetting;
