'use client';

import { useState, useEffect } from 'react';

export default function StepDateSelection({ onNext, initialData }) {
  const [dates, setDates] = useState({
    checkIn: initialData.checkIn || '',
    checkOut: initialData.checkOut || ''
  });
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const validate = () => {
    if (!dates.checkIn || !dates.checkOut) {
      setError('Please select both check-in and check-out dates.');
      return false;
    }
    if (dates.checkIn < today) {
       setError('Check-in date cannot be in the past.');
       return false;
    }
    if (dates.checkOut <= dates.checkIn) {
      setError('Check-out date must be after check-in date.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validate()) {
      onNext(dates);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Select Dates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label-base">Check-in Date</label>
          <input 
            type="date" 
            min={today}
            className="input-base"
            value={dates.checkIn}
            onChange={(e) => {
                setDates({ ...dates, checkIn: e.target.value });
                setError('');
            }}
          />
        </div>
        <div>
          <label className="label-base">Check-out Date</label>
          <input 
            type="date" 
            min={dates.checkIn || today}
            className="input-base"
            value={dates.checkOut}
            onChange={(e) => {
                setDates({ ...dates, checkOut: e.target.value });
                setError('');
            }}
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button onClick={handleNext} className="btn-primary w-full md:w-auto">
        Continue to Review
      </button>
    </div>
  );
}
