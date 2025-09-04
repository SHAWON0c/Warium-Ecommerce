import React, { useEffect, useState } from "react";
import useDbUser from "../../hooks/useDbUser";

const CouponApprovals = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const {dbUser}=useDbUser();

  const AdminEmail =  dbUser?.email;
  const AdminName = dbUser?.name;
  console.log(AdminEmail,AdminName);
  // fetch pending coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await fetch("https://warium-ecommerce-server-api.onrender.com/coupons/pending");
        const data = await res.json();
        setCoupons(data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);


  console.log(coupons);

  // approve coupon
  const handleApprove = async (id) => {
    try {
      const res = await fetch(`https://warium-ecommerce-server-api.onrender.com/coupon/approve/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({adminEmail:AdminEmail, adminName:AdminName })
      });
      const data = await res.json();

      if (res.ok) {
        alert("✅ Coupon approved & activated");
        setCoupons(coupons.filter((c) => c._id !== id)); // remove from list
      } else {
        alert("❌ " + data.error);
      }
    } catch (error) {
      console.error("Error approving coupon:", error);
    }
  };

  if (loading) return <p className="text-center">Loading pending coupons...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pending Coupon Approvals</h1>

      {coupons.length === 0 ? (
        <p>No pending coupons </p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Code</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Value</th>
              <th className="border p-2">Min Purchase</th>
              <th className="border p-2">Dates</th>
              <th className="border p-2">Action</th>
              <th className="border p-2">Added-by</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id} className="text-center">
                <td className="border p-2">{coupon.code}</td>
                <td className="border p-2">{coupon.discountType}</td>
                <td className="border p-2">
                  {coupon.discountType === "percentage"
                    ? `${coupon.discountValue}%`
                    : `$${coupon.discountValue}`}
                </td>
                <td className="border p-2">
                  {coupon.minPurchase ? `$${coupon.minPurchase}` : "—"}
                </td>
                <td className="border p-2">
                  {coupon.startDate
                    ? new Date(coupon.startDate).toLocaleDateString()
                    : "—"}{" "}
                  -{" "}
                  {coupon.endDate
                    ? new Date(coupon.endDate).toLocaleDateString()
                    : "—"}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleApprove(coupon._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Approve ✅
                  </button>
                </td>
                <td>
                    {coupon.createdBy.addedByName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CouponApprovals;
