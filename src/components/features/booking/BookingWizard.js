'use client';

import { useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import StepDateSelection from './steps/StepDateSelection';
import StepReview from './steps/StepReview';
import StepPayment from './steps/StepPayment';
import StepConfirmation from './steps/StepConfirmation';
import api from '@/services/api';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

export default function BookingWizard({ roomId, userId }) {
  const searchParams = useSearchParams();
  // Get initial params
  const initialPrice = parseFloat(searchParams.get('price')) || 0;
  const hotelId = searchParams.get('hotelId') || '';

  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
     checkIn: '',
     checkOut: '',
     totalPrice: 0,
     commission: 0
  });
  
  const containerRef = useRef();

  // Animation when step changes
  useGSAP(() => {
      gsap.fromTo('.step-content', 
          {  x: 50, opacity: 0 },
          {  x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
  }, [step]);

  const handleDateSelect = (dates) => {
      setBookingData((prev) => ({ ...prev, ...dates }));
      setStep(2);
  };

  const handleReviewConfirm = (data) => {
      setBookingData((prev) => ({ ...prev, ...data }));
      setStep(3);
  };

  const handlePaymentSuccess = async () => {
      try {
          // Final Booking Submission
          await api.post('/bookings', {
             room: roomId,
             hotel: hotelId,
             checkIn: bookingData.checkIn,
             checkOut: bookingData.checkOut,
          });
          setStep(4);
      } catch (err) {
      
          console.error("Booking failed", err);
          const errorMessage = err.response?.data?.error || err.message || "Booking failed. Please try again.";
          alert(errorMessage);
      }
  };

  const handleBack = () => setStep(prev => prev - 1);

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 min-h-[500px]">
        {/* Progress Bar */}
        <div className="bg-slate-50 border-b border-slate-200 p-4">
             <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                 <span>Step {step} of 4</span>
                 <span>
                    {step === 1 && 'Dates'}
                    {step === 2 && 'Review'}
                    {step === 3 && 'Payment'}
                    {step === 4 && 'Done'}
                 </span>
             </div>
             <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                 <div 
                    className="h-full bg-blue-600 transition-all duration-500 ease-out" 
                    style={{ width: `${(step / 4) * 100}%` }}
                 ></div>
             </div>
        </div>

        <div className="p-8 step-content">
            {step === 1 && (
                <StepDateSelection 
                    onNext={handleDateSelect} 
                    initialData={bookingData} 
                />
            )}
            {step === 2 && (
                <StepReview 
                    onNext={handleReviewConfirm} 
                    onBack={handleBack} 
                    bookingData={bookingData}
                    roomPrice={initialPrice}
                />
            )}
            {step === 3 && (
                <StepPayment 
                   onNext={handlePaymentSuccess} 
                   onBack={handleBack}
                   total={bookingData.totalPrice}
                />
            )}
            {step === 4 && <StepConfirmation />}
        </div>
    </div>
  );
}
