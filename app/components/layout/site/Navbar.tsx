import Link from 'next/link';
import {
  AppBar, Toolbar, Typography, Button, Box,
} from '@mui/material';

interface User {
  isAuthenticated: boolean;
  rol: number;
}

export default function Navbar({ isAuthenticated, rol }: User) {
  const backgroundColor = 'rgb(50, 22, 155)';

  return (
    <AppBar position='fixed' sx={{ backgroundColor, width: '100%' }}>
      <Toolbar sx={{ minHeight: 64 }}>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Xura
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {
            isAuthenticated && rol === 1 ? (
              <>
                <Link href='/dashboard' passHref>
                  <Button sx={{ color: 'white' }}>Dashboard</Button>
                </Link>
                <Link href='/' passHref>
                  <Button sx={{ color: 'white' }}>Salir</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href='/' passHref>
                  <Button sx={{ color: 'white' }}>Login</Button>
                </Link>
                <Link href='/' passHref>
                  <Button sx={{ color: 'white' }}>Registrarse</Button>
                </Link>
              </>
            )
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
}
