'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

export default function CreateHotelPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
    address: '',
    phone: '',
    email: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        await api.post('/hotels', formData);
        router.push('/owner/hotels');
    } catch (err) {
        console.error("Failed to create hotel", err);
        alert('Failed to create hotel');
    } finally {
        setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Add New Hotel</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-6">
          <div>
              <label className="label-base">Hotel Name</label>
              <input name="name" required className="input-base" placeholder="e.g. Grand Plaza" onChange={handleChange} />
          </div>
          
          <div>
              <label className="label-base">Description</label>
              <textarea name="description" required className="input-base h-32" placeholder="Describe your property..." onChange={handleChange}></textarea>
          </div>

          <div className="grid grid-cols-2 gap-6">
              <div>
                  <label className="label-base">City</label>
                  <input name="city" required className="input-base" placeholder="New York" onChange={handleChange} />
              </div>
              <div>
                  <label className="label-base">Address</label>
                  <input name="address" required className="input-base" placeholder="123 Main St" onChange={handleChange} />
              </div>
          </div>

           <div className="grid grid-cols-2 gap-6">
              <div>
                  <label className="label-base">Phone</label>
                  <input name="phone" required className="input-base" placeholder="+1 234 567 890" onChange={handleChange} />
              </div>
              <div>
                  <label className="label-base">Email</label>
                  <input type="email" name="email" required className="input-base" placeholder="contact@hotel.com" onChange={handleChange} />
              </div>
          </div>

          <div className="pt-4 flex justify-end gap-4">
              <button type="button" onClick={() => router.back()} className="btn-outline">Cancel</button>
              <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Creating...' : 'Create Hotel'}
              </button>
          </div>
      </form>
    </div>
  );
}
