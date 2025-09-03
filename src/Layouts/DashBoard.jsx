import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  LayoutDashboard,
  User,
  Upload,
  Truck,
  Settings,
  Package,
  Heart,
  ShoppingCart,
  FileText,
  Users,
  Shield,
  BarChart3,
  AlertTriangle,
} from "lucide-react";

import useAxiosSecure from "../hooks/UseAxiosSecure";
import UseAuth from "../hooks/UseAuth";

const DashBoard = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  // Fetch user info
  const { data: userInfo, isLoading: userLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (userLoading) {
    return <div className="p-6 text-center">Loading dashboard...</div>;
  }

  const role = userInfo?.role || "user";

  // Menu configuration with icons
  const menus = {
    vendor: [
      { path: "/dashboard/vendors-products-details", label: "Dashboard", icon: LayoutDashboard },
      { path: "/dashboard/vendor-profile", label: "Public Profile", icon: User },
      { path: "/dashboard/vendor-upload", label: "Uploads", icon: Upload },
      { path: "vendor-track-shipping", label: "Track Shipping", icon: Truck },
      { path: "/dashboard/vendor-products", label: "Products", icon: Package },
      { path: "/dashboard/vendor-setting", label: "Settings", icon: Settings },
    ],
    user: [
      { path: "/dashboard/user-profile", label: "User Profile", icon: User },
      { path: "/dashboard/history", label: "History", icon: FileText },
      { path: "/wishlist", label: "Wishlist", icon: Heart },
      { path: "/dashboard/cart", label: "Cart & Checkout", icon: ShoppingCart },
      { path: "/dashboard/track-order", label: "Track Order", icon: Truck },
      { path: "/dashboard/invoice", label: "Invoice", icon: FileText },
      { path: "/dashboard/request", label: "Role Request", icon: Shield },
    ],
    admin: [
      { path: "/dashboard/all-users", label: "All Users", icon: Users },
      { path: "/dashboard/all-vendors", label: "All Vendors", icon: Package },
      { path: "/dashboard/all-moderators", label: "All Moderators", icon: Shield },
      { path: "/dashboard/makeadmin", label: "Pending Requests", icon: AlertTriangle },
      { path: "/dashboard/approve-coupon", label: "Pending Coupon Aprovals", icon: AlertTriangle },
    ],
    moderator: [
      { path: "/moderator/all-vendors", label: "All Vendors", icon: Package },
      { path: "/moderator/new-vendor-requests", label: "New Seller Requests", icon: Upload },
      { path: "/moderator/moderation", label: "Product Moderation", icon: BarChart3 },
      { path: "/moderator/reports", label: "Reports & Spams", icon: AlertTriangle },
       { path: "/dashboard/add-coupon", label: "Add Coupon", icon: AlertTriangle },
    ],
  };

  const currentMenu = menus[role] || menus.user;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="h-[60px] max-w-[1320px] mx-auto flex justify-between items-center px-6">
          <h1 className="text-xl font-bold text-gray-800">Warium Dashboard</h1>
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <span>Home</span>
            <span className="mx-1 text-gray-400">›</span>
            <span className="text-blue-600 font-medium">{role.toUpperCase()}</span>
          </nav>
        </div>
      </header>

      {/* Layout */}
      <div className="flex max-w-[80%] mx-auto mt-6 gap-6 px-4">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white border rounded-xl shadow-sm sticky top-[80px] h-fit">
          <div className="text-center py-6 border-b">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="User Avatar"
              className="w-20 h-20 rounded-full mx-auto mb-3 border shadow-sm"
            />
            <h2 className="font-semibold text-gray-800">{user?.displayName || role.toUpperCase()}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
          <ul className="p-4 space-y-2">
            {currentMenu.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Content */}
        <main className="flex-1 bg-white border rounded-xl shadow-sm p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
