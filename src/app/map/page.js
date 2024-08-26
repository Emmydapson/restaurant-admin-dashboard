'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ManageMaps() {
  const router = useRouter();
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching map data
    const fetchData = async () => {
      try {
        // Simulate network request
        setTimeout(() => {
          const fetchedMaps = [
            { id: 1, city: 'Roma', mapImage: '/images/image (1).png' },
            { id: 2, city: 'Milano', mapImage: '/images/image (1).png' },
            { id: 3, city: 'Trieste', mapImage: '/images/image (1).png' },
          ];
          setMaps(fetchedMaps);
          setLoading(false);
        }, 2000);
      } catch (error) {
        setError('Failed to load maps');
        setLoading(false);
      }
    };

    fetchData();
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
                key={map.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <Image
                  src={map.mapImage}
                  alt={`Map of ${map.city}`}
                  width={400}
                  height={250}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{map.city}</h2>
                  <button
                    onClick={() => handleEditClick(map.id)}
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
