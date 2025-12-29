'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HotelGallery({ hotelName }) {
  // Mock images since backend doesn't provide array yet
  const images = [
    `https://placehold.co/1200x600?text=${encodeURIComponent(hotelName)}`,
    'https://placehold.co/1200x600?text=Lobby',
    'https://placehold.co/1200x600?text=Room+View',
    'https://placehold.co/1200x600?text=Pool',
    'https://placehold.co/1200x600?text=Dining',
  ];

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg mb-8 relative group">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="w-full h-[300px] md:h-[500px]"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full bg-slate-200 relative">
                 <img 
                    src={img} 
                    alt={`${hotelName} view ${index + 1}`} 
                    className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-4 left-4 z-10">
          <span className="bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
             View All Photos
          </span>
      </div>
    </div>
  );
}
