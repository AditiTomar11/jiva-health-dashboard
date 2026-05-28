'use client';

import React from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { 
  LayoutDashboard, Building2, Users, ShieldAlert, 
  Stethoscope, TestTube2, Pill, Ambulance, 
  Briefcase, FileText, UserCheck, Settings 
} from 'lucide-react';

export default function Sidebar() {
  const { currentScreen, setScreen, setSelectedUser } = useDashboardStore();

  const menuItems = [
    { id: 'dash', label: 'Dashboard', icon: LayoutDashboard, disabled: true },
    { id: 'org', label: 'Organization', icon: Building2, disabled: true },
    { id: 'LIST', label: 'User Management', icon: Users, disabled: false },
    { id: 'srv', label: 'Services', icon: ShieldAlert, disabled: true, hasSub: true },
    { id: 'cons', label: 'Consultation', icon: Stethoscope, disabled: true },
    { id: 'lab', label: 'Lab test Booking', icon: TestTube2, disabled: true },
    { id: 'med', label: 'Medicine Orders', icon: Pill, disabled: true },
    { id: 'amb', label: 'Ambulance booking', icon: Ambulance, disabled: true },
    { id: 'vend', label: 'Vendor & Partners', icon: Briefcase, disabled: true },
    { id: 'rep', label: 'Report', icon: FileText, disabled: true },
    { id: 'acc', label: 'User Access', icon: UserCheck, disabled: true },
    { id: 'set', label: 'Setting', icon: Settings, disabled: true },
  ];

  return (
    <aside className="w-64 bg-white h-full flex flex-col border-r border-slate-200/80">
      {/* Figma Branded Logo Container Section */}
      <div className="h-20 flex items-center justify-center px-8 border-b border-slate-100">
      <img 
         src="../Images/logo.png" 
         alt="Jiva Health Logo" 
          className="w-auto h-30 object-contain" 
          />
      </div>

      {/* Navigation System List */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = currentScreen === 'LIST' && item.id === 'LIST';
          return (
            <button
              key={item.id}
              disabled={item.disabled}
              onClick={() => {
                setSelectedUser(null);
                setScreen('LIST');
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                isActive 
                  ? 'bg-emerald-50 text-emerald-800 font-bold' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-80'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.hasSub && (
                <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          );
        })}
      </nav>

      {/* Admin User Footer Profile Section */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <div className="flex items-center gap-3 p-2">
          <div className="w-9 h-9 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-xs shadow-sm">
            AD
          </div>
          <div className="truncate">
            <p className="text-xs font-bold text-slate-800">Admin User</p>
            <p className="text-[10px] text-slate-400 font-medium truncate">Admin@healthcare.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}