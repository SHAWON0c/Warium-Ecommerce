import { useEffect, useState } from "react";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("/history.json")
      .then((rest) => rest.json())
      .then((data) => setHistory(data));
  }, []);

  return (
    <div className="p-2 sm:p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
        <h1 className="text-lg sm:text-xl text-gray-600">PRODUCT HISTORY</h1>
        <button className="bg-blue-600 px-3 py-2 text-white text-sm rounded">
          Shop Now
        </button>
      </div>

      <div className="border-b mt-4"></div>

      {/* Responsive Table */}
      <div className="overflow-x-auto border rounded-md mt-4">
        <table className="min-w-full text-left text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 sm:px-4 py-3 sm:py-4">ID</th>
              <th className="px-2 sm:px-4 py-3 sm:py-4">Image</th>
              <th className="px-2 sm:px-4 py-3 sm:py-4">Name</th>
              <th className="px-2 sm:px-4 py-3 sm:py-4">Date</th>
              <th className="px-2 sm:px-4 py-3 sm:py-4">Price</th>
              <th className="px-2 sm:px-4 py-3 sm:py-4">Status</th>
              <th className="px-2 sm:px-4 py-3 sm:py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {history.map((product, index) => (
              <tr
                key={index}
                className="text-gray-500 border-b text-xs sm:text-sm"
              >
                <td className="px-2 sm:px-4 py-3 sm:py-4 font-semibold">
                  {product.ID}
                </td>

                <td className="px-2 sm:px-4 py-3 sm:py-4">
                  <img
                    className="w-6 sm:w-8 h-auto"
                    src={product.Image}
                    alt=""
                  />
                </td>

                <td className="px-2 sm:px-4 py-3 sm:py-4">{product.Name}</td>
                <td className="px-2 sm:px-4 py-3 sm:py-4">{product.Date}</td>
                <td className="px-2 sm:px-4 py-3 sm:py-4">{product.Price}</td>
                <td className="px-2 sm:px-4 py-3 sm:py-4">{product.Status}</td>

                <td className="px-2 sm:px-4 py-3 sm:py-4">
                  <button className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
