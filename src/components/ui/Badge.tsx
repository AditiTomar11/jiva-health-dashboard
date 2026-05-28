import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'prime';
}

export default function Badge({ children, variant = 'neutral' }: BadgeProps) {
  const styles = {
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    success: 'bg-green-50 text-green-700 border border-green-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-red-50 text-red-700 border border-red-200',
    prime: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold border border-orange-600 tracking-wide uppercase shadow-sm',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${styles[variant]}`}>
      {children}
    </span>
  );
}