'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function EditListingPage({ params }) {
  const router = useRouter();
  const { id } = params; // Get the id from the params
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
      if (id) {
        // Simulated API call to fetch listing data by ID
        const fetchedListing = {
          coverImage: '/images/cover2.jpg',
          logo: '/images/logo2.png',
          title: 'Bar B',
          category: 'Bar',
          address: '456 Side St, City B',
          description: 'A vibrant bar with live music.',
          website: 'https://bar-b.com',
          googleNavigator: 'https://maps.google.com/?q=456+Side+St,+City+B',
          email: 'contact@bar-b.com',
          phone: '+0987654321',
        };
        setListing(fetchedListing);
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    setListing({ ...listing, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing error messages

    try {
      // Simulate API call to update the listing
      const response = await fetch(`/api/listings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listing),
      });

      if (!response.ok) {
        throw new Error('Failed to update the listing. Please try again.');
      }

      const updatedListing = await response.json();
      console.log('Updated listing:', updatedListing);

      // Redirect back to the listings page after successful update
      router.push('/listings');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src="/icons/bouncing-circles.svg" alt="Loading..." width={50} height={50} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Listing</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={listing.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* Additional fields follow similar pattern */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
