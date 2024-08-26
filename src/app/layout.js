'use client';

import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import './globals.css';
import LogoutButton from './login/LogoutButton'; // Adjust import path if necessary

export default function RootLayout({ children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <html lang="it">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Dashboard di amministrazione per la gestione di annunci, categorie e mappe per l'app Look My Map" />
        <title>Dashboard Amministrativa LookMyMap</title>
      </head>
      <body>
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Image 
              src="/images/logo 3 colori 2.png" 
              alt="Look My Map Logo" 
              width={40}  // Adjust width according to your design
              height={40} // Adjust height according to your design
              className="mr-2" 
            />
            Dashboard Amministrativa Look My Map
          </h1>
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
              className="bg-gray-700 p-2 rounded focus:outline-none">
              Menu
            </button>
            
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded">
                <li>
                  <Link href="/listings" className="block py-2 px-4 hover:bg-gray-200">Gestisci Annunci</Link>
                </li>
                <li>
                  <Link href="/categories" className="block py-2 px-4 hover:bg-gray-200">Gestisci Categorie</Link>
                </li>
                <li>
                  <Link href="/map" className="block py-2 px-4 hover:bg-gray-200">Gestisci Mappe</Link>
                </li>
              </ul>
            )}
          </div>
          <LogoutButton />
        </header>
        <div className="min-h-screen flex">
          <main className="flex-1 p-6 bg-gray-100">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

// Add PropTypes validation
RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
