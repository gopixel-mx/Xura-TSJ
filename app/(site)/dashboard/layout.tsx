import React from 'react';
import { Metadata } from 'next';
import { Sidebar } from '@/app/components/layout';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard Xura',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
