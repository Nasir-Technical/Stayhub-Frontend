'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { HiCalendar } from 'react-icons/hi';

export default function OwnerBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings/owner');
        setBookings(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
        <HiCalendar className="mr-2 text-blue-600" /> All Bookings
      </h1>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
         <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-900 font-bold uppercase text-xs border-b border-slate-200">
                  <tr>
                      <th className="px-6 py-4">Booking ID</th>
                      <th className="px-6 py-4">Guest</th>
                      <th className="px-6 py-4">Hotel</th>
                      <th className="px-6 py-4">Room</th>
                      <th className="px-6 py-4">Dates</th>
                      <th className="px-6 py-4">Amount</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                  {loading ? (
                      <tr><td colSpan="6" className="text-center py-8">Loading...</td></tr>
                  ) : bookings.length === 0 ? (
                      <tr><td colSpan="6" className="text-center py-8">No bookings found yet.</td></tr>
                  ) : bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-mono text-xs">{booking._id.substring(0,8)}...</td>
                          <td className="px-6 py-4 font-bold text-slate-900">{booking.user?.name || 'Unknown'}</td>
                          <td className="px-6 py-4">{booking.hotel?.name || 'Deleted'}</td>
                          <td className="px-6 py-4">{booking.room?.name || 'Deleted'}</td>
                          <td className="px-6 py-4">
                              {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 font-bold text-blue-600">${booking.totalPrice}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
         </div>
      </div>
    </div>
  );
}
