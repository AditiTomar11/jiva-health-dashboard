'use client';

import React from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { ArrowLeft, Truck, MapPin, Package, ShieldCheck } from 'lucide-react';

export default function OrderDetailView() {
  const { selectedOrderId, orders, setSelectedOrder } = useDashboardStore();
  const order = orders.find(o => o.id === selectedOrderId);

  if (!order) return <p className="text-slate-500">Target transaction manifest has tracking conflicts.</p>;

  return (
    <div className="space-y-6">
      <button onClick={() => setSelectedOrder(null)} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Return to Profile Scope
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Breakdown Items Summary */}
        <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex justify-between items-start border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2"><Package className="w-5 h-5 text-blue-600" /> Manifest Line Items</h3>
              <p className="text-xs text-slate-400 mt-0.5">Tracking Bundle: <span className="font-mono">{order.id}</span></p>
            </div>
            <span className="bg-blue-50 text-blue-700 border border-blue-200 font-bold px-3 py-1 rounded text-xs tracking-wide uppercase">{order.status}</span>
          </div>
          
          <div className="py-2 text-slate-700 text-sm font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
            {order.items}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100 font-bold text-base">
            <span className="text-slate-500 font-medium">Aggregate Total Charge</span>
            <span className="text-xl text-slate-900">₹{order.totalAmount}</span>
          </div>
        </div>

        {/* Spatial and Billing Side Metadata Panels */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-3.5">
            <h4 className="font-bold text-sm flex items-center gap-2 border-b border-slate-50 pb-2 text-slate-700"><MapPin className="w-4 h-4 text-slate-400" /> Delivery Target Location</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">{order.shippingAddress}</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-3.5">
            <h4 className="font-bold text-sm flex items-center gap-2 border-b border-slate-50 pb-2 text-slate-700"><ShieldCheck className="w-4 h-4 text-green-500" /> Payment Audit Trail</h4>
            <div className="text-xs space-y-1.5 text-slate-500">
              <div className="flex justify-between"><span className="font-medium">Channel:</span> <span className="font-bold text-slate-700">{order.paymentMethod}</span></div>
              <div className="flex justify-between"><span className="font-medium">Status Gateway:</span> <span className="text-green-600 font-bold uppercase">{order.paymentStatus}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}