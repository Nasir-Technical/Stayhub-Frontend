'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { HiCurrencyDollar, HiUsers, HiOfficeBuilding, HiTicket } from 'react-icons/hi';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalUsers: 0,
    totalHotels: 0,
    totalBookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to load admin stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: HiCurrencyDollar, color: 'bg-green-100 text-green-600' },
    { label: 'Registered Users', value: stats.totalUsers, icon: HiUsers, color: 'bg-blue-100 text-blue-600' },
    { label: 'Total Hotels', value: stats.totalHotels, icon: HiOfficeBuilding, color: 'bg-purple-100 text-purple-600' },
    { label: 'Total Bookings', value: stats.totalBookings, icon: HiTicket, color: 'bg-orange-100 text-orange-600' },
  ];

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Admin Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center">
              <div className={`p-4 rounded-full ${stat.color} mr-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[400px] flex items-center justify-center text-slate-400">
          Chart Placeholder (Revenue over time)
      </div>
    </div>
  );
}
