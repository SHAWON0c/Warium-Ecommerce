import React, { useEffect, useState } from "react";
import profile_bg from "../../assets/images/profile/cover.jpg";
import { FaEdit } from "react-icons/fa";
import useDbUser from "../../hooks/useDbUser";
import profile from "../../assets/images/profile/profile.jpg";
import UseAuth from "../../hooks/UseAuth";

const UserProfile = () => {
    const { dbUser } = useDbUser(); // hook usage
    const { user } = UseAuth();
    console.log(user);
    const [role, setRole] = useState("");

    const userphotoURL = user.photoURL;


    // Dummy values (replace with dbUser later)
    const [userData, setUserData] = useState({
        firstName: "add your first name",
        lastName: "add your second name",
        email: "youremail@gmail.com",
        phone: "+880 xxxxxxxxxx",
        banner: profile_bg,
        avatar: userphotoURL || profile // fallback avatar
    });

    useEffect(() => {
        const userRole = dbUser?.role || "user"; // fallback to empty string if undefined
        setRole(userRole);
    }, [dbUser]);





    useEffect(() => {
        if (dbUser) {
            const nameParts = dbUser.name.trim().split(" ");
            const firstName = nameParts[0] || "";
            const lastName = nameParts.slice(1).join(" ") || "";




            setUserData({
                firstName,
                lastName,
                email: dbUser.email || "support@gmail.com",
                phone: dbUser.phone || "+880 xxxxxxxxxx",
                banner: dbUser.banner || profile_bg,
                avatar: user?.photoURL || profile,
            });
        }
    }, [dbUser]);

    const [isEditing, setIsEditing] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
    });

    const handleEdit = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (field, value) => {
        setUserData((prev) => ({ ...prev, [field]: value }));
    };

    // Handle banner upload
    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUserData((prev) => ({ ...prev, banner: imageUrl }));
        }
    };

    // Handle avatar upload
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUserData((prev) => ({ ...prev, avatar: imageUrl }));
        }
    };

    return (
        <div className="w-full mx-auto px-2 sm:px-4 flex flex-col">
            <div className="space-y-6 relative">
                {/* Banner Image */}
                <div className="relative">
                    <img
                        src={userData.banner}
                        alt="Profile Banner"
                        className="w-full h-48 object-cover rounded"
                    />
                    {/* Banner Edit Button */}
                    <label
                        htmlFor="bannerUpload"
                        className="absolute top-3 right-3 bg-red-400 text-gray-700 font-semibold px-4 py-2 text-xs sm:text-sm rounded cursor-pointer"
                    >
                        Edit Banner
                    </label>
                    <input
                        id="bannerUpload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBannerChange}
                    />

                    {/* Avatar */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-32 flex flex-col items-center">
                        <img
                            src={userData.avatar}
                            alt="avatar"
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-8 border-white shadow-lg"
                        />
                        {/* Avatar Edit Button */}
                        <label
                            htmlFor="avatarUpload"
                            className="mt-2 bg-blue-500 text-white px-3 py-1 text-xs sm:text-sm rounded cursor-pointer flex items-center gap-1"
                        >
                            <FaEdit /> Edit Avatar
                        </label>
                        <input
                            id="avatarUpload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>
                </div>

                {/* User Info */}
                <div className="pt-16 text-center">
                    <h2 className="text-lg sm:text-xl font-semibold">
                        {userData.firstName} {userData.lastName}
                    </h2>
                    <p className="text-gray-500">({role})</p>
                </div>
            </div>

            <div className="border-b border-gray-100 mt-4 mb-4"></div>

            <h1 className="text-lg font-semibold mb-4">ACCOUNT INFORMATION</h1>

            {/* Info Blocks */}
            <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* First Name */}
                <div className="w-full md:w-1/2">
                    <h1 className="font-semibold text-md text-gray-600 bg-gray-200 p-2 flex items-center justify-between">
                        First Name{" "}
                        <FaEdit
                            onClick={() => handleEdit("firstName")}
                            className="cursor-pointer"
                        />
                    </h1>
                    <div className="mt-2">
                        <input
                            type="text"
                            value={userData.firstName}
                            disabled={!isEditing.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                            className={`w-full border rounded px-2 py-1 text-gray-600 ${isEditing.firstName
                                ? "bg-white border-gray-400"
                                : "bg-gray-100 cursor-not-allowed"
                                }`}
                        />
                    </div>
                </div>

                {/* Last Name */}
                <div className="w-full md:w-1/2">
                    <h1 className="font-semibold text-md text-gray-600 bg-gray-200 p-2 flex items-center justify-between">
                        Last Name{" "}
                        <FaEdit
                            onClick={() => handleEdit("lastName")}
                            className="cursor-pointer"
                        />
                    </h1>
                    <div className="mt-2">
                        <input
                            type="text"
                            value={userData.lastName}
                            disabled={!isEditing.lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                            className={`w-full border rounded px-2 py-1 text-gray-600 ${isEditing.lastName
                                ? "bg-white border-gray-400"
                                : "bg-gray-100 cursor-not-allowed"
                                }`}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-6 mt-6">
                {/* Email */}
                <div className="w-full md:w-1/2">
                    <h1 className="font-semibold text-md text-gray-600 bg-gray-200 p-2 flex items-center justify-between">
                        Email{" "}
                        <FaEdit
                            onClick={() => handleEdit("email")}
                            className="cursor-pointer"
                        />
                    </h1>
                    <div className="mt-2">
                        <input
                            type="email"
                            value={userData.email}
                            disabled={!isEditing.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className={`w-full border rounded px-2 py-1 text-gray-600 ${isEditing.email
                                ? "bg-white border-gray-400"
                                : "bg-gray-100 cursor-not-allowed"
                                }`}
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="w-full md:w-1/2">
                    <h1 className="font-semibold text-md text-gray-600 bg-gray-200 p-2 flex items-center justify-between">
                        Phone Number{" "}
                        <FaEdit
                            onClick={() => handleEdit("phone")}
                            className="cursor-pointer"
                        />
                    </h1>
                    <div className="mt-2">
                        <input
                            type="text"
                            value={userData.phone}
                            disabled={!isEditing.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            className={`w-full border rounded px-2 py-1 text-gray-600 ${isEditing.phone
                                ? "bg-white border-gray-400"
                                : "bg-gray-100 cursor-not-allowed"
                                }`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
