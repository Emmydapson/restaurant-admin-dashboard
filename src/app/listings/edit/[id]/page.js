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
      console.log('Fetching listing...'); // Step 1: Log fetching start
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`https://look-my-app.vercel.app/api/listings/${id}`); // Step 2: Fetch the listing
        console.log('Response Status:', response.status); // Log the response status

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error Response:', errorData); // Step 3: Log any error response
          throw new Error('Failed to fetch listing');
        }

        const data = await response.json();
        console.log('Fetched Listing Data:', data); // Step 4: Log the fetched data
        setListing(data); // Step 5: Set the listing state with fetched data

      } catch (err) {
        console.error('Fetch Error:', err.message); // Step 6: Log any caught errors
        setError(err.message);
      } finally {
        setLoading(false);
        console.log('Loading state set to false'); // Step 7: Log that loading has finished
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    console.log(`Changing field ${e.target.name} to ${e.target.value}`); // Step 8: Log field changes
    setListing({ ...listing, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(`Image file selected for ${e.target.name}:`, file); // Step 9: Log selected image file

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(`Image file loaded for ${e.target.name}`); // Log when the image is loaded
        setListing({ ...listing, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...'); // Step 10: Log form submission
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(listing).forEach(([key, value]) => {
        console.log(`Appending ${key} to formData`); // Step 11: Log each appended field
        formData.append(key, value);
      });

      const response = await fetch(`https://look-my-app.vercel.app/api/listings/${id}`, {
        method: 'PUT',
        body: formData,
      });

      console.log('Response Status:', response.status); // Step 12: Log the response status after submission

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Response:', errorData); // Step 13: Log any error response
        throw new Error(errorData.message || 'Failed to update the listing.');
      }

      console.log('Listing updated successfully'); // Step 14: Log success message
      router.push('/listings'); // Redirect after successful update

    } catch (err) {
      console.error('Submit Error:', err.message); // Step 15: Log any caught errors
      setError(err.message);
    } finally {
      setLoading(false);
      console.log('Loading state set to false'); // Step 16: Log that loading has finished
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
          {/* Form fields for all attributes */}
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
