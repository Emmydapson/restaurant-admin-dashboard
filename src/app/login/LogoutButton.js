'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('isAuthenticated');
      router.push('/login');
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
      aria-label="Logout"
    >
      Logout
    </button>
  );
}
