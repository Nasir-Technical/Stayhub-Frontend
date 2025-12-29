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

export default function Sidebar({ role }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const links = roleLinks[role] || [];

  return (
    <div className="hidden lg:flex flex-col w-64 bg-slate-900 min-h-screen text-slate-100 fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 font-bold text-xl tracking-wider border-b border-slate-800">
        StayHub <span className="text-blue-500 ml-1">.{role === 'admin' ? 'Admin' : 'Owner'}</span>
      </div>
      
      <div className="flex-1 py-6 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.name} 
              href={link.href}
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

      <div className="p-4 border-t border-slate-800">
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
