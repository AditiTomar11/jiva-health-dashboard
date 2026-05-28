'use client';

import React, { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { 
  ArrowLeft, ShoppingBag, Stethoscope, Users, CreditCard, 
  Edit, Plus, Trash2, Mail, Phone, Calendar, User, 
  ShieldAlert, Home, Briefcase, CheckCircle2, Pill, FlaskConical
} from 'lucide-react';
import OrderHistory from '../orders/OrderHistory';
import FamilyManagement from '../family/FamilyManagement';
import Payments from '../payments/Payments';

export default function UserDetail() {
  const { selectedUserId, users, setSelectedUser, togglePrime } = useDashboardStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'payments' | 'family'>('overview');

  const user = users.find(u => u.id === selectedUserId);

  // Fallback fallback mock handling if target data profile index context fields are empty
  const activeUser = user || {
    id: '#1',
    name: 'Alice Williams',
    email: 'alice.williams@email.com',
    phone: '+91 98765 43210',
    dob: '5/15/1990',
    gender: 'Female',
    bloodGroup: 'O+',
    role: 'Patient',
    status: 'Active',
    joinedDate: '1/15/2025',
    lastActive: '4/2/2026',
    appointmentsCount: 5,
    isPrime: false
  };

  const initials = (activeUser.name || '').split(' ').map(n => n[0] || '').join('').toUpperCase() || 'NA';

  return (
    <div className="p-8 bg-slate-50/50 min-h-full font-sans text-slate-800 space-y-6">
      
      {/* 1. Back Navigation Tab String Link */}
      <button 
        onClick={() => setSelectedUser(null)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to User Management</span>
      </button>

      {/* 2. Top Profile Banner Overview Layout Card */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-lg tracking-wide border border-teal-200 shadow-sm">
            {initials}
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">{activeUser.name}</h2>
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200/50">{activeUser.status}</span>
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200/40">{activeUser.role}</span>
              <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200/40">Normal User</span>
              <span className="text-slate-400 font-medium ml-1">ID: {activeUser.id}</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400 pt-0.5">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Joined {activeUser.joinedDate}</span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Last active {activeUser.lastActive}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls Side items */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => activeUser.id && togglePrime(activeUser.id)}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg inline-flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <span className="text-[10px] uppercase font-black">👑</span> Upgrade to Prime
          </button>
          <select className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl focus:outline-none cursor-pointer min-w-[120px] shadow-sm">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* 3. Numerical Performance Metric Grid Plates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-1">
        {[
          { label: 'Total Orders', value: '6', icon: ShoppingBag, bg: 'bg-blue-50 text-blue-600' },
          { label: 'Total Booking & Appointment', value: activeUser.appointmentsCount, icon: Stethoscope, bg: 'bg-teal-50 text-teal-600' },
          { label: 'Total Family Member', value: '10', icon: Users, bg: 'hidden' },
          { label: 'Total Spent', value: '₹24500.00', icon: CreditCard, bg: 'bg-emerald-50 text-emerald-600', isLarge: true }
        ].map((card, i) => (
          <div key={i} className="bg-white border border-slate-200/60 p-5 rounded-2xl flex items-center justify-between h-24 shadow-sm">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 tracking-normal block max-w-[140px] leading-tight">{card.label}</span>
              <span className={`font-bold ${card.isLarge ? 'text-xl text-slate-800' : 'text-2xl text-slate-700'} ${i === 1 ? 'text-emerald-600':''}`}>{card.value}</span>
            </div>
            {card.icon && card.bg !== 'hidden' && (
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.bg}`}>
                <card.icon className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 4. Tab Segment Header Selectors */}
      <div className="border-b border-slate-200 flex gap-2 items-center pt-2">
        {[
          { id: 'overview', label: 'Overview', icon: User },
          { id: 'orders', label: 'Orders & Bookings', icon: ShoppingBag },
          { id: 'payments', label: 'Payments', icon: CreditCard },
          { id: 'family', label: 'Family Members', icon: Users },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === tab.id 
                ? 'border-emerald-600 text-emerald-700 font-extrabold' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 5. Dynamically Switched Content Shell Area Panels */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Top Panel Dual Content split box structure splits layout blocks */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Personal Info Box Column (7 cols wide) */}
            <div className="lg:col-span-7 bg-white border border-slate-200/70 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-800 text-sm">Personal Information</h3>
                <button className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs inline-flex items-center gap-1.5 shadow-sm transition-colors">
                  <Edit className="w-3.5 h-3.5 text-slate-400" /> Edit
                </button>
              </div>

              <div className="text-xs space-y-4 font-semibold text-slate-700">
                <div className="flex items-center"><span className="w-28 text-slate-400 flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Email:</span> <span className="text-slate-800 font-medium">{activeUser.email}</span></div>
                <div className="flex items-center"><span className="w-28 text-slate-400 flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Phone:</span> <span className="text-slate-800 font-medium">{activeUser.phone}</span></div>
                <div className="flex items-center"><span className="w-28 text-slate-400 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Date of Birth:</span> <span className="text-slate-800 font-medium">{activeUser.dob}</span></div>
                <div className="flex items-center"><span className="w-28 text-slate-400 flex items-center gap-2"><User className="w-3.5 h-3.5" /> Gender:</span> <span className="text-slate-800 font-medium">{activeUser.gender}</span></div>
                <div className="flex items-center"><span className="w-28 text-slate-400 flex items-center gap-2"><ShieldAlert className="w-3.5 h-3.5" /> Blood Group:</span> <span className="text-slate-800 font-medium">{activeUser.bloodGroup}</span></div>
              </div>
            </div>

            {/* Addresses Data Column (5 cols wide) */}
            <div className="lg:col-span-5 bg-white border border-slate-200/70 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-800 text-sm">Addresses</h3>
                <button className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs inline-flex items-center gap-1.5 shadow-sm transition-colors">
                  <Plus className="w-3.5 h-3.5 text-slate-400" /> Add
                </button>
              </div>

              {/* Individual Embedded Address Row Elements matching layout blocks */}
              <div className="space-y-3.5">
                {[
                  { id: 1, type: 'Home', isDefault: true, icon: Home, bg: 'bg-teal-50 text-teal-600' },
                  { id: 2, type: 'Home', isDefault: false, icon: Briefcase, bg: 'bg-teal-50 text-teal-600' }
                ].map(addr => (
                  <div key={addr.id} className="bg-slate-50/70 border border-slate-200/60 rounded-xl p-4 flex gap-3.5 justify-between items-start">
                    <div className="flex gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${addr.bg} shrink-0`}>
                        <addr.icon className="w-4 h-4" />
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="font-bold text-slate-800 flex items-center gap-2">
                          <span>{addr.type}</span>
                          {addr.isDefault && <span className="bg-slate-200 text-slate-500 font-bold text-[9px] px-1.5 py-0.2 rounded uppercase">Default</span>}
                        </div>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-[240px]">
                          Flat 301, Sunshine Apartments, MG Road Mumbai, Maharashtra 400001 <br/>India
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-700 shadow-sm transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-red-600 shadow-sm transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          
          <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-3">Recent Activity</h3>
            
            <div className="divide-y divide-slate-100">
              {[
                { title: 'Consultation Completed', desc: 'with Dr. Sarah Johnson - General Checkup', label: '2 days ago', icon: CheckCircle2, bg: 'bg-emerald-50 text-emerald-600' },
                { title: 'Medicine Order Placed', desc: 'Order #1002 - Amoxicillin 250mg', label: '1 day ago', icon: Pill, bg: 'bg-blue-50 text-blue-600' },
                { title: 'Lab Test Scheduled', desc: 'Complete Blood Count - City Lab', label: '3 days ago', icon: FlaskConical, bg: 'bg-purple-50 text-purple-600' },
              ].map((activity, idx) => (
                <div key={idx} className="flex gap-4 py-4 first:pt-1 last:pb-1 items-start">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${activity.bg}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="text-xs space-y-0.5">
                    <h4 className="font-bold text-slate-800">{activity.title}</h4>
                    <p className="text-slate-400 font-medium">{activity.desc}</p>
                    <span className="text-[10px] text-slate-400 font-semibold block pt-0.5">{activity.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Basic static handlers for secondary layout tabs */}
      {activeTab === 'orders' && <OrderHistory />}
      {activeTab === 'payments' && <Payments />}
      {activeTab === 'family' && <FamilyManagement />}

    </div>
  );
}