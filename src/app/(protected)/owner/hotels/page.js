'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/services/api';
import { HiPlus, HiPencilAlt, HiEye } from 'react-icons/hi';

export default function MyHotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we'd have GET /api/owner/hotels.
    // We will use the public GET /hotels and filter (inefficient but works for spec demo)
    // OR just use public for now.
    const fetchHotels = async () => {
      try {
      const res = await api.get('/hotels/mine');
      setHotels(res.data.data);
    } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">My Hotels</h1>
        <Link href="/owner/hotels/create" className="btn-primary flex items-center">
            <HiPlus className="mr-2" /> Add New Hotel
        </Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map(hotel => (
                <div key={hotel._id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                    <div className="h-48 bg-slate-200">
                        <img 
                           src={`https://placehold.co/600x400?text=${encodeURIComponent(hotel.name)}`} 
                           className="w-full h-full object-cover" 
                        />
                    </div>
                    <div className="p-4 flex-1">
                        <h3 className="font-bold text-lg text-slate-900 mb-1">{hotel.name}</h3>
                        <p className="text-sm text-slate-500 mb-4">{hotel.city}</p>
                        <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded font-bold ${hotel.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {hotel.isApproved ? 'Live' : 'Pending Approval'}
                            </span>
                        </div>
                    </div>
                    <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between">
                         <Link href={`/hotels/${hotel._id}`} className="text-slate-500 hover:text-blue-600 flex items-center text-sm font-medium">
                            <HiEye className="mr-1" /> View
                         </Link>
                         <Link href={`/owner/hotels/${hotel._id}`} className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium">
                            <HiPencilAlt className="mr-1" /> Manage
                         </Link>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}
