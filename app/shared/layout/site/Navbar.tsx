'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  AppBar, Toolbar, Box,
} from '@mui/material';

export default function Navbar() {
  const backgroundColor = 'rgb(50, 22, 155)';

  return (
    <AppBar position='fixed' sx={{ backgroundColor, width: '100%' }}>
      <Toolbar sx={{ minHeight: 64 }}>
        <Link href='/panel' passHref>
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
      </Toolbar>
    </AppBar>
  );
}
