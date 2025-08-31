import React from "react";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  XCircle,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dummy Orders Data
const orders = [
  {
    id: 225,
    image: "https://i.ibb.co/qx3kYpT/baby-shoes.png",
    name: "Stylish baby shoes",
    method: "COD",
    status: "Pending",
    total: "$320",
  },
  {
    id: 548,
    image: "https://i.ibb.co/W6VFcsz/blue-hoodie.png",
    name: "Sweat Pullover Hoodie",
    method: "Cash",
    status: "Pending",
    total: "$214",
  },
  {
    id: 684,
    image: "https://i.ibb.co/kJZ1pYP/shirt.png",
    name: "T-shirt for girl",
    method: "Ewallets",
    status: "On Way",
    total: "$548",
  },
  {
    id: 987,
    image: "https://i.ibb.co/bWWbWp6/hat.png",
    name: "Wool hat for men",
    method: "Bank Transfers",
    status: "Delivered",
    total: "$200",
  },
];

// Stat Cards
const statCards = [
  { title: "Revenue", value: "$24,560", icon: DollarSign, color: "bg-green-500" },
  { title: "Gross Margin", value: "68%", icon: BarChart3, color: "bg-purple-500" },
  { title: "Sales", value: "2,350", icon: ShoppingBag, color: "bg-blue-500" },
  { title: "Orders", value: "1,245", icon: TrendingUp, color: "bg-orange-400" },
  { title: "Customers", value: "850", icon: Users, color: "bg-rose-500" },
  { title: "Cancellations", value: "32", icon: XCircle, color: "bg-red-500" },
];

// Trending Products
const trendingProducts = [
  {
    id: 1,
    image: "https://i.ibb.co/qx3kYpT/baby-shoes.png",
    name: "Baby Shoes",
    sales: 320,
  },
  {
    id: 2,
    image: "https://i.ibb.co/W6VFcsz/blue-hoodie.png",
    name: "Blue Hoodie",
    sales: 210,
  },
  {
    id: 3,
    image: "https://i.ibb.co/kJZ1pYP/shirt.png",
    name: "Girl T-shirt",
    sales: 185,
  },
];

// Dummy Graph Data
const graphData = [
  { month: "Jan", revenue: 4000, sales: 2400 },
  { month: "Feb", revenue: 3000, sales: 1398 },
  { month: "Mar", revenue: 2000, sales: 9800 },
  { month: "Apr", revenue: 2780, sales: 3908 },
  { month: "May", revenue: 1890, sales: 4800 },
  { month: "Jun", revenue: 2390, sales: 3800 },
  { month: "Jul", revenue: 3490, sales: 4300 },
];

const VendorOverview = () => {
  return (
    <div className="p-4 sm:p-6 space-y-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 text-white p-4 sm:p-6 rounded-xl shadow-md ${card.color}`}
          >
            <card.icon className="w-7 h-7 sm:w-8 sm:h-8 opacity-90" />
            <div>
              <p className="uppercase text-xs">{card.title}</p>
              <h2 className="text-lg sm:text-xl font-bold mt-1">{card.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Graph Section */}
      <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
        <h2 className="text-lg font-semibold mb-4">Revenue & Sales Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders & Trending Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow border">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center px-4 sm:px-6 py-4 border-b gap-3">
            <h2 className="text-lg font-semibold">Latest Orders</h2>
            <button className="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 sm:px-6 py-3">ID</th>
                  <th className="px-4 sm:px-6 py-3">Image</th>
                  <th className="px-4 sm:px-6 py-3">Name</th>
                  <th className="px-4 sm:px-6 py-3">Method</th>
                  <th className="px-4 sm:px-6 py-3">Status</th>
                  <th className="px-4 sm:px-6 py-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 sm:px-6 py-4 font-medium text-gray-700">
                      {order.id}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <img
                        src={order.image}
                        alt=""
                        className="w-10 h-10 object-contain"
                      />
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-700">{order.name}</td>
                    <td className="px-4 sm:px-6 py-4 text-gray-500">{order.method}</td>
                    <td className="px-4 sm:px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "On Way"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-semibold text-gray-700">
                      {order.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trending Products */}
        <div className="bg-white rounded-xl shadow border">
          <div className="px-4 sm:px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Trending Products</h2>
          </div>
          <ul className="divide-y divide-gray-100">
            {trendingProducts.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-gray-700">{product.name}</p>
                    <p className="text-xs text-gray-500">
                      {product.sales} sales
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-blue-600">
                  +{product.sales}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VendorOverview;
