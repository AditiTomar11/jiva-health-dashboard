'use client';

import React from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import UserList from '../users/Userlist';
import UserDetail from '../users/UserDetail';
import OrderDetailView from '../orders/OrderDetail';

export default function Dashboard() {
  const currentScreen = useDashboardStore((state) => state.currentScreen);

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans text-slate-900 antialiased">
      {/* Sidebar Panel Navigation */}
      <Sidebar />

      {/* Workspace content wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto bg-white transition-all duration-150">
          {currentScreen === 'LIST' && <UserList />}
          {currentScreen === 'DETAIL' && <UserDetail />}
          {currentScreen === 'ORDER_DETAIL' && <OrderDetailView />}
        </main>
      </div>
    </div>
  );
}