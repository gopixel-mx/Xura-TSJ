import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/app/components/layout';

export const metadata: Metadata = {
  title: 'Xura',
  description: 'Control Escolar Xura TSJ',
  keywords: ['login, tsj'],
};

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
  const isAuthenticated = true;
  const userRole = 1;
  return (
    <html lang='en'>
      <body>
        <Navbar isAuthenticated={isAuthenticated} rol={userRole} />
        <div style={{ paddingTop: '64px' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
