'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditMap() {
  const { id } = useParams();
  const router = useRouter();
  const [city, setCity] = useState('');
  const [mapImage, setMapImage] = useState(null);
  const [existingMapImage, setExistingMapImage] = useState('');

  useEffect(() => {
    // Simulate fetching the map details (replace with real API call)
    setTimeout(() => {
      const mapData = {
        city: 'Roma',
        mapImage: '/images/image (1).png',
      };
      setCity(mapData.city);
      setExistingMapImage(mapData.mapImage);
    }, 1000);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate updating the map details (replace with real API call)
    setTimeout(() => {
      console.log({ city, mapImage: mapImage || existingMapImage });
      alert('Map updated successfully!');
      router.push('/map'); // Redirect back to the maps page
    }, 1000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMapImage(URL.createObjectURL(file)); // Preview the image
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Map Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {(mapImage || existingMapImage) && (
              <div className="mt-4">
                <img
                  src={mapImage || existingMapImage}
                  alt="Map Preview"
                  className="w-full h-64 object-cover"
                />
              </div>
            )}
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Update Map
          </button>
        </form>
      </div>
  );
}
