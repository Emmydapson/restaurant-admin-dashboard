'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function EditMap() {
  const { id } = useParams();
  const router = useRouter();
  const [city, setCity] = useState('');
  const [apiKey, setApiKey] = useState(''); // Holds the Google Maps API key
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the API key securely from the backend
    const fetchApiKey = async () => {
      const token = localStorage.getItem('token'); // Securely get the token
      try {
        const response = await axios.get('https://look-my-app.vercel.app/api/maps/api-key', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApiKey(response.data.apiKey);
      } catch (error) {
        console.error('Failed to fetch API key', error);
      }
    };

    // Fetch map details for editing
    const fetchMapDetails = async () => {
      try {
        const response = await axios.get(`https://look-my-app.vercel.app/api/maps/${id}`);
        setCity(response.data.city);
      } catch (error) {
        console.error('Failed to fetch map details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApiKey();
    fetchMapDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');

    try {
      await axios.put(
        `https://look-my-app.vercel.app/api/maps/${id}`,
        { city }, // Send updated city data
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Map updated successfully!');
      router.push('/map'); // Redirect to the maps page
    } catch (error) {
      console.error('Failed to update map', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Map</h1>
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
        {loading ? (
          <div>Loading map preview...</div>
        ) : (
          <div className="mt-4">
            <iframe
              width="100%"
              height="250"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${city}`}
              allowFullScreen
            ></iframe>
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={loading}>
          {loading ? 'Updating...' : 'Update Map'}
        </button>
      </form>
    </div>
  );
}
