'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiSearch, HiCalendar, HiUser } from 'react-icons/hi';
import { DURATION, EASING } from '@/utils/animations';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function SearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
        city: query.city,
        checkIn: query.checkIn,
        checkOut: query.checkOut,
        guests: query.guests
    });
    router.push(`/hotels?${params.toString()}`);
  };

  useGSAP(() => {
    gsap.from('.search-bar', {
       y: 40,
       opacity: 0,
       duration: DURATION.SLOW,
       delay: 0.6,
       ease: EASING.DEFAULT
    });
  });

  return (
    <div className="search-bar relative z-20 -mt-10 md:-mt-16 max-w-5xl mx-auto px-4">
       <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-xl flex flex-col md:flex-row gap-4 items-center">
          
          <div className="flex-1 w-full md:border-r border-slate-100 pr-4">
              <label className="label-base text-xs text-slate-400 uppercase">Location</label>
              <div className="flex items-center">
                  <HiSearch className="text-slate-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Where are you going?" 
                    className="w-full outline-none text-slate-900 font-medium placeholder-slate-400"
                    required
                    value={query.city}
                    onChange={(e) => setQuery({...query, city: e.target.value})}
                  />
              </div>
          </div>

          <div className="flex-1 w-full md:border-r border-slate-100 px-4">
              <label className="label-base text-xs text-slate-400 uppercase">Check-in - Check-out</label>
              <div className="flex items-center gap-2">
                  <HiCalendar className="text-slate-400 shrink-0" />
                  <input 
                    type="date" 
                    className="w-full outline-none text-slate-900 font-medium text-sm"
                    required
                    value={query.checkIn}
                    onChange={(e) => setQuery({...query, checkIn: e.target.value})}
                  />
                  <span>-</span>
                  <input 
                    type="date" 
                    className="w-full outline-none text-slate-900 font-medium text-sm"
                    required
                    value={query.checkOut}
                    onChange={(e) => setQuery({...query, checkOut: e.target.value})}
                  />
              </div>
          </div>
          
          <div className="w-full md:w-32 px-4">
              <label className="label-base text-xs text-slate-400 uppercase">Guests</label>
              <div className="flex items-center">
                  <HiUser className="text-slate-400 mr-2" />
                  <input 
                    type="number" 
                    min="1"
                    className="w-full outline-none text-slate-900 font-medium"
                    value={query.guests}
                    onChange={(e) => setQuery({...query, guests: e.target.value})}
                  />
              </div>
          </div>

          <button type="submit" className="w-full md:w-auto btn-primary h-14 px-8 flex items-center justify-center rounded-lg shadow-blue-200">
             Search
          </button>
       </form>
    </div>
  );
}
