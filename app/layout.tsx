// app/layout.tsx
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { CssBaseline } from '@mui/material';
import AuthProvider from '@/app/context/AuthProvider';
import { MainLay } from '@/app/shared/layout';

export const metadata: Metadata = {
  title: 'Xura',
  description: 'Control Escolar Xura TSJ',
  keywords: ['login, tsj'],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <CssBaseline />
          <MainLay>
            {children}
          </MainLay>
        </AuthProvider>
      </body>
    </html>
  );
}
