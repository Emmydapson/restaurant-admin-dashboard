'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AddMap() {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    const token = localStorage.getItem('authToken');
    console.log('Token:', token); // Log the token

    try {
      setLoading(true);
      await axios.post(
        'https://look-my-app.vercel.app/api/maps',
        { city },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Map added successfully!');
      setLoading(false);
      router.push('/map'); // Redirect to the map page to see the update
    } catch (error) {
      console.error('Failed to add map', error);
      setError('Error adding map');
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Map</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">City Name</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 text-red-800 bg-red-100 border border-red-300 rounded flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p>{error}</p>
          </div>
        )}

        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors" disabled={loading}>
          {loading ? 'Adding...' : 'Add Map'}
        </button>
      </form>
    </div>
  );
}
