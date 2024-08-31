'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      setLoading(true); // Start loading state
      try {
        const response = await fetch('https://look-my-app.vercel.app/api/auth/logout', {
          method: 'POST',
          credentials: 'include', // Ensure cookies are included in the request
        });

        if (response.ok) {
          router.push('/login'); // Redirect to login on successful logout
        } else {
          console.error('Failed to log out:', response.statusText);
          alert('Failed to log out. Please try again.');
        }
      } catch (error) {
        console.error('Network error:', error);
        alert('Network error. Please check your internet connection and try again.');
      } finally {
        setLoading(false); // End loading state
      }
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className={`bg-red-500 text-white py-2 px-4 rounded transition-colors ${
        loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
      }`}
      aria-label="Logout"
      disabled={loading} // Disable button when loading
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
