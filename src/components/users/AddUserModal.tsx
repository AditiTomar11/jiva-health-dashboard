'use client';

import React, { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { X } from 'lucide-react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
  const addUser = useDashboardStore((state) => state.addUser);

  // Form Field States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Select gender');
  const [bloodGroup, setBloodGroup] = useState('Select blood group');
  const [street, setStreet] = useState('');
  const [zip, setZip] = useState('400001');
  const [city, setCity] = useState('Mumbai');
  const [stateName, setStateName] = useState('Select state');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to global Zustand store
    addUser({
      name,
      email,
      phone,
      dob,
      gender: gender === 'Select gender' ? 'Male' : gender,
      bloodGroup: bloodGroup === 'Select blood group' ? 'O+' : bloodGroup,
      role: 'Patient', // default role placement
      status: 'Active',
      isPrime: false
    });

    // Clear form and close modal overlay safely
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dim backdrop layer matching mockup focus depth */}
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[1px]" onClick={onClose} />

      {/* Main Modal White Board Window container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto relative z-10 p-7 font-sans text-slate-800 animate-fadeIn">
        
        {/* Header Block with X exit button layout matching Figma */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-950">Add New User</h2>
            <p className="text-xs text-slate-400 mt-0.5">Create a new user account with role and permissions</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Interactive Fields Form Sheet */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
          
          {/* Two Column Grid Block 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label>Full Name <span className="text-red-500">*</span></label>
              <input 
                type="text" required placeholder="e.g., John Smith" value={name} onChange={e => setName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg focus:outline-none placeholder-slate-300 font-medium text-slate-800"
              />
            </div>
            <div className="space-y-1.5">
              <label>Email <span className="text-red-500">*</span></label>
              <input 
                type="email" required placeholder="john.smith@email.com" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg focus:outline-none placeholder-slate-300 font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Two Column Grid Block 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label>Phone Number</label>
              <input 
                type="tel" placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg focus:outline-none placeholder-slate-300 font-medium text-slate-800"
              />
            </div>
            <div className="space-y-1.5">
              <label>Date of Birth</label>
              <input 
                type="date" value={dob} onChange={e => setDob(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg focus:outline-none text-slate-600 font-medium cursor-pointer"
              />
            </div>
          </div>

          {/* Two Column Grid Block 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label>Gender</label>
              <select value={gender} onChange={e => setGender(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg focus:outline-none font-medium text-slate-700 cursor-pointer">
                <option>Select gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label>Blood Group</label>
              <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg focus:outline-none font-medium text-slate-700 cursor-pointer">
                <option>Select blood group</option>
                <option>A+</option><option>B+</option><option>O+</option><option>AB+</option>
                <option>A-</option><option>B-</option><option>O-</option><option>AB-</option>
              </select>
            </div>
          </div>

          {/* Full Width Area Box */}
          <div className="space-y-1.5">
            <label>Area Detail</label>
            <input 
              type="text" placeholder="House/Flat No., Building Name, Street" value={street} onChange={e => setStreet(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg focus:outline-none placeholder-slate-300 font-medium text-slate-800"
            />
          </div>

          {/* Location Details Sub-Grid Layout Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label>Pin Code</label>
              <input 
                type="text" placeholder="400001" value={zip} onChange={e => setZip(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg focus:outline-none font-medium text-slate-800"
              />
            </div>
            <div className="space-y-1.5">
              <label>City</label>
              <input 
                type="text" placeholder="Mumbai" value={city} onChange={e => setCity(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg focus:outline-none font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Final Location Details Sub-Grid Layout Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label>State</label>
              <select value={stateName} onChange={e => setStateName(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg focus:outline-none font-medium text-slate-700 cursor-pointer">
                <option>Select state</option>
                <option>Maharashtra</option><option>Uttar Pradesh</option><option>Delhi</option><option>Karnataka</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label>Country</label>
              <input 
                type="text" disabled value="India"
                className="w-full p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg text-slate-800 font-medium cursor-not-allowed"
              />
            </div>
          </div>

          {/* Action Trigger Buttons Row Container matching mockup layout bottom positions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-lg font-bold text-slate-500 hover:bg-slate-50 transition-all text-xs"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold shadow-sm transition-all text-xs active:scale-95"
            >
              Add User
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}