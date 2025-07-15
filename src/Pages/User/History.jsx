import { useEffect, useState } from "react";



const History = () => {

  const [history, setHistory] = useState([]);
  useEffect(() => {

    fetch('/history.json')
      .then(rest => rest.json())
      .then((data) => setHistory(data))
  }, []);


  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl text-gray-600 ">PRODUCT HISTORY </h1>
        <button className="bg-blue-600 p-2 text-white text-sm ">shop now </button>

      </div>
      
        <div className="border-b mt-4"></div>
      <div className="overflow-x-auto border rounded-md mt-4">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-4">ID</th>
              <th className="px-4 py-4">Image</th>
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4">Date</th>
              <th className="px-4 py-4">Price</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>


          <tbody className="" >
            {history.map((product, index) => (
              <tr key={index} className="text-gray-500 border-b text-sm">
                <td className="px-4 py-4 font-semibold">{product.ID}</td>
                
                <td className="px-4 py-4 text-2xl w-4 h-auto">
                  <img 
                  className="w-8  h-auto"
                  src={product.Image} alt="" />
                </td>
                <td className="px-4 py-4  ">{product.Name}</td>
                <td className="px-4 py-4">{product.Date}</td>
                <td className="px-4 py-4">{product.Price}</td>
                <td className="px-4 py-4">{product.Status}</td>
                <td className="px-4 py-4">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </td>
                      
              </tr>
              
            )
            
            
            )
            }
            
          </tbody>

        </table>
      </div>


    </div>
  );
};

export default History;
