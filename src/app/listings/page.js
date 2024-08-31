'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // New error state

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(''); // Reset error state before fetching
      try {
        const response = await fetch('https://look-my-app.vercel.app/api/listings/');
        if (!response.ok) throw new Error('Failed to fetch listings');
        const data = await response.json();
        setListings(data);
      } catch (err) {
        console.error(err.message);
        setError('An error occurred while fetching listings. Please try again.'); // Set error message
      } finally {
        setLoading(false);
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
              <Image src={listing.coverImage} alt={listing.title} width={100} height={100} className="mb-2 rounded" />
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
