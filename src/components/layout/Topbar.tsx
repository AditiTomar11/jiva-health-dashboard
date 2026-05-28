'use client';

import React from 'react';
import { Search, Moon, Bell } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between z-20">
      
      {/* Left Area: Static Sidebar Collapse Icon Asset placeholder */}
      <div className="flex items-center">
        <button className="p-1 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h12M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Center Area: High-Fidelity Centered Global Search Input Bar */}
      <div className="flex-1 max-w-xl mx-auto px-4">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            disabled
            className="w-full pl-11 pr-4 py-2 text-sm border border-slate-200 bg-white rounded-xl focus:outline-none placeholder-slate-400 font-normal text-slate-800 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Right Area: Action Icons (Dark Mode, Notifications, Avatar) */}
      <div className="flex items-center gap-3.5">
        {/* Dark Mode Trigger */}
        <button className="p-2 rounded-xl text-slate-700 border border-slate-100 hover:bg-slate-50 transition-colors">
          <Moon className="w-4 h-4" />
        </button>

        {/* Notification Bell with Red Numeric Alert Drop Counter Indicator */}
        <button className="p-2 rounded-xl text-slate-700 border border-slate-100 hover:bg-slate-50 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            1
          </span>
        </button>

        {/* Profile Circle Initial Identifier */}
        <div className="w-9 h-9 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-xs shadow-sm border border-emerald-900 cursor-pointer select-none ml-1">
          AD
        </div>
      </div>

    </header>
  );
}