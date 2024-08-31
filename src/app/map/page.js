'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ManageMaps() {
  const router = useRouter();
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    // Fetch map data from backend
    const fetchData = async () => {
      try {
        const response = await axios.get('https://look-my-app.vercel.app//api/maps');
        setMaps(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load maps');
        setLoading(false);
      }
    };

    // Fetch API key securely from backend
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

    fetchData();
    fetchApiKey();
  }, []);

  const handleEditClick = (id) => {
    router.push(`/map/edit/${id}`);
  };

  const handleAddMap = () => {
    router.push('/map/add');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Maps</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <Image
            src="/icons/bouncing-circles.svg"
            alt="Loading"
            width={50}
            height={50}
          />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div>
          <button
            onClick={handleAddMap}
            className="mb-6 bg-green-500 text-white py-2 px-4 rounded"
            aria-label="Add new map"
          >
            Add New Map
          </button>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {maps.map((map) => (
              <div
                key={map._id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <iframe
                  width="100%"
                  height="250"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${map.city}`}
                  allowFullScreen
                ></iframe>
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{map.city}</h2>
                  <button
                    onClick={() => handleEditClick(map._id)}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    aria-label={`Edit map of ${map.city}`}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
