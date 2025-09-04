import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import UseAuth from "../../hooks/UseAuth";
import useDbUser from "../../hooks/useDbUser";
const Coupon = () => {


    const { user } = UseAuth();
    // console.log(user);

    const { dbUser } = useDbUser();
    const moderatorName = dbUser?.name;
    console.log(moderatorName);


    const [formData, setFormData] = useState({
        code: "",
        discountType: "percentage",
        discountValue: "",
        minPurchase: "",
        startDate: "",
        endDate: "",
        usageLimit: "",
        isActive: true,
        addedByEmail: user.email, // will set after user/dbUser loads
        addedByName: moderatorName,


    });


    useEffect(() => {
        if (user?.email && dbUser?.name) {
            setFormData((prev) => ({
                ...prev,
                addedByEmail: user.email,
                addedByName: dbUser?.name,
            }));
        }
    }, [user, dbUser]);


    console.log(dbUser?.name);










    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Submitting...");

        try {
            const response = await fetch("https://warium-ecommerce-server-api.onrender.com/coupon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("✅ Coupon added successfully!");
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                setFormData({
                    code: "",
                    discountType: "percentage",
                    discountValue: "",
                    minPurchase: "",
                    startDate: "",
                    endDate: "",
                    usageLimit: "",
                    isActive: true,
                }); // reset form
            } else {
                setMessage("❌ Failed: " + data.error);
            }
        } catch (error) {
            console.error("Error submitting coupon:", error);
            setMessage("⚠️ Something went wrong. Try again.");
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
            <h1 className="text-xl font-bold mb-4">Add New Coupon</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Coupon Code */}
                <div>
                    <label className="block mb-1 font-medium">Coupon Code</label>
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        placeholder="e.g., SAVE20"
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Discount Type */}
                <div>
                    <label className="block mb-1 font-medium">Discount Type</label>
                    <select
                        name="discountType"
                        value={formData.discountType}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed Amount ($)</option>
                        <option value="freeShipping">Free Shipping</option>
                    </select>
                </div>

                {/* Discount Value */}
                <div>
                    <label className="block mb-1 font-medium">Discount Value</label>
                    <input
                        type="number"
                        name="discountValue"
                        value={formData.discountValue}
                        onChange={handleChange}
                        placeholder="e.g., 20"
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Minimum Purchase */}
                <div>
                    <label className="block mb-1 font-medium">Minimum Purchase ($)</label>
                    <input
                        type="number"
                        name="minPurchase"
                        value={formData.minPurchase}
                        onChange={handleChange}
                        placeholder="Optional"
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Start Date */}
                <div>
                    <label className="block mb-1 font-medium">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* End Date */}
                <div>
                    <label className="block mb-1 font-medium">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Usage Limit */}
                <div>
                    <label className="block mb-1 font-medium">Usage Limit</label>
                    <input
                        type="number"
                        name="usageLimit"
                        value={formData.usageLimit}
                        onChange={handleChange}
                        placeholder="e.g., 100"
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Active/Inactive */}
                <div className="flex items-center gap-2 disabled:">
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        disabled
                    />
                    <label className="font-medium"> Admin aproval needed to Active</label>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Save Coupon and forward it to the Admin
                </button>
            </form>
        </div>
    );
};

export default Coupon;
