'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';

export default function OwnerLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Admin also allowed in Owner area ideally? Spec said "Hotel owner manage own data".
    // For now strictly hotelOwner.
    if (!loading && user && user.role !== 'hotelOwner' && user.role !== 'admin') {
       router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user || (user.role !== 'hotelOwner' && user.role !== 'admin')) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar role="hotelOwner" />
      <div className="flex-1 lg:ml-64">
        <div className="p-8">
            {children}
        </div>
      </div>
    </div>
  );
}
