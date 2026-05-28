'use client';

import React, { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Search, UserPlus, Eye, Edit3, Mail, Phone, Calendar } from 'lucide-react';
import AddUserModal from './AddUserModal';

export default function UserList() {
  const { users, setSelectedUser, togglePrime } = useDashboardStore();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Bulletproof fallback filtering mechanism
  const filteredUsers = users.filter(user => {
    const nameStr = (user.name || '').toLowerCase();
    const emailStr = (user.email || '').toLowerCase();
    const phoneStr = String(user.phone || ''); // Forces to string if it's stored as a number
    const currentSearch = search.toLowerCase();

    return (
      nameStr.includes(currentSearch) ||
      emailStr.includes(currentSearch) ||
      phoneStr.includes(currentSearch)
    );
  });

  // Prevents clicking a button or link from triggering the row click action
  const handleInnerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="space-y-6 p-8 bg-slate-50/50 min-h-full">
      {/* Figma Title & Primary Button Row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">User Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage user accounts and permissions</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg inline-flex items-center gap-2 shadow-sm transition-all active:scale-95"
        >
          <UserPlus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Numerical Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total User', value: users.length, color: 'text-slate-800' },
          { label: 'Prime User', value: users.filter(u => u.isPrime).length, color: 'text-emerald-600' },
          { label: 'Non-Prime User', value: users.filter(u => !u.isPrime).length, color: 'text-emerald-600' },
          { label: 'Total Family members', value: 49, color: 'text-emerald-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200/60 p-5 rounded-2xl flex flex-col justify-between h-28 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</span>
            <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Custom Control Input Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by patient, doctor, or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 text-xs border border-slate-200/80 bg-white rounded-xl focus:outline-none placeholder-slate-400 text-slate-800 shadow-sm"
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <select className="bg-white border border-slate-200 text-slate-500 text-xs font-bold px-4 py-2.5 rounded-xl focus:outline-none cursor-pointer min-w-[130px] shadow-sm">
            <option>All Status</option>
            <option>Male</option>
            <option>Female</option>
            <option>13-17 years</option>
            <option>18-35 years</option>
            <option>36-59 years</option>
            <option>60+ years</option>
          </select>
          <select className="bg-white border border-slate-200 text-slate-500 text-xs font-bold px-4 py-2.5 rounded-xl focus:outline-none cursor-pointer min-w-[130px] shadow-sm">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* High-Fidelity Interactive Data Row Cards */}
      <div className="space-y-4 pt-2">
        {filteredUsers.map((user) => (
          <div 
            key={user.id} 
            onClick={() => setSelectedUser(user.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedUser(user.id)}
            className="bg-white border border-slate-200/70 rounded-2xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm hover:border-slate-400 hover:bg-slate-50/40 transition-all cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            {/* Column 1: Persona Avatars & Identity */}
            <div className="flex items-center gap-4 min-w-[220px]">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs tracking-wider shadow-inner uppercase">
                {user.name ? user.name.split(' ').map((n: string) => n[0]).join('') : 'U'}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm tracking-tight">{user.name}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200/40">{user.role}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>{user.status}</span>
                </div>
                <div className="text-[10px] font-medium text-slate-400 mt-1">Normal User</div>
              </div>
            </div>

            {/* Column 2: Explicit Contact Details */}
            <div onClick={handleInnerClick} className="space-y-1 text-xs text-slate-500 font-medium min-w-[220px]">
              <div className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> 
                <a href={`mailto:${user.email}`}>{user.email || 'No email added'}</a>
              </div>
              <div className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> 
                <a href={`tel:${user.phone}`}>{user.phone || 'No phone added'}</a>
              </div>
            </div>

            {/* Column 3: Timeline Dates */}
            <div className="space-y-1 text-xs font-medium min-w-[160px]">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> 
                <span>Joined <span className="font-semibold text-slate-800">{user.joinedDate}</span></span>
              </div>
              <div className="text-[10px] text-slate-400 pl-5">Last: {user.lastActive}</div>
            </div>

            {/* Column 4: Engagement Count Metric */}
            <div className="min-w-[100px]">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Appointments</span>
              <span className="text-2xl font-bold text-blue-600 mt-0.5 block">{user.appointmentsCount || 0}</span>
            </div>

            {/* Column 5: Actions Controls Panel Group */}
            <div onClick={handleInnerClick} className="flex items-center gap-2 w-full lg:w-auto justify-end">
              <button 
                onClick={() => togglePrime(user.id)}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition-all border shadow-sm ${
                  user.isPrime 
                    ? 'bg-slate-50 text-slate-600 border-slate-200' 
                    : 'bg-orange-500 hover:bg-orange-600 text-white border-transparent'
                }`}
              >
                {user.isPrime ? 'Downgrade Prime' : 'Upgrade to Prime'}
              </button>
              <button 
                onClick={() => setSelectedUser(user.id)}
                className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold px-3 py-2 rounded-lg text-xs inline-flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-slate-400" /> View
              </button>
              <button className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold px-3 py-2 rounded-lg text-xs inline-flex items-center gap-1.5 shadow-sm transition-colors">
                <Edit3 className="w-3.5 h-3.5 text-slate-400" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}