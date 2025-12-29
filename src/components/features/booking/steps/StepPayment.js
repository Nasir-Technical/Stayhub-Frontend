'use client';

import { useState } from 'react';

export default function StepPayment({ onNext, onBack, total }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    onNext();
  };

  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold text-slate-900">Payment</h2>
       <p className="text-slate-500">Secure payment for total amount: <span className="font-bold text-slate-900">${total.toFixed(2)}</span></p>

       <form onSubmit={handlePay} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
           <div>
              <label className="label-base">Card Number</label>
              <input type="text" placeholder="0000 0000 0000 0000" className="input-base" required />
           </div>
           <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="label-base">Expiry</label>
                  <input type="text" placeholder="MM/YY" className="input-base" required />
               </div>
               <div>
                  <label className="label-base">CVC</label>
                  <input type="text" placeholder="123" className="input-base" required />
               </div>
           </div>
           
           <div className="flex gap-4 pt-4">
             <button type="button" onClick={onBack} disabled={loading} className="btn-outline flex-1">Back</button>
             <button type="submit" disabled={loading} className="btn-primary flex-1">
                 {loading ? 'Processing...' : 'Pay Now'}
             </button>
           </div>
       </form>
    </div>
  );
}
