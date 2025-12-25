'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Actions</h2>
        
        <div className="border-t pt-4">
          <h3 className="font-bold mb-2">Hotel Approvals</h3>
          <p className="text-gray-600 mb-4">
            (UI for approving hotels would appear here. Backend API for listing pending hotels is not defined in the current spec.)
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed">
            View Pending Approvals
          </button>
        </div>
      </div>
    </div>
  );
}
