/* eslint-disable no-unused-vars */

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

  // Custom Map Styling
  const mapStyles = [
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        { "color": "#e9e9e9" },
        { "lightness": 17 }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        { "color": "#f5f5f5" },
        { "lightness": 20 }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#ffffff" },
        { "lightness": 17 }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        { "color": "#ffffff" },
        { "lightness": 29 },
        { "weight": 0.2 }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        { "color": "#ffffff" },
        { "lightness": 18 }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        { "color": "#ffffff" },
        { "lightness": 16 }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        { "color": "#f5f5f5" },
        { "lightness": 21 }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        { "color": "#dedede" },
        { "lightness": 21 }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        { "visibility": "on" },
        { "color": "#ffffff" },
        { "lightness": 16 }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        { "saturation": 36 },
        { "color": "#333333" },
        { "lightness": 40 }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        { "visibility": "off" }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        { "color": "#f2f2f2" },
        { "lightness": 19 }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#fefefe" },
        { "lightness": 20 }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        { "color": "#fefefe" },
        { "lightness": 17 },
        { "weight": 1.2 }
      ]
    }
  ];

  useEffect(() => {
    // Fetch map data from backend
    const fetchData = async () => {
      try {
        console.log('Fetching map data...');
        const response = await axios.get('https://look-my-app.vercel.app/api/maps');
        console.log('Map data fetched:', response.data);
        setMaps(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load maps:', error);
        setError('Failed to load maps');
        setLoading(false);
      }
    };

    // Fetch API key securely from backend
    const fetchApiKey = async () => {
      try {
        const response = await axios.get('https://look-my-app.vercel.app/api/maps/api-key');
        console.log('API key fetched:', response.data.apiKey);
        setApiKey(response.data.apiKey);
      } catch (error) {
        console.error('Failed to fetch API key:', error);
      }
    };

    fetchData();
    fetchApiKey();
  }, []);

  const handleEditClick = (id) => {
    console.log('Editing map with ID:', id);
    router.push(`/map/edit/${id}`);
  };

  const handleAddMap = () => {
    console.log('Navigating to add map page');
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

          <button
            onClick={() => router.push('/listing/add')}
            className="mb-6 bg-blue-500 text-white py-2 px-4 rounded"
            aria-label="Add new listing"
          >
            Take Me to Add Listing Page
          </button>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {maps.map((map) => (
              <div
                key={map._id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <Image
                  src={map.imageUrl}
                  alt={`Map of ${map.city}`}
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                />

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
