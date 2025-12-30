'use client';

import { useEffect, useState, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/services/api';
import Link from 'next/link';
import FilterSidebar from '@/components/features/search/FilterSidebar';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

function HotelList() {
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const container = useRef();

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const query = searchParams.toString();
        const res = await api.get(`/hotels?${query}`);
        // Backend returns { success: true, data: [...] }
        const list = Array.isArray(res.data) ? res.data : (res.data.data || []);
        setHotels(list);
      } catch (err) {
        console.error('Search failed', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchParams]);

  // GSAP Animation whenever hotels list updates
  useGSAP(() => {
    if (!loading && hotels.length > 0) {
        gsap.fromTo('.card-hotel', 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
        );
    }
  }, [hotels, loading]); // Re-run when data changes

  if (loading) {
     return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="bg-white rounded-lg h-80 animate-pulse bg-slate-200"></div>
            ))}
        </div>
     );
  }

  if (hotels.length === 0) {
      return (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">No hotels found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your filters or search criteria.</p>
          </div>
      );
  }

  return (
    <div ref={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <Link key={hotel._id} href={`/hotels/${hotel._id}`}>
           <div className="card-hotel group h-full flex flex-col">
              <div className="aspect-[4/3] bg-slate-200 relative">
                 <img 
                   src={`https://placehold.co/600x400?text=${encodeURIComponent(hotel.name)}`} 
                   alt={hotel.name} 
                   className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                 />
                 <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-slate-900 shadow-sm">
                    ★ {hotel.rating || 'New'}
                 </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                  <div className="mb-2">
                     <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{hotel.name}</h3>
                     <p className="text-sm text-slate-500">{hotel.city}</p>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                     <div className="text-xs text-slate-400">
                         Starting from <span className="block text-lg font-bold text-slate-900">$100</span>
                     </div>
                     <button className="btn-outline text-xs px-3 py-1">View Details</button>
                  </div>
              </div>
           </div>
        </Link>
      ))}
    </div>
  );
}

export default function HotelsPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
            <h1 className="text-3xl font-bold text-slate-900">Search Results</h1>
            <p className="text-slate-500 mt-1">Find your ideal stay</p>
        </div>
        
        {/* Mobile Filter Toggle */}
        <button 
            className="lg:hidden btn-outline text-sm"
            onClick={() => setShowFilters(!showFilters)}
        >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 align-start">
         {/* Sidebar */}
         <aside className={`lg:w-64 shrink-0 lg:block ${showFilters ? 'block' : 'hidden'}`}>
             <div className="sticky top-24">
                 <Suspense fallback={<div>Loading Filters...</div>}>
                    <FilterSidebar />
                 </Suspense>
             </div>
         </aside>

         {/* Grid */}
         <div className="flex-1">
             <Suspense fallback={<div>Loading Results...</div>}>
                <HotelList />
             </Suspense>
         </div>
      </div>
    </div>
  );
}
