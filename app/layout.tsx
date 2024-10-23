import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/app/shared/layout';
import { CssBaseline, Toolbar } from '@mui/material';
import AuthProvider from '@/app/context/AuthProvider';

export const metadata: Metadata = {
  title: 'Xura',
  description: 'Control Escolar Xura TSJ',
  keywords: ['login, tsj'],
};

export default function RootLayout({ children }: {
  children: ReactNode
}) {
  const isAuthenticated = true;
  const userRole = 1;

  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <CssBaseline />
          <Navbar isAuthenticated={isAuthenticated} rol={userRole} />
          <Toolbar />
          <div>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
