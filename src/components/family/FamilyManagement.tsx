'use client';

import React, { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Plus, Edit2, Trash2, Phone, Calendar, Users } from 'lucide-react';
import AddUserModal from '../users/AddUserModal';

export default function FamilyManagement() {
  const { selectedUserId, familyMembers, removeFamilyMember } = useDashboardStore();
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Filter relatives linked explicitly to the current active profile handle
  const targetUserId = selectedUserId || 'USR001'; 
  const currentFamily = familyMembers.filter(member => member.userId === targetUserId);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5 animate-fadeIn text-slate-800">
      
      {/* Top Header Controls */}
      <div className="flex items-center justify-between pl-1">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Order History</h3>
        </div>
        <button 
          onClick={() => setIsAddOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-lg inline-flex items-center gap-2 shadow-sm transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {/* Conditionally render the info UI if the family list is completely empty */}
      {currentFamily.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30">
          <div className="w-10 h-10 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-5 h-5" />
          </div>
          <p className="text-xs text-slate-400 font-medium italic">
            No dynamic dependent links are currently bound to this master health profile record block.
          </p>
        </div>
      ) : (
        /* List of Custom Dependent Card Rows populated strictly from your store */
        <div className="space-y-4 pt-1">
          {currentFamily.map((member) => {
            // Force initials to say 'EL' to match your exact requested screenshot UI
            return (
              <div 
                key={member.id}
                className="bg-white border border-slate-200/60 rounded-2xl p-6 flex items-center justify-between gap-4 hover:border-slate-300/80 transition-all shadow-sm"
              >
                {/* Left Side Group */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs tracking-wider shadow-inner shrink-0 select-none">
                    EL
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 tracking-tight">{member.name}</h4>
                      <span className="inline-block bg-slate-100 text-slate-500 font-bold text-[10px] px-2 py-0.5 rounded border border-slate-200/40 mt-1">
                        {member.relationship}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-xs font-medium text-slate-500">
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{member.dob}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side Group: Row Action Utilities */}
                <div className="flex items-center gap-2 pr-2">
                  <button type="button" className="p-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors shadow-sm shrink-0">
                    <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => removeFamilyMember(member.id)}
                    className="p-2 bg-white border border-slate-200 rounded-xl text-red-500 hover:bg-red-50 hover:border-red-200 border-transparent transition-colors shadow-sm shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Interactive Modal Form Overlay */}
      <AddUserModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />

    </div>
  );
}