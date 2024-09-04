'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddListingPage() {
  const router = useRouter();
  const [listing, setListing] = useState({
    coverImage: null,
    logo: null,
    title: '',
    category: '',
    address: '',
    description: '',
    website: '',
    googleNavigator: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    console.log(`Handling change for field: ${e.target.name}, Value: ${e.target.value}`);
    setListing({ ...listing, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      console.log(`Handling image change for field: ${name}, File name: ${files[0].name}`);
      setListing({ ...listing, [name]: files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    console.log('Form submission started');
  
    if (!listing.title || !listing.coverImage || !listing.logo) {
      const errorMessage = 'Title, cover image, and logo are required.';
      console.error(errorMessage);
      setError(errorMessage);
      return;
    }
  
    setLoading(true);
    try {
      console.log('Creating form data');
      const formData = new FormData();
      Object.entries(listing).forEach(([key, value]) => {
        if (value !== null) {
          console.log(`Appending ${key}: ${value instanceof File ? value.name : value}`);
          formData.append(key, value);
        }
      });
  
      const token = localStorage.getItem('authToken');
      console.log('Fetched auth token from localStorage');
  
      console.log('Sending POST request to add listing');
      const response = await fetch('https://look-my-app.vercel.app/api/listings/', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Failed to add listing: ${errorData.message}`);
        throw new Error(errorData.message || 'Failed to add the listing.');
      }
  
      console.log('Listing added successfully, redirecting to listings page');
      router.push('/listings');
    } catch (err) {
      console.error(`Error during form submission: ${err.message}`);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log('Form submission ended');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-md mt-8">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add New Listing</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={listing.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Cover Image</label>
          <input
            type="file"
            name="coverImage"
            onChange={handleImageChange}
            required
            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Logo */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Logo</label>
          <input
            type="file"
            name="logo"
            onChange={handleImageChange}
            required
            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={listing.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={listing.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={listing.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Website</label>
          <input
            type="url"
            name="website"
            value={listing.website}
            onChange={handleChange}
            placeholder="Website"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Google Navigator */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Google Navigator Link</label>
          <input
            type="url"
            name="googleNavigator"
            value={listing.googleNavigator}
            onChange={handleChange}
            placeholder="Google Navigator Link"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={listing.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={listing.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-md transition duration-200 hover:bg-blue-600 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Listing'}
          </button>
        </div>
      </form>
    </div>
  );
}
