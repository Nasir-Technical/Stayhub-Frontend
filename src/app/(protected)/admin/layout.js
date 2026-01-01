'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && user.role !== 'admin') {
      router.push('/'); // Access Denied
    }
  }, [user, loading, router]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  if (loading || !user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Toggle */}
      {!sidebarOpen && (
        <div className="lg:hidden fixed top-4 left-4 z-50">
            <button onClick={() => setSidebarOpen(true)} className="p-2 bg-white rounded-md shadow text-slate-600">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
               </svg>
            </button>
        </div>
      )}

      {/* Sidebar - Mobile Overlay or Desktop Fixed */}
      <div className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block
          ${sidebarOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'}
      `}>
         <Sidebar role="admin" closeMobile={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      <div className="flex-1 lg:ml-0 min-w-0"> {/* Removed ml-64 since sidebar is now static flex item on desktop */}
        <div className="p-4 lg:p-8 mt-12 lg:mt-0">
            {children}
        </div>
      </div>
    </div>
  );
}
