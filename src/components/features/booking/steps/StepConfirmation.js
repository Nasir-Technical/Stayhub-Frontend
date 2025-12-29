'use client';

import Link from 'next/link';
import { HiCheckCircle } from 'react-icons/hi';

export default function StepConfirmation() {
  return (
    <div className="text-center py-12 space-y-6">
       <div className="flex justify-center">
          <HiCheckCircle className="text-green-500 w-20 h-20" />
       </div>
       <h2 className="text-3xl font-bold text-slate-900">Booking Confirmed!</h2>
       <p className="text-slate-600 max-w-md mx-auto">
           Your reservation has been successfully confirmed. We have sent a confirmation email to you.
       </p>
       <div className="pt-6">
           <Link href="/my-bookings" className="btn-primary">
               View My Bookings
           </Link>
       </div>
    </div>
  );
}
