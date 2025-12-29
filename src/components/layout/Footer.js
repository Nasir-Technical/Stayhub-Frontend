'use client';

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">StayHub</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Discover the best hotels at the best prices. Experience seamless interaction and unforgettable stays.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition-colors"><FaFacebook size={20} /></a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors"><FaTwitter size={20} /></a>
              <a href="#" aria-label="Instagram" className="hover:text-blue-400 transition-colors"><FaInstagram size={20} /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-blue-400 transition-colors"><FaLinkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/hotels" className="hover:text-blue-400 transition-colors">Search Hotels</Link></li>
              <li><Link href="/login" className="hover:text-blue-400 transition-colors">Login</Link></li>
              <li><Link href="/register" className="hover:text-blue-400 transition-colors">Register</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>123 Hotel Street, Cityville</li>
              <li>support@stayhub.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} StayHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
