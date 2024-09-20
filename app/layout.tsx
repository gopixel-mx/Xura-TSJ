import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/app/components/layout';
import { CssBaseline, Toolbar } from '@mui/material';

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
        <CssBaseline />
        <Navbar isAuthenticated={isAuthenticated} rol={userRole} />
        <Toolbar />
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
