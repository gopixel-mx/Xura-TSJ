import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Sidebar } from '@/app/shared/layout';

export const metadata: Metadata = {
  title: 'Modulos',
  description: 'Modulos Xura',
};

export default function ModulosLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
