'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function AddHotel() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    description: '',
    phone: '',
    email: ''
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/hotels', formData);
      alert('Hotel created! Waiting for admin approval.');
      router.push('/owner');
    } catch (err) {
      console.error(err);
      alert('Error creating hotel');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Add New Hotel</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Hotel Name</label>
          <input 
            type="text" 
            required 
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-1">City</label>
           <input 
            type="text" 
            required 
            className="w-full border p-2 rounded"
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-1">Address</label>
           <input 
            type="text" 
            required 
            className="w-full border p-2 rounded"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea 
            required 
            className="w-full border p-2 rounded"
            rows="4"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          ></textarea>
        </div>
         <div>
          <label className="block mb-1">Email</label>
           <input 
            type="email" 
            className="w-full border p-2 rounded"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
         <div>
          <label className="block mb-1">Phone</label>
           <input 
            type="text" 
            className="w-full border p-2 rounded"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Submit Hotel
        </button>
      </form>
    </div>
  );
}
