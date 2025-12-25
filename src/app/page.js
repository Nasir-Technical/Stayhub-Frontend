'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    checkIn: '',
    checkOut: ''
  });
  const [loading, setLoading] = useState(false);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const res = await api.get(`/hotels?${queryParams}`);
      setHotels(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []); // Initial load

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHotels();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Stay</h1>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="bg-gray-100 p-4 rounded mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
        <input 
          type="text" 
          placeholder="City" 
          className="p-2 border rounded"
          value={filters.city}
          onChange={(e) => setFilters({...filters, city: e.target.value})}
        />
        <input 
          type="number" 
          placeholder="Min Price" 
          className="p-2 border rounded"
          value={filters.minPrice}
          onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
        />
         <input 
          type="number" 
          placeholder="Max Price" 
          className="p-2 border rounded"
          value={filters.maxPrice}
          onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
        />
        <input 
          type="date" 
          placeholder="Check In" 
          className="p-2 border rounded"
          value={filters.checkIn}
          onChange={(e) => setFilters({...filters, checkIn: e.target.value})}
        />
         <input 
          type="date" 
          placeholder="Check Out" 
          className="p-2 border rounded"
          value={filters.checkOut}
          onChange={(e) => setFilters({...filters, checkOut: e.target.value})}
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded md:col-span-5">Search</button>
      </form>

      {/* Hotel List */}
      {loading ? (
        <p>Loading hotels...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel._id} className="border rounded shadow p-4">
              <h2 className="text-xl font-bold">{hotel.name}</h2>
              <p className="text-gray-600">{hotel.city}</p>
              <p className="text-yellow-500">Rating: {hotel.rating || 'N/A'}</p>
              <Link href={`/hotels/${hotel._id}`} className="block mt-4 text-blue-600 hover:underline">
                View Details
              </Link>
            </div>
          ))}
          {hotels.length === 0 && <p>No hotels found.</p>}
        </div>
      )}
    </div>
  );
}
