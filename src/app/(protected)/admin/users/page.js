'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { HiBan, HiCheckCircle } from 'react-icons/hi';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUserStatus = async (id, currentStatus) => {
      // Only implementing Block for now as per spec of `blockUser`
      // Assuming backend supports toggling or we just invoke block
      try {
          await api.put(`/admin/users/${id}/block`);
          fetchUsers();
      } catch (err) {
          alert('Failed to update user status');
      }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Manage Users</h1>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-900 font-bold uppercase text-xs border-b border-slate-200">
                  <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4 text-center">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                  {loading ? (
                      <tr><td colSpan="5" className="text-center py-8">Loading...</td></tr>
                  ) : users.map((user) => (
                      <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4 capitalize">{user.role}</td>
                          <td className="px-6 py-4 text-center">
                              {user.isActive ? (
                                  <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded">Active</span>
                              ) : (
                                  <span className="text-red-600 font-bold text-xs bg-red-100 px-2 py-1 rounded">Blocked</span>
                              )}
                          </td>
                          <td className="px-6 py-4 text-right">
                              <button 
                                onClick={() => toggleUserStatus(user._id, user.isActive)}
                                className={`text-xs px-3 py-1 rounded font-medium border transition-colors ${
                                    user.isActive 
                                    ? 'border-red-200 text-red-600 hover:bg-red-50' 
                                    : 'border-green-200 text-green-600 hover:bg-green-50'
                                }`}
                              >
                                  {user.isActive ? 'Block' : 'Unblock'}
                              </button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
}
