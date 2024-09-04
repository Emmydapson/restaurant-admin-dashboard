'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError('');

      console.log('Fetching listings...'); // Step 1: Starting fetch

      try {
        const token = localStorage.getItem('authToken'); // Step 2: Get the token from localStorage
        console.log('Auth Token:', token); // Log the token

        if (!token) {
          throw new Error('No auth token found');
        }

        const response = await fetch('https://look-my-app.vercel.app/api/listings/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Response Status:', response.status); // Step 3: Log the response status

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error Response:', errorData); // Step 4: Log the error response from the server
          throw new Error('Failed to fetch listings');
        }

        const data = await response.json(); // Step 5: Correctly parse the response JSON
        console.log('Fetched Data:', data); // Debugging log of fetched data

        // Ensure we're setting the 'listings' state with the correct array
        setListings(data.listings || []); // Step 6: Set the listings or an empty array if missing

      } catch (err) {
        console.error('Fetch Error:', err.message); // Step 7: Log any caught errors
        setError('An error occurred while fetching listings. Please try again.');
      } finally {
        setLoading(false);
        console.log('Loading state set to false'); // Step 8: Log that loading has finished
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Listings</h1>
      <Link href="/listings/add" className="text-blue-500">Add New Listing</Link>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded flex items-center mt-6">
          <svg
            className="w-5 h-5 mr-2 text-red-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="mt-4 text-center text-gray-600">Loading...</div>
      ) : (
        <div className="grid gap-4 mt-4">
          {listings.map((listing) => (
            <div key={listing.id} className="border p-4 rounded shadow-md">
              {/* Listing details with edit link */}
              <Image 
                src={`https://look-my-app.vercel.app/uploads/${listing.coverImage}`} 
                alt={listing.title} 
                width={100} 
                height={100} 
                className="mb-2 rounded" 
              />
              <h2 className="text-lg font-bold">{listing.title}</h2>
              <p className="text-gray-600">{listing.address}</p>
              <p className="text-gray-700">{listing.description}</p>
              <Link href={`/listings/edit/${listing.id}`} className="text-blue-500 mt-2 block">Edit</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
