'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  AppBar, Toolbar, Button, Box,
} from '@mui/material';

interface User {
  isAuthenticated: boolean;
  rol: number;
}

export default function Navbar({ isAuthenticated, rol }: User) {
  const backgroundColor = 'rgb(50, 22, 155)';

  const handleLogout = () => {
    localStorage.removeItem('authToken');
  };

  return (
    <AppBar position='fixed' sx={{ backgroundColor, width: '100%' }}>
      <Toolbar sx={{ minHeight: 64 }}>
        <Link href='/dashboard' passHref>
          <Box sx={{
            display: 'flex', alignItems: 'center', cursor: 'pointer',
          }}
          >
            <Image
              src='/logo-blanco.svg'
              alt='Logo'
              width={100}
              height={50}
              priority
            />
          </Box>
        </Link>
        <Box sx={{ display: 'flex', gap: 2, marginLeft: 'auto' }}>
          {isAuthenticated && rol === 1 ? (
            <Link href='/' passHref>
              <Button
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
                onClick={handleLogout}
              >
                Salir
              </Button>
            </Link>
          ) : (
            <>
              <Link href='/' passHref>
                <Button sx={{ color: 'white', textTransform: 'none' }}>Login</Button>
              </Link>
              <Link href='/' passHref>
                <Button sx={{ color: 'white', textTransform: 'none' }}>Registrarse</Button>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
