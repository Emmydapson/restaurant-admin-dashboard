'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ListingsPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]); // State to store listings

  // Ensure the component is mounted before rendering (to avoid SSR-related issues)
  useEffect(() => {
    setIsMounted(true);
    // Simulate data fetching
    setTimeout(() => {
      const Listings = [
        {
          id: 1,
          coverImage: '/images/image 1.png',
          logo: '/images/logo (2).png',
          title: 'Evoque',
          category: 'Restaurant',
          address: 'Roma vicolo, Barberini',
          description: "Benvenuti al Evoque, un ristorante di cucina innovativa e gastronomia internazionale situato nel cuore di Roma. Qui, tradizione e modernità si incontrano per creare un'esperienza culinaria unica e sorprendente.",
          website: 'https://restaurant-a.com',
          googleNavigator: 'https://maps.google.com/?q=123+Main+St,+City+A',
          email: 'contact@restaurant-a.com',
          phone: '+1234567890',
          categoryIcon: '/icons/restaurant.png',
        },
        {
          id: 2,
          coverImage: '/images/blue note.png',
          logo: '/images/logo2.png',
          title: 'Blue Note',
          category: 'Bar e movida',
          address: '456 Side St, City B',
          description: 'A vibrant bar with live music.',
          website: 'https://website.svg',
          googleNavigator: 'https://maps.google.com/?q=456+Side+St,+City+B',
          email: 'contact@bar-b.com',
          phone: '+0987654321',
          categoryIcon: '/icons/bar.svg',
        },
        {
          id: 3,
          coverImage: '/images/sound.png',
          logo: '/images/logo3.png',
          title: 'Ministry of sound',
          category: 'svago ed Eventi',
          address: 'Trieste, via XX Settembre',
          description: 'a club with the best DJ services.',
          website: 'https://shopping-c.com',
          googleNavigator: 'https://maps.google.com/?q=789+Market+St,+City+C',
          email: 'contact@shopping-c.com',
          phone: '+1122334455',
          categoryIcon: '/icons/event.svg',
        },
        {
          id: 4,
          coverImage: '/images/tourism.png',
          logo: '/images/logo4.png',
          title: 'Pinacoteca del brera',
          category: 'Tourism',
          address: 'Milano via brera',
          description: 'A popular tourist attraction.',
          website: 'https://tourism-d.com',
          googleNavigator: 'https://maps.google.com/?q=101+Hill+Rd,+City+D',
          email: 'contact@tourism-d.com',
          phone: '+2233445566',
          categoryIcon: '/icons/tourismo.svg',
        },
      ];
      setListings(Listings); // Store the listings in state
      setLoading(false);
    }, 2000); // Simulating a 2-second data fetch delay
  }, []); // Empty dependency array ensures this effect runs once

  if (!isMounted) return null;

  const handleEditClick = (id) => {
    router.push(`/listings/edit/${id}`);
  };

  const handleAddListing = () => {
    router.push('/listings/add');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Listings</h1>

      {loading ? (
        <div className="flex justify-center">
          <Image src="/icons/bouncing-circles.svg" alt="Loading" width={50} height={50} />
        </div>
      ) : (
        <div>
          <button
            onClick={handleAddListing}
            className="mb-6 bg-green-500 text-white py-2 px-4 rounded"
          >
            Add New Listing
          </button>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <Image
                  src={listing.coverImage}
                  alt={listing.title}
                  width={400}
                  height={250}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <Image
                      src={listing.logo}
                      alt={`${listing.title} logo`}
                      width={50}
                      height={50}
                      className="mr-2"
                    />
                    <h2 className="text-xl font-semibold">{listing.title}</h2>
                  </div>
                  <div className="flex items-center mb-2">
                    <Image
                      src={listing.categoryIcon}
                      alt={`${listing.category} icon`}
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    <p className="text-gray-600">{listing.category}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <Image
                      src="/icons/location icon.svg"
                      alt="Location"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    <p className="text-gray-600">{listing.address}</p>
                  </div>
                  <p className="text-gray-600 mb-2">{listing.description}</p>
                  <div className="flex items-center space-x-4">
                    <Link href={listing.website} passHref>
                      <Image
                        src="/icons/website.svg"
                        alt="Website"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                      />
                    </Link>
                    <Link href={listing.googleNavigator} passHref>
                      <Image
                        src="/icons/location icon.svg"
                        alt="Navigate"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                      />
                    </Link>
                    <Link href={`mailto:${listing.email}`} passHref>
                      <Image
                        src="/icons/email-icon.svg"
                        alt="Email"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                      />
                    </Link>
                    <Link href={`tel:${listing.phone}`} passHref>
                      <Image
                        src="/icons/phone icon.svg"
                        alt="Phone"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                      />
                    </Link>
                  </div>
                  <button
                    onClick={() => handleEditClick(listing.id)}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
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
