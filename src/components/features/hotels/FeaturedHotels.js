'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import api from '@/services/api';
import { HiStar, HiLocationMarker } from 'react-icons/hi';

export default function FeaturedHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     // Fetch logic (mimicked from previous sessions)
     const fetchFeatured = async () => {
         try {
             const res = await api.get('/hotels');
             // Just take first 5
             const list = Array.isArray(res.data) ? res.data : (res.data.hotels || []);
             setHotels(list.slice(0, 5));
         } catch (err) {
             console.error(err);
         } finally {
             setLoading(false);
         }
     };
     fetchFeatured();
  }, []);

  if (loading) return <div className="py-20 text-center">Loading featured hotels...</div>;
  if (hotels.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Featured Stays</h2>
            
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
              }}
              className="pb-12"
            >
              {hotels.map((hotel) => (
                  <SwiperSlide key={hotel._id}>
                      <Link href={`/hotels/${hotel._id}`}>
                          <div className="card-hotel group h-full flex flex-col">
                              <div className="aspect-[4/3] bg-slate-200 relative">
                                  <img 
                                    src={`https://placehold.co/600x400?text=${encodeURIComponent(hotel.name)}`} 
                                    alt={hotel.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                   <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold shadow-sm flex items-center">
                                      <HiStar className="text-yellow-400 mr-1" /> {hotel.rating || 'New'}
                                   </div>
                              </div>
                              <div className="p-4 flex-1">
                                  <h3 className="font-bold text-lg text-slate-900 mb-1">{hotel.name}</h3>
                                  <div className="text-sm text-slate-500 flex items-center mb-4">
                                      <HiLocationMarker className="mr-1" /> {hotel.city}
                                  </div>
                              </div>
                              <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                                  <div className="text-xs text-slate-400">From</div>
                                  <div className="font-bold text-blue-600">$100<span className="text-xs font-normal text-slate-400">/night</span></div>
                              </div>
                          </div>
                      </Link>
                  </SwiperSlide>
              ))}
            </Swiper>
        </div>
    </section>
  );
}
