'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import api from '../lib/api';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data.data);
        } catch (err) {
          console.error('Auth Load Error', err);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user || await fetchUser()); // Wait for fetchUser or use response if available (API didn't send user object in login response, so fetchMe usually needed or decode)
    // Quick fix: fetch user immediately after login since login endpoint only returns token in some JWT implementations, 
    // but our controller sends token only? Let's check controller. 
    // Controller: sendTokenResponse -> json({ success: true, token }). 
    // so we need to fetchMe.
    const meRes = await api.get('/auth/me');
    setUser(meRes.data.data);
    router.push('/');
  };

  const register = async (userData) => {
    const res = await api.post('/auth/register', userData);
    localStorage.setItem('token', res.data.token);
    const meRes = await api.get('/auth/me');
    setUser(meRes.data.data);
    router.push('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
