import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import UseAuth from "../../hooks/UseAuth";
import { useNavigate } from "react-router-dom";

const VendorProducts = () => {
  const { user } = UseAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/products?vendorEmail=${user.email}`
        );
        setProducts(res.data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user?.email]);

  const handleEdit = (product) => {
    console.log("Edit product:", product._id);
    localStorage.setItem("editProduct", JSON.stringify(product));
    navigate(`/dashboard/vendor-upload/${product._id}`)

    // open edit modal or navigate
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product");
    }
  };


  console.log(products);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-600">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Quantity</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4">
                    <img
                      src={product.images[0]}
                      alt={product.productName}
                      className="h-12 w-12 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    {product.productName}
                  </td>
                  <td className="p-4 text-gray-600">{product.category}</td>
                  <td className="p-4 font-semibold text-blue-600">
                    ${product.price}
                  </td>
                  <td className="p-4 text-gray-600">{product.quantity}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 rounded-lg border hover:bg-blue-50"
                    >
                      <Pencil className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 rounded-lg border hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VendorProducts;
