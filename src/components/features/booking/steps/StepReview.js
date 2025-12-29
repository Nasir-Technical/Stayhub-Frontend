'use client';

export default function StepReview({ onNext, onBack, bookingData, roomPrice }) {
  const checkIn = new Date(bookingData.checkIn);
  const checkOut = new Date(bookingData.checkOut);
  // Calculate nights difference
  const diffTime = Math.abs(checkOut - checkIn);
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  const subtotal = roomPrice * nights;
  const commission = subtotal * 0.10; // 10% Commission
  const total = subtotal + commission;

  const handleSubmit = () => {
    onNext({
      ...bookingData,
      totalPrice: total,
      nights,
      commission
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Review Booking</h2>
      
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
          <div className="flex justify-between border-b border-slate-200 pb-4">
             <span className="text-slate-600">Dates</span>
             <span className="font-medium text-slate-900">{bookingData.checkIn} to {bookingData.checkOut}</span>
          </div>
          <div className="flex justify-between items-center">
             <span className="text-slate-600 font-medium">Duration</span>
             <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">{nights} Nights</span>
          </div>

          <div className="pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                  <span className="text-slate-500">${roomPrice} x {nights} nights</span>
                  <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                  <span className="text-slate-500">StayHub Service Fee (10%)</span>
                  <span className="font-medium text-slate-900">${commission.toFixed(2)}</span>
              </div>
          </div>
          
          <div className="border-t border-slate-300 pt-4 flex justify-between items-end">
              <span className="text-lg font-bold text-slate-900">Total</span>
              <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
          </div>
      </div>

      <div className="flex gap-4">
          <button onClick={onBack} className="btn-outline flex-1">Back</button>
          <button onClick={handleSubmit} className="btn-primary flex-1">Confirm & Pay</button>
      </div>
    </div>
  );
}
