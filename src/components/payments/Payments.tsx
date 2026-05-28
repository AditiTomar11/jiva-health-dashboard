'use client';

import React from 'react';
import { CreditCard as CreditCardIcon } from 'lucide-react';

export default function Payments() {
  // Mock dataset matching your payments page screenshot exactly
  const paymentHistoryData = [
    { id: 1, title: 'Consultation Fee', status: 'Completed', subtitle: 'Paracetamol 500mg - 30 tablets', date: 'March 28, 2026', basePrice: '₹250.00', displayPrice: '₹ 150.00', statusVariant: 'bg-emerald-50 text-emerald-700 border-emerald-200/50' },
    { id: 2, title: 'Lab Test', status: 'Completed', subtitle: 'Paracetamol 500mg - 30 capsules', date: 'March 28, 2026', basePrice: '₹250.00', displayPrice: '₹ 80.00', statusVariant: 'bg-emerald-50 text-emerald-700 border-emerald-200/50' },
    { id: 3, title: 'Medicine Order', status: 'Pending', subtitle: 'Paracetamol 500mg - 30 capsules', date: 'March 28, 2026', basePrice: '₹250.00', displayPrice: '₹ 45.00', statusVariant: 'bg-amber-50 text-amber-700 border-amber-200/50' }
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5 animate-fadeIn text-slate-800">
      <h3 className="text-base font-bold text-slate-900 tracking-tight pl-1">Order History</h3>
      
      <div className="space-y-4">
        {paymentHistoryData.map((payment) => (
          <div 
            key={payment.id}
            className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
          >
            {/* Left side: Soft Green Credit Card Icon Plate + Core Details Metadata */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-emerald-50 text-emerald-600 border border-emerald-100/60 rounded-xl flex items-center justify-center shrink-0">
                <CreditCardIcon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-800 tracking-tight">{payment.title}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${payment.statusVariant}`}>
                    {payment.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">{payment.subtitle}</p>
                <div className="text-[11px] text-slate-400 font-medium pt-0.5 flex items-center gap-1.5">
                  <span>{payment.date}</span>
                  <span className="text-slate-300 font-bold">&bull;</span>
                  <span className="text-slate-500 font-semibold">{payment.basePrice}</span>
                </div>
              </div>
            </div>

            {/* Right side: Bold Aggregate Final Price display alignment */}
            <div className="text-right pr-2">
              <span className="text-base font-extrabold text-slate-900 tracking-tight">
                {payment.displayPrice}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}