import React, { useState } from 'react';

const PublicProfileSection = () => {
  const [profileData, setProfileData] = useState({
    storeName: '',
    description: '',
    website: '',
    facebook: '',
    instagram: '',
    profileImage: null,
    bannerImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProfileData({ ...profileData, [name]: files[0] });
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleSave = () => {
    // Implement API call here to save public profile
    console.log('Public Profile Saved', profileData);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Public Profile</h2>
      <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        <label className="block">
          <span className="text-gray-700">Store Name</span>
          <input
            type="text"
            name="storeName"
            value={profileData.storeName}
            onChange={handleChange}
            placeholder="My Awesome Store"
            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Description</span>
          <textarea
            name="description"
            value={profileData.description}
            onChange={handleChange}
            placeholder="Describe your store..."
            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Website</span>
          <input
            type="text"
            name="website"
            value={profileData.website}
            onChange={handleChange}
            placeholder="https://mystore.com"
            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-gray-700">Facebook</span>
            <input
              type="text"
              name="facebook"
              value={profileData.facebook}
              onChange={handleChange}
              placeholder="Facebook URL"
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Instagram</span>
            <input
              type="text"
              name="instagram"
              value={profileData.instagram}
              onChange={handleChange}
              placeholder="Instagram URL"
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-gray-700">Profile Image</span>
            <input
              type="file"
              name="profileImage"
              onChange={handleChange}
              accept="image/*"
              className="mt-1 block w-full"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Banner Image</span>
            <input
              type="file"
              name="bannerImage"
              onChange={handleChange}
              accept="image/*"
              className="mt-1 block w-full"
            />
          </label>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Save Public Profile
        </button>
      </div>
    </div>
  );
};

export default PublicProfileSection;
