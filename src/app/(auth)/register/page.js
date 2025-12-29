'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { HiUser, HiOfficeBuilding } from 'react-icons/hi';

gsap.registerPlugin(useGSAP);

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  
  const containerRef = useRef();

  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useGSAP(() => {
    gsap.from(containerRef.current.children, {
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

    const res = await register(formData.name, formData.email, formData.password, formData.role);
    if (res.success) {
      router.push('/');
    } else {
      setError(res.error);
    }
    setLoading(false);
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="text-center mb-8">
        <Link href="/" className="text-3xl font-bold text-blue-600 block mb-2">StayHub</Link>
        <h2 className="text-2xl font-bold text-slate-900">Create an account</h2>
        <p className="mt-2 text-slate-600">Join us to start your journey</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div 
                onClick={() => setFormData({ ...formData, role: 'customer' })}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                    formData.role === 'customer' 
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md transform scale-[1.02]' 
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
            >
                <HiUser className="w-8 h-8 mx-auto mb-2" />
                <div className="font-bold text-sm">Customer</div>
            </div>
            <div 
                onClick={() => setFormData({ ...formData, role: 'hotelOwner' })}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                    formData.role === 'hotelOwner' 
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md transform scale-[1.02]' 
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
            >
                <HiOfficeBuilding className="w-8 h-8 mx-auto mb-2" />
                <div className="font-bold text-sm">Hotel Owner</div>
            </div>
        </div>

        <div>
          <label className="label-base">Full Name</label>
          <input
            type="text"
            required
            className="input-base"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="label-base">Email address</label>
          <input
            type="email"
            required
            className="input-base"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="label-base">Password</label>
          <input
            type="password"
            required
            autoComplete="new-password"
            className="input-base"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary h-11 mt-4 shadow-lg shadow-blue-200"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>

        <div className="text-center text-sm text-slate-600 mt-6 pt-4 border-t border-slate-100">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-500 font-bold">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
