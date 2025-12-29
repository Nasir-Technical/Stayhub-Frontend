'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && user.role !== 'admin') {
      router.push('/'); // Access Denied
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar role="admin" />
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header placeholder could go here */}
        <div className="p-8">
            {children}
        </div>
      </div>
    </div>
  );
}
