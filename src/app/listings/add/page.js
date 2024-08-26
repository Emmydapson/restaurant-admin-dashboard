'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AddListingPage() {
  const router = useRouter();
  const [listing, setListing] = useState({
    coverImage: '',
    logo: '',
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
    setListing({ ...listing, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setListing({ ...listing, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      for (const key in listing) {
        formData.append(key, listing[key]);
      }

      const response = await fetch('/api/listings', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add the listing. Please try again.');
      }

      const newListing = await response.json();
      console.log('New listing added:', newListing);

      // Redirect to the listings page after successful addition
      router.push('/listings');
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Listing</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={listing.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Cover Image</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {listing.coverImage && (
            <div className="mt-4">
              <Image src={listing.coverImage} alt="Cover Preview" width={400} height={250} />
            </div>
          )}
        </div>
        {/* Additional fields follow similar pattern */}
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Listing'}
        </button>
      </form>
    </div>
  );
}
