'use client';

import BookingWizard from '@/components/features/booking/BookingWizard';
import { useAuth } from '@/context/AuthContext';

export default function BookingPage({ params }) {
  const { roomId } = params;
  const { user } = useAuth();
  
  if (!user) return null; // ProtectedRoute will handle this but failsafe

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">Secure Your Stay</h1>
            <p className="text-slate-600 mt-2">Complete your booking in just a few steps.</p>
        </div>
        
        <BookingWizard roomId={roomId} userId={user._id} />
    </div>
  );
}
