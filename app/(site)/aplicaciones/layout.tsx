import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Sidebar } from '@/app/shared/layout';

export const metadata: Metadata = {
  title: 'Aplicaciones',
  description: 'Aplicaciones Xura',
};

export default function AplicacionesLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
