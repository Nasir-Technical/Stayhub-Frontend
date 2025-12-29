'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { HiCheck, HiX, HiSearch } from 'react-icons/hi';

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHotels = async () => {
    try {
      // Admin should ideally have an endpoint to get ALL hotels including unapproved
      // Using public one might filtered approved only. 
      // Assuming GET /hotels returns all for now or we use specific admin endpoint if available.
      // Based on previous work, simple GET /hotels was public. 
      // We might need to filter client side if public API returns everything or assumes Admin auth shows all.
      const res = await api.get('/hotels'); 
      const list = Array.isArray(res.data) ? res.data : (res.data.hotels || []);
      setHotels(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleStatusChange = async (id, status) => {
      try {
          if (status === 'approve') {
              await api.put(`/hotels/${id}/approve`);
          } else {
              // Assuming reject endpoint exists or we use update
              await api.put(`/hotels/${id}/reject`); 
          }
          // Refresh list
          fetchHotels();
      } catch (err) {
          alert(`Failed to ${status} hotel`);
      }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Manage Hotels</h1>
          <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search hotels..." className="pl-10 input-base w-64" />
          </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-900 font-bold uppercase text-xs border-b border-slate-200">
                  <tr>
                      <th className="px-6 py-4">Hotel Name</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                  {loading ? (
                      <tr><td colSpan="4" className="text-center py-8">Loading...</td></tr>
                  ) : hotels.map((hotel) => (
                      <tr key={hotel._id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{hotel.name}</td>
                          <td className="px-6 py-4">{hotel.city}</td>
                          <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                  hotel.isApproved 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                  {hotel.isApproved ? 'Approved' : 'Pending'}
                              </span>
                          </td>
                          <td className="px-6 py-4 text-right flex justify-end gap-2">
                              {!hotel.isApproved && (
                                  <button 
                                    onClick={() => handleStatusChange(hotel._id, 'approve')}
                                    className="btn-primary py-1 px-3 text-xs flex items-center bg-green-600 hover:bg-green-700"
                                  >
                                      <HiCheck className="mr-1" /> Approve
                                  </button>
                              )}
                              {hotel.isApproved && (
                                  <button 
                                    onClick={() => handleStatusChange(hotel._id, 'reject')}
                                    className="btn-outline py-1 px-3 text-xs flex items-center text-red-600 hover:bg-red-50 border-red-200"
                                  >
                                      <HiX className="mr-1" /> Reject
                                  </button>
                              )}
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
}
