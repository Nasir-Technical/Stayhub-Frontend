'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { HiCurrencyDollar, HiOfficeBuilding, HiUsers, HiTrendingUp } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import api from '@/services/api';

export default function OwnerDashboard() {
  
  const [statsData, setStatsData] = useState({
      revenue: 0,
      bookings: 0,
      properties: 0,
      recentBookings: []
  });

  useEffect(() => {
     const fetchStats = async () => {
         try {
             const res = await api.get('/hotels/stats/mine');
             setStatsData(res.data.data);
         } catch (err) {
             console.error(err);
         }
     };
     fetchStats();
  }, []);

  const stats = [
    { label: 'Total Revenue', value: `$${statsData.revenue.toLocaleString()}`, icon: HiCurrencyDollar, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Total Bookings', value: statsData.bookings, icon: HiUsers, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Properties', value: statsData.properties, icon: HiOfficeBuilding, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Avg. Occupancy', value: 'N/A', icon: HiTrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  useGSAP(() => {
    gsap.from('.stat-card', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                {/* <span className="text-sm text-slate-400 font-medium">+12%</span> */}
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings (Mock) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-lg text-slate-900">Recent Bookings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 font-medium">
              <tr>
                <th className="px-6 py-4">Guest</th>
                <th className="px-6 py-4">Hotel</th>
                <th className="px-6 py-4">Room</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {statsData.recentBookings.length === 0 ? (
                 <tr><td colSpan="6" className="px-6 py-4 text-center text-slate-500">No bookings yet.</td></tr>
              ) : (
                statsData.recentBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{booking.user?.name || 'Guest'}</td>
                    <td className="px-6 py-4">{booking.hotel?.name}</td>
                    <td className="px-6 py-4">{booking.room?.name}</td>
                    <td className="px-6 py-4">
                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">${booking.totalPrice}</td>
                    <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Confirmed</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
