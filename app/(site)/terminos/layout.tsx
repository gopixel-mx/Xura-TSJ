import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terminos',
  description: 'Terminos y Condiciones Xura',
};

export default function TerminosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1>Términos y condiciones</h1>
      {children}
    </>
  );
}
