'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ManageCategories() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([
    { name: 'Ristoranti', icon: '/images/icon_ristoranti.png' },
    { name: 'Alberghi', icon: '/images/icon_alberghi.png' },
    { name: 'Bar e Movida', icon: '/images/icon_bar_e_movida.png' },
    { name: 'Shopping', icon: '/images/icon_shopping.png' },
    { name: 'Servizi', icon: '/images/icon_servizi.png' },
    { name: 'Svago ed Eventi', icon: '/images/icon_svago_ed_eventi.png' },
    { name: 'Turismo', icon: '/images/icon_turismo.png' },
    { name: 'Trasporti', icon: '/images/icon_trasporti.png' },
    { name: 'Info', icon: '/images/icon_info.png' },
  ]);

  const handleAddCategory = () => {
    if (categoryName.trim() === '') return;

    const newCategory = {
      name: categoryName,
      icon: '/icons/default-icon.svg', // Default icon for new categories
    };

    setCategories([...categories, newCategory]);
    setCategoryName(''); // Clear the input field after adding
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
              src={category.icon}
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
