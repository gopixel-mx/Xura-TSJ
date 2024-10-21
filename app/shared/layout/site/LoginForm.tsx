import { useState } from 'react';
import {
  Box, TextField, InputAdornment, IconButton, Button, Typography, Link, Divider,
} from '@mui/material';
import { PersonOutline, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function LoginForm({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <TextField
        label='Cuenta'
        variant='outlined'
        placeholder='Email o CURP'
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <PersonOutline />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label='Contraseña'
        variant='outlined'
        type={showPassword ? 'text' : 'password'}
        placeholder='Contraseña'
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={togglePasswordVisibility} edge='end'>
                {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Typography
        align='right'
        color='primary'
        sx={{
          cursor: 'pointer',
          textDecoration: 'underline',
          fontFamily: 'MadaniArabic-Regular',
        }}
      >
        <Link
          href='/forgotPassword'
          color='inherit'
          underline='hover'
          sx={{
            textDecoration: 'underline',
            fontFamily: 'MadaniArabic-Regular',
          }}
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </Typography>
      <Button
        variant='contained'
        color='primary'
        fullWidth
        sx={{
          py: 2,
          fontFamily: 'MadaniArabic-SemiBold',
          textTransform: 'capitalize',
          borderRadius: '10px',
          backgroundColor: '#32169b',
          '&:hover': { backgroundColor: '#14005E' },
        }}
      >
        Ingresar
      </Button>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Divider sx={{ flex: 1 }} />
        <Typography
          sx={{
            mx: 2,
            opacity: 0.7,
            whiteSpace: 'nowrap',
            fontFamily: 'MadaniArabic-Regular',
          }}
        >
          O Ingresa con
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>
      <Button
        variant='contained'
        fullWidth
        sx={{
          bgcolor: '#ffffff',
          padding: 2,
          fontFamily: 'MadaniArabic-Regular',
          color: 'black',
          textTransform: 'capitalize',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
        }}
        startIcon={(
          <Image
            src='/google-icon-logo.svg'
            alt='Google'
            width={24}
            height={24}
            priority
          />
        )}
        onClick={() => signIn('google')}
      >
        Google
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ fontFamily: 'MadaniArabic-Regular', opacity: '70%' }}>
          ¿No tienes una cuenta?
          {' '}
          <Typography
            component='span'
            color='primary'
            sx={{
              cursor: 'pointer',
              fontFamily: 'MadaniArabic-SemiBold',
              color: '#32169b',
            }}
            onClick={onSwitchToRegister}
          >
            Registrate
          </Typography>
        </Typography>
      </Box>
    </>
  );
}
