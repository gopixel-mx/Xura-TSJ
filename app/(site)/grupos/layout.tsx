import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Sidebar } from '@/app/shared/layout';

export const metadata: Metadata = {
  title: 'Grupos',
  description: 'Grupos Xura',
};

export default function GruposLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
