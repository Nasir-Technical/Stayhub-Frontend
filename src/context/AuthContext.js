'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data.data); // Assuming response structure { success: true, data: user }
        } catch (err) {
          console.error('Auth Check Failed', err);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      // Spec: POST /auth/login returns { token, ... }
      const { token } = res.data;
      localStorage.setItem('token', token);
      
      // Fetch user details immediately
      const userRes = await api.get('/auth/me');
      setUser(userRes.data.data);
      
      return { success: true, user: userRes.data.data };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.error || 'Login failed' 
      };
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      const { token } = res.data;
      localStorage.setItem('token', token);
      
      const userRes = await api.get('/auth/me');
      setUser(userRes.data.data);

      return { success: true, user: userRes.data.data };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.error || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
