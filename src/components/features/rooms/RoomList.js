'use client';

import Link from 'next/link';
import { HiWifi, HiTv, HiUser, HiCheck } from 'react-icons/hi';

export default function RoomList({ rooms, hotelId }) {
  if (!rooms || rooms.length === 0) {
      return <div className="text-slate-500 italic">No rooms available for booking at the moment.</div>;
  }

  return (
    <div className="space-y-6">
      {rooms.map((room, index) => (
        <div 
            key={room._id} 
            className="room-card bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col md:flex-row"
        >
          {/* Image */}
          <div className="md:w-64 h-48 md:h-auto bg-slate-200 relative shrink-0">
               <img 
                 src={`https://placehold.co/400x300?text=${encodeURIComponent(room.name)}`} 
                 alt={room.name} 
                 className="w-full h-full object-cover"
               />
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{room.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{room.description}</p>
                  
                  {/* Amenities (Mocked) */}
                  <div className="flex flex-wrap gap-3 mb-4">
                      <span className="inline-flex items-center text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
                          <HiWifi className="mr-1" /> Free Wifi
                      </span>
                      <span className="inline-flex items-center text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
                          <HiTv className="mr-1" /> Flat Screen TV
                      </span>
                      <span className="inline-flex items-center text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
                          <HiUser className="mr-1" /> 2 Adults
                      </span>
                  </div>

                  {/* Availability Badge */}
                  {room.availableRooms > 0 ? (
                      <span className="text-xs font-semibold text-green-600 flex items-center">
                          <HiCheck className="mr-1" /> Available ({room.availableRooms} left)
                      </span>
                  ) : (
                      <span className="text-xs font-semibold text-red-500">
                          Sold Out
                      </span>
                  )}
              </div>

              {/* Price & Action */}
              <div className="flex flex-col justify-center items-end min-w-[140px] border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 pl-0 md:pl-6">
                  <div className="text-slate-400 text-xs mb-1">Price per night</div>
                  <div className="text-3xl font-bold text-blue-600 mb-4">${room.price}</div>
                  <Link 
                    href={`/book/${room._id}?hotelId=${hotelId}&price=${room.price}`}
                    className={`w-full text-center py-2.5 px-4 rounded-full font-medium transition-colors ${
                        room.availableRooms > 0 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg' 
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                    onClick={(e) => room.availableRooms <= 0 && e.preventDefault()}
                  >
                    {room.availableRooms > 0 ? 'Book Now' : 'Sold Out'}
                  </Link>
                  <p className="text-[10px] text-slate-400 mt-2 text-center">Includes taxes & fees</p>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
}
