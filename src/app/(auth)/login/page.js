'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');

  const containerRef = useRef();
  const formRef = useRef();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(containerRef.current.children, {
       y: 20,
       opacity: 0,
       duration: 0.6,
       stagger: 0.1,
       ease: 'power2.out'
    });
  }, { scope: containerRef });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Micro interaction on button
    gsap.to('.btn-submit', { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1 });

    const res = await login(formData.email, formData.password);
    if (res.success) {
      const user = res.user;
      if (returnUrl) {
        router.push(returnUrl);
      } else if (user.role === 'admin') {
        router.push('/admin');
      } else if (user.role === 'hotelOwner') {
        router.push('/owner');
      } else {
        router.push('/');
      }
    } else {
      setError(res.error);
      // Shake animation on error
      gsap.fromTo(formRef.current, { x: -10 }, { x: 10, duration: 0.1, repeat: 3, yoyo: true });
    }
    setLoading(false);
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="text-center mb-8">
        <Link href="/" className="text-3xl font-bold text-blue-600 block mb-2">StayHub</Link>
        <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
        <p className="mt-2 text-slate-600">Please sign in to your account</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm font-medium border border-red-100 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label className="block text-sm font-medium text-slate-700 mb-1 transition-colors group-focus-within:text-blue-600">Email address</label>
          <input
            type="email"
            required
            className="input-base transition-all focus:shadow-md"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="group">
          <div className="flex justify-between items-center mb-1">
             <label className="block text-sm font-medium text-slate-700 transition-colors group-focus-within:text-blue-600">Password</label>
             <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-500">Forgot password?</a>
          </div>
          <input
            type="password"
            required
            className="input-base transition-all focus:shadow-md"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-submit w-full btn-primary h-11 shadow-lg shadow-blue-200"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or continue with</span>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
            <button type="button" className="flex items-center justify-center w-full px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
               Google
            </button>
            <button type="button" className="flex items-center justify-center w-full px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
               Facebook
            </button>
        </div>

        <div className="text-center text-sm text-slate-600 mt-6 pt-4 border-t border-slate-100">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:text-blue-500 font-bold transition-colors">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
