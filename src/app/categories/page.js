'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ManageCategories() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories from backend
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://look-my-app.vercel.app/api/categories/'); // Replace with your backend URL
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async () => {
    if (categoryName.trim() === '') return;

    const newCategory = {
      name: categoryName,
      iconUrl: '/icons/default-icon.svg', // Default icon for new categories
    };

    try {
      const response = await fetch('https://look-my-app.vercel.app/api/categories/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      });
      if (response.ok) {
        const addedCategory = await response.json();
        setCategories([...categories, addedCategory]);
        setCategoryName(''); // Clear the input field after adding
      } else {
        console.error('Error adding category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestisci Categorie</h1>
      <div className="mb-6">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Inserisci il nome della categoria"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Aggiungi Categoria
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center"
          >
            <Image
              src={category.iconUrl}
              alt={`${category.name} Icon`}
              width={64}
              height={64}
              className="mb-4"
            />
            <h2 className="text-lg font-semibold">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
