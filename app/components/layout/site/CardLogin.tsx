'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Paper, Box, Typography, Button, TextField, InputAdornment, IconButton, Divider,
} from '@mui/material';
import { signIn } from 'next-auth/react';
import { PersonOutline, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import SliderLogin from './SliderLogin';

export default function CardLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
        width: '100%',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center',
          width: '100%',
          maxWidth: '427px',
          height: 'auto',
          padding: '24px',
          borderRadius: '10px',
        }}
      >
        <Box
          sx={{
            marginBottom: '48px',
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Image
            src='/logoTSJ.svg'
            alt='Logo'
            width={250}
            height={114}
          />
        </Box>

        <Box sx={{
          width: '100%',
          maxWidth: '355px',
          gap: '32px',
          display: 'flex',
          flexDirection: 'column',
        }}
        >
          <SliderLogin />
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
            ¿Olvidaste tu contraseña?
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

          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',
          }}
          >
            <Divider sx={{ flex: 1 }} />
            <Typography sx={{
              mx: 2, opacity: 0.7, whiteSpace: 'nowrap', fontFamily: 'MadaniArabic-Regular',
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
                sx={{ cursor: 'pointer', fontFamily: 'MadaniArabic-SemiBold', color: '#32169b' }}
              >
                Registrate
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
