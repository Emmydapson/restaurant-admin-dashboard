'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';


export default function EditListingPage() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://look-my-app.vercel.app/api/listings/:id`);
        if (!response.ok) throw new Error('Failed to fetch listing');
        const data = await response.json();
        setListing(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => setListing({ ...listing, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setListing({ ...listing, [e.target.name]: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(listing).forEach(([key, value]) => formData.append(key, value));

      const response = await fetch(`/api/listings/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update the listing.');
      }

      router.push('/listings');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Listing</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Add form fields for all attributes similar to AddListingPage */}
          <input type="text" name="title" value={listing.title} onChange={handleChange} placeholder="Title" required className="input" />
          <input type="file" name="coverImage" onChange={handleImageChange} className="input" />
          <input type="file" name="logo" onChange={handleImageChange} className="input" />
          <input type="text" name="category" value={listing.category} onChange={handleChange} placeholder="Category" required className="input" />
          <input type="text" name="address" value={listing.address} onChange={handleChange} placeholder="Address" required className="input" />
          <textarea name="description" value={listing.description} onChange={handleChange} placeholder="Description" required className="input" />
          <input type="url" name="website" value={listing.website} onChange={handleChange} placeholder="Website" required className="input" />
          <input type="url" name="googleNavigator" value={listing.googleNavigator} onChange={handleChange} placeholder="Google Navigator Link" className="input" />
          <input type="email" name="email" value={listing.email} onChange={handleChange} placeholder="Email" required className="input" />
          <input type="tel" name="phone" value={listing.phone} onChange={handleChange} placeholder="Phone" required className="input" />

          {/* Submit Button */}
          <button type="submit" className={`bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50' : ''}`} disabled={loading}>
            {loading ? 'Updating...' : 'Update Listing'}
          </button>
        </form>
      )}
    </div>
  );
}
