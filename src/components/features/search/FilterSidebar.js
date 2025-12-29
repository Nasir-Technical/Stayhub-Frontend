'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { HiStar } from 'react-icons/hi';

export default function FilterSidebar({ className = '' }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state for inputs
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
  });

  // Sync state from URL on mount/update
  useEffect(() => {
    setFilters({
      city: searchParams.get('city') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      rating: searchParams.get('rating') || '',
    });
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update or delete params based on state
    Object.keys(filters).forEach(key => {
        if (filters[key]) {
            params.set(key, filters[key]);
        } else {
            params.delete(key);
        }
    });

    router.push(`/hotels?${params.toString()}`);
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-slate-100 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-slate-900">Filters</h3>
        <button 
            onClick={() => {
                setFilters({ city: '', minPrice: '', maxPrice: '', rating: '' });
                router.push('/hotels');
            }}
            className="text-xs text-slate-500 hover:text-blue-600 underline"
        >
            Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* City Filter */}
        <div>
          <label className="label-base text-xs uppercase text-slate-400">Location</label>
          <input 
            type="text" 
            name="city"
            placeholder="City name" 
            className="input-base text-sm"
            value={filters.city}
            onChange={handleChange}
          />
        </div>

        {/* Price Range */}
        <div>
           <label className="label-base text-xs uppercase text-slate-400">Price Range</label>
           <div className="flex items-center gap-2">
              <input 
                type="number" 
                name="minPrice"
                placeholder="Min" 
                className="input-base text-sm w-full"
                value={filters.minPrice}
                onChange={handleChange}
              />
              <span className="text-slate-400">-</span>
              <input 
                type="number" 
                name="maxPrice"
                placeholder="Max" 
                className="input-base text-sm w-full"
                value={filters.maxPrice}
                onChange={handleChange}
              />
           </div>
        </div>

        {/* Rating Filter */ }
        <div>
           <label className="label-base text-xs uppercase text-slate-400">Rating</label>
           <div className="space-y-2">
              {[5, 4, 3, 2].map((star) => (
                  <label key={star} className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="rating" 
                        value={star}
                        checked={filters.rating === String(star)}
                        onChange={handleChange}
                        className="text-blue-600 focus:ring-blue-500 border-slate-300"
                      />
                      <span className="ml-2 text-sm text-slate-600 flex items-center">
                          {star} <HiStar className="text-yellow-400 w-4 h-4 mx-1" /> & Up
                      </span>
                  </label>
              ))}
           </div>
        </div>
      </div>

      <button 
        onClick={handleApply}
        className="w-full btn-primary mt-8"
      >
        Apply Filters
      </button>
    </div>
  );
}
