'use client';

import React from 'react';
import { ShoppingBag, Stethoscope, FlaskConical, Ambulance, Trash2 } from 'lucide-react';

export default function OrderHistory() {
  // Mock dataset matching your screenshots exactly
  const activeOrders = [
    { id: '#1', title: 'Order #1', status: 'Delivered', subtitle: 'Paracetamol 500mg - 30 tablets', date: 'March 28, 2026', price: '₹250.00', statusVariant: 'bg-emerald-50 text-emerald-700 border-emerald-200/50' },
    { id: '#2', title: 'Order #1', status: 'order is delivered', subtitle: 'Paracetamol 500mg - 30 capsules', date: 'March 28, 2026', price: '₹250.00', statusVariant: 'bg-emerald-50 text-emerald-700 border-emerald-200/50' },
    { id: '#3', title: 'Order #1', status: 'er has been d', subtitle: 'Paracetamol 500mg - 30 capsules', date: 'March 28, 2026', price: '₹250.00', statusVariant: 'bg-emerald-50 text-emerald-700 border-emerald-200/50' },
  ];

  const upcomingBookings = [
    { id: '#4', title: 'General Checkup', subtitle: 'Dr. Sarah Johnson', status: 'Confirmed', date: '4/5/2026', time: '10:00 AM', price: '₹250.00', icon: Stethoscope, bg: 'bg-teal-50 text-teal-600', statusVariant: 'bg-emerald-50 text-emerald-700 border-emerald-200/50' },
    { id: '#5', title: 'Complete Blood Count', subtitle: 'Paracetamol 500mg - 30 capsules', status: 'Scheduled', date: 'March 28, 2026', time: '', price: '₹250.00', icon: FlaskConical, bg: 'bg-pink-50 text-pink-600', statusVariant: 'bg-blue-50 text-blue-700 border-blue-200/50' }
  ];

  const pastBookings = [
    { id: '#6', title: 'Order #1', subtitle: 'City Ambulance Service', status: 'Your order has been delivered.', date: '3/20/2026', time: '02:15 PM', price: '₹250.00', icon: Ambulance, bg: 'bg-red-50 text-red-500' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800">
      
      {/* SECTION 1: Active Order History Line Items */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight pl-1">Order History</h3>
        {activeOrders.map((order, idx) => (
          <div 
            key={idx}
            className="bg-white border border-slate-200/70 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-teal-50 text-teal-600 border border-teal-100/60 rounded-xl flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-800 tracking-tight">{order.title}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide border ${order.statusVariant}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{order.subtitle}</p>
                <div className="text-[11px] text-slate-400 font-medium pt-0.5 flex items-center gap-3">
                  <span>{order.date}</span>
                  <span className="text-slate-800 font-bold">{order.price}</span>
                </div>
              </div>
            </div>

            {/* Form Settings Select Dropdowns right side row alignment */}
            <div className="flex items-center gap-2">
              <select className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none cursor-pointer min-w-[110px]">
                <option>Delivered</option>
                <option>Your order</option>
              </select>
              <button className="p-2 bg-white border border-slate-200 rounded-xl text-red-500 hover:bg-red-50 transition-colors shadow-sm shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 2: Upcoming Bookings Grid Field Segment */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight pl-1">Upcoming Bookings</h3>
        
        <div className="space-y-3">
          {upcomingBookings.map((booking, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200/70 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${booking.bg}`}>
                  <booking.icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-800 tracking-tight">{booking.title}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wide ${booking.statusVariant}`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{booking.subtitle}</p>
                  <div className="text-[11px] text-slate-400 font-medium pt-0.5 flex items-center gap-2">
                    <span>{booking.date}</span>
                    {booking.time && <span>{booking.time}</span>}
                    <span className="text-slate-300 font-bold">&bull;</span>
                    <span className="text-slate-800 font-bold">{booking.price}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none cursor-pointer min-w-[100px]">
                  <option>{booking.status.toLowerCase()}</option>
                </select>
                <select className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none cursor-pointer min-w-[90px]">
                  <option>Cancel</option>
                </select>
                <button className="p-2 bg-white border border-slate-200 rounded-xl text-red-500 hover:bg-red-50 transition-colors shadow-sm shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Past Bookings Segment */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight pl-1">Past Bookings</h3>
        
        {pastBookings.map((past, idx) => (
          <div 
            key={idx}
            className="bg-white border border-slate-200/70 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${past.bg}`}>
                <past.icon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-800 tracking-tight">{past.title}</h4>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/40 text-[10px] font-bold px-2 py-0.5 rounded-md font-sans">
                    {past.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{past.subtitle}</p>
                <div className="text-[11px] text-slate-400 font-medium pt-0.5 flex items-center gap-2">
                  <span>{past.date}</span>
                  <span>{past.time}</span>
                  <span className="text-slate-300 font-bold">&bull;</span>
                  <span className="text-slate-800 font-bold">{past.price}</span>
                </div>
              </div>
            </div>

            <div>
              <button className="p-2 bg-white border border-slate-200 rounded-xl text-red-500 hover:bg-red-50 transition-colors shadow-sm shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}