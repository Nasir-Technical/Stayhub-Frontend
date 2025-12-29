'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import SearchForm from '@/components/features/search/SearchForm';
import FeaturedHotels from '@/components/features/hotels/FeaturedHotels';
import { DURATION, EASING } from '@/utils/animations';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HomePage() {
  const container = useRef();
  const heroText = useRef();
  const ctaSection = useRef();

  useGSAP(() => {
    // Hero Text Stagger
    gsap.from(heroText.current.children, {
      y: 50,
      opacity: 0,
      duration: DURATION.HERO,
      stagger: 0.2,
      ease: EASING.SMOOTH,
      delay: 0.2
    });

    // CTA Scroll Trigger (Simple fade up)
    gsap.from(ctaSection.current, {
        scrollTrigger: {
            trigger: ctaSection.current,
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: DURATION.SLOW,
        ease: EASING.DEFAULT
    });

  }, { scope: container });

  return (
    <div ref={container}>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-900 opacity-90 z-0"></div>
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)' }} // High quality hotel image
        ></div>

        <div className="relative z-10 text-center max-w-3xl px-4" ref={heroText}>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Find Your Next <span className="text-blue-400">Perfect Stay</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
            Discover comfort and luxury at the best prices. Book hotels seamlessly with StayHub.
          </p>
        </div>
      </section>

      {/* Search Form (Overlapping Hero) */}
      <SearchForm />

      {/* Featured Section */}
      <FeaturedHotels />

      {/* CTA Section */}
      <section ref={ctaSection} className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Own a Hotel? List with Us!</h2>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
                  Join thousands of hotel owners growing their business with StayHub. 
                  Get access to a global audience and easy management tools.
              </p>
              <Link href="/register?role=hotelOwner" className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors shadow-lg">
                  Become a Partner
              </Link>
          </div>
      </section>
    </div>
  );
}
