// src/app/page.js
'use client'
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import useAuth from './hooks/useAuth';

export default function DashboardPage() {
  const { loading, authenticated } = useAuth();
  const router = useRouter();

  if (loading) return <p>Loading...</p>; // Show a loading state

  if (!authenticated) {
    // Redirect to login if not authenticated
    router.push('/login');
    return null; // Avoid rendering the dashboard content while redirecting
  }

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Panoramica del Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Gestione Annunci</h2>
          <p className="mb-4 text-gray-600">Gestisci tutti i luoghi straordinari elencati nella tua app.</p>
          <Link href="/listings" aria-label="Vai agli Annunci">
            <span className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
              Vai agli Annunci
            </span>
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Gestione Mappe</h2>
          <p className="mb-4 text-gray-600">Gestisci le mappe per le varie città in Italia.</p>
          <Link href="/map" aria-label="Vai alle Mappe">
            <span className="inline-block bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors">
              Vai alle Mappe
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
