'use client';

import { useEffect, useState, useRef } from 'react';
import api from '@/services/api';
import HotelGallery from '@/components/features/hotels/HotelGallery';
import RoomList from '@/components/features/rooms/RoomList';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DURATION, EASING } from '@/utils/animations';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HotelDetailsPage({ params }) {
  const { id } = params;
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const container = useRef();

  // Mock rooms data (until backend supports getting rooms by hotel)
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchHotel = async () => {
        try {
            const res = await api.get(`/hotels/${id}`);
            setHotel(res.data);
            
            // Mock Room Fetch
            // In real app: const roomRes = await api.get(`/hotels/${id}/rooms`);
            setRooms([
                { _id: '101', name: 'Deluxe King Suite', price: 180, description: 'Experience ultimate comfort in our spacious Deluxe King Suite featuring a plush king-sized bed, panoramic city views, and a dedicated workspace.', availableRooms: 5 },
                { _id: '102', name: 'Standard Double Room', price: 120, description: 'Perfect for couples or friends, this room offers two comfortable double beds, modern amenities, and a cozy atmosphere.', availableRooms: 3 },
                { _id: '103', name: 'Executive Studio', price: 250, description: 'Ideal for business travelers, providing a separate living area, kitchenette, and access to the executive lounge.', availableRooms: 0 },
            ]);
        } catch (err) {
            console.error(err);
            setHotel(null);
        } finally {
            setLoading(false);
        }
    };
    fetchHotel();
  }, [id]);

  useGSAP(() => {
      if (!loading && hotel) {
          const tl = gsap.timeline();
          
          // Header Fade In
          tl.from('.hotel-header', { y: 20, opacity: 0, duration: DURATION.SLOW, ease: EASING.DEFAULT });
          
          // Gallery Scale Up
          tl.from('.hotel-gallery', { scale: 0.95, opacity: 0, duration: DURATION.SLOW, ease: EASING.BOUNCE }, "-=0.3");

          // Content Reveal
          tl.from('.hotel-content', { y: 30, opacity: 0, duration: DURATION.SLOW, ease: EASING.DEFAULT }, "-=0.4");
          
          // Rooms Stagger
          gsap.from('.room-card', {
              scrollTrigger: {
                  trigger: '.rooms-section',
                  start: 'top 80%',
              },
              y: 50,
              opacity: 0,
              duration: DURATION.SLOW,
              stagger: 0.15,
              ease: EASING.DEFAULT
          });
      }
  }, [loading, hotel]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading hotel details...</div>;
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found.</div>;

  return (
    <div ref={container} className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="hotel-header mb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">{hotel.name}</h1>
                <p className="text-slate-500 flex items-center mt-2 text-lg">
                    <span className="text-slate-400 mr-2">📍</span>
                    {hotel.city}, {hotel.address || 'Excellent Location'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                 <div className="text-right">
                     <div className="text-sm text-slate-500">Guest Rating</div>
                     <div className="font-bold text-slate-900">Exceptional</div>
                 </div>
                 <div className="bg-blue-600 text-white text-xl font-bold p-3 rounded-lg shadow-lg">
                    {hotel.rating || '9.5'}
                 </div>
              </div>
          </div>
      </div>

      {/* Gallery */}
      <div className="hotel-gallery">
         <HotelGallery hotelName={hotel.name} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 hotel-content">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
                  <h2 className="text-2xl font-bold mb-4 text-slate-900">About this hotel</h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                      {hotel.description || "Located in the heart of the city, this hotel offers a blend of luxury and convenience. Guests can enjoy world-class amenities, including a rooftop pool, spa, and gourmet dining options. Whether you are traveling for business or leisure, our dedicated staff ensures a memorable stay."}
                  </p>
                  
                  <h3 className="text-lg font-bold mt-8 mb-4 text-slate-900">Top Facilities</h3>
                  <ul className="grid grid-cols-2 ml-4 list-disc text-slate-600 gap-2">
                      <li>Free High-Speed Wi-Fi</li>
                      <li>24/7 Room Service</li>
                      <li>Fitness Center</li>
                      <li>Swimming Pool</li>
                      <li>Airport Shuttle</li>
                      <li>Concierge Service</li>
                  </ul>
              </section>

              {/* Rooms List */}
              <section className="rooms-section">
                  <h2 className="text-2xl font-bold mb-6 text-slate-900">Available Rooms</h2>
                  <RoomList rooms={rooms} hotelId={hotel._id} />
              </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                  {/* Highlights Card */}
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
                      <h3 className="font-bold text-lg mb-4 text-slate-900">Why book with us?</h3>
                      <ul className="space-y-4">
                          <li className="flex gap-3">
                              <span className="bg-green-100 text-green-600 p-1 rounded-full h-fit mt-1">✓</span>
                              <span className="text-sm text-slate-600">Free cancellation on most rooms</span>
                          </li>
                          <li className="flex gap-3">
                              <span className="bg-green-100 text-green-600 p-1 rounded-full h-fit mt-1">✓</span>
                              <span className="text-sm text-slate-600">Best price guarantee</span>
                          </li>
                          <li className="flex gap-3">
                              <span className="bg-green-100 text-green-600 p-1 rounded-full h-fit mt-1">✓</span>
                              <span className="text-sm text-slate-600">Instant confirmation</span>
                          </li>
                      </ul>
                  </div>

                  {/* Map Placeholder */}
                  <div className="bg-slate-200 rounded-xl h-64 relative overflow-hidden group cursor-pointer">
                      <img src="https://placehold.co/400x400?text=Map+View" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                          <button className="bg-white text-slate-900 font-bold px-4 py-2 rounded-full shadow-md hover:scale-105 transition">Show on Map</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
