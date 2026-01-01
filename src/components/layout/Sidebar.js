'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { HiHome, HiUsers, HiOfficeBuilding, HiChartPie, HiLogout } from 'react-icons/hi';

const roleLinks = {
  admin: [
    { name: 'Overview', href: '/admin', icon: HiChartPie },
    { name: 'Hotel Approvals', href: '/admin/hotels', icon: HiOfficeBuilding },
    { name: 'Users', href: '/admin/users', icon: HiUsers },
  ],
  hotelOwner: [
    { name: 'Dashboard', href: '/owner', icon: HiChartPie },
    { name: 'My Hotels', href: '/owner/hotels', icon: HiOfficeBuilding },
    { name: 'Bookings', href: '/owner/bookings', icon: HiUsers },
  ],
  customer: [
     { name: 'My Bookings', href: '/my-bookings', icon: HiOfficeBuilding },
  ]
};

export default function Sidebar({ role, closeMobile }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const links = roleLinks[role] || [];

  return (
    <div className="flex flex-col w-64 bg-slate-900 min-h-screen text-slate-100 h-full">
      <div className="h-16 flex items-center justify-between px-6 font-bold text-xl tracking-wider border-b border-slate-800 shrink-0">
        <div>StayHub <span className="text-blue-500 ml-1">.{role === 'admin' ? 'Admin' : 'Owner'}</span></div>
        <button onClick={closeMobile} className="lg:hidden text-slate-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </div>
      
      <div className="flex-1 py-6 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={closeMobile} 
              className={`flex items-center px-6 py-3 transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800 shrink-0">
         <button 
           onClick={logout}
           className="flex items-center w-full px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
         >
           <HiLogout className="w-5 h-5 mr-3" />
           Logout
         </button>
      </div>
    </div>
  );
}
