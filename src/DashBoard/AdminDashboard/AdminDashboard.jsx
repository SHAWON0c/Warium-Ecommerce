import React from 'react';

const orders = [
  {
    id: 225,
    image: 'https://i.ibb.co/qx3kYpT/baby-shoes.png',
    name: 'Stylish baby shoes',
    method: 'COD',
    status: 'Pending',
    total: '$320',
  },
  {
    id: 548,
    image: 'https://i.ibb.co/W6VFcsz/blue-hoodie.png',
    name: 'Sweat Pullover Hoodie',
    method: 'Cash',
    status: 'Pending',
    total: '$214',
  },
  {
    id: 684,
    image: 'https://i.ibb.co/kJZ1pYP/shirt.png',
    name: 'T-shirt for girl',
    method: 'Ewallets',
    status: 'On Way',
    total: '$548',
  },
  {
    id: 987,
    image: 'https://i.ibb.co/bWWbWp6/hat.png',
    name: 'Wool hat for men',
    method: 'Bank Transfers',
    status: 'Delivered',
    total: '$200',
  },
];

const statCards = [
  { title: 'PRODUCTS', value: 625, color: 'bg-blue-500' },
  { title: 'ORDERS', value: '56 / Day', color: 'bg-rose-400' },
  { title: 'EARNINGS', value: '$56 / Day', color: 'bg-green-400' },
  { title: 'SALES', value: '550 / Mo', color: 'bg-orange-400' },
];

const AdminDashboard = () => {
  return (
    <div className="p-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`text-white p-6 rounded-xl shadow-md ${card.color}`}
          >
            <p className="uppercase text-sm">{card.title}</p>
            <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
          </div>
        ))}
      </div>

      {/* Latest Order Table */}
      <div className="bg-white rounded-xl shadow border">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Latest Order</h2>
          <button className="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Method</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-700">{order.id}</td>
                  <td className="px-6 py-4">
                    <img src={order.image} alt="" className="w-10 h-10 object-contain" />
                  </td>
                  <td className="px-6 py-4 text-gray-700">{order.name}</td>
                  <td className="px-6 py-4 text-gray-500">{order.method}</td>
                  <td className="px-6 py-4 text-gray-500">{order.status}</td>
                  <td className="px-6 py-4 font-semibold text-gray-700">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
