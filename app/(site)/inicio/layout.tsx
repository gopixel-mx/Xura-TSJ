import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Inicio Xura',
};

export default function InicioLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}
