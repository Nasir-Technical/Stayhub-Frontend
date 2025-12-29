'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600';

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              StayHub
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
             <Link href="/" className={`${isActive('/')} font-medium transition-colors`}>Home</Link>
             <Link href="/hotels" className={`${isActive('/hotels')} font-medium transition-colors`}>Hotels</Link>
             
             {user ? (
                 <div className="flex items-center space-x-4">
                     {user.role === 'admin' && <Link href="/admin" className="text-slate-600 hover:text-blue-600 font-medium">Admin</Link>}
                     {user.role === 'hotelOwner' && <Link href="/owner" className="text-slate-600 hover:text-blue-600 font-medium">Dashboard</Link>}
                     <button onClick={logout} className="btn-outline px-4 py-2 text-sm">Logout</button>
                 </div>
             ) : (
                 <div className="flex items-center space-x-4">
                     <Link href="/login" className="font-medium text-slate-600 hover:text-blue-600">Login</Link>
                     <Link href="/register" className="btn-primary px-5 py-2 text-sm">Sign Up</Link>
                 </div>
             )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-slate-900">
                  {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-4 shadow-lg">
              <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 text-slate-600">Home</Link>
              <Link href="/hotels" onClick={() => setIsOpen(false)} className="block py-2 text-slate-600">Hotels</Link>
              {user ? (
                   <>
                     {user.role === 'admin' && <Link href="/admin" className="block py-2 text-slate-600">Admin Panel</Link>}
                     {user.role === 'hotelOwner' && <Link href="/owner" className="block py-2 text-slate-600">Owner Dashboard</Link>}
                     <button onClick={logout} className="block w-full text-left py-2 text-red-600">Logout</button>
                   </>
              ) : (
                   <>
                     <Link href="/login" onClick={() => setIsOpen(false)} className="block py-2 text-slate-600">Login</Link>
                     <Link href="/register" onClick={() => setIsOpen(false)} className="block py-2 text-blue-600 font-bold">Sign Up</Link>
                   </>
              )}
          </div>
      )}
    </nav>
  );
}
