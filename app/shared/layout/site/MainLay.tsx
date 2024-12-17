'use client';

import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface MainLayoutProps {
  children: ReactNode;
  isAuthenticated: boolean;
  userRole: number;
}

export default function MainLay({ children, isAuthenticated, userRole }: MainLayoutProps) {
  const pathname = usePathname();

  const hideSidebar = pathname === '/';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', textTransform: 'none' }}>
      {!hideSidebar && <Sidebar />}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar isAuthenticated={isAuthenticated} rol={userRole} />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            padding: 3,
            marginTop: '64px',
            marginLeft: hideSidebar ? '0' : '70px',
            transition: 'margin-left 0.3s ease',
            backgroundColor: '#f9f9f9',
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
