'use client';

import React, { useState } from 'react';
import {
  Typography, Button, TextField, InputAdornment, Link,
} from '@mui/material';
import { PersonOutline } from '@mui/icons-material';
import { CardHome } from '@/app/components/common/Cards';
import VerifyCode from './VerifyCode';

export default function CardForgotPassw() {
  const [userData, setUserData] = useState('');
  const [isVerifyMode, setIsVerifyMode] = useState(false);
  const [error, setError] = useState('');

  // Validación para verificar si es un correo electrónico o un celular de 10 dígitos
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone: string) => /^\d{10}$/.test(phone);

  const handleSendCode = () => {
    if (isValidEmail(userData) || isValidPhone(userData)) {
      setIsVerifyMode(true);
      setError('');
    } else {
      setError('Ingrese un correo electrónico válido o un número de celular de 10 dígitos.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(e.target.value);
    setError(''); // Limpiar el mensaje de error al cambiar el valor
  };

  return isVerifyMode ? (
    <VerifyCode userData={userData} type='Forgot' />
  ) : (
    <CardHome title='¿Olvidaste tu contraseña?'>
      <Typography
        sx={{
          color: '#6b6b6b',
          textAlign: 'center',
          fontFamily: 'MadaniArabic-Regular',
          opacity: 0.7,
          marginBottom: '24px',
        }}
      >
        Introduzca su correo electrónico ó celular asociado a su cuenta.
      </Typography>
      <TextField
        variant='outlined'
        placeholder='Correo ó celular'
        fullWidth
        value={userData}
        onChange={handleChange}
        error={Boolean(error)}
        helperText={error}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <PersonOutline />
            </InputAdornment>
          ),
        }}
        sx={{ marginBottom: '24px' }}
      />
      <Typography
        component='div'
        sx={{
          cursor: 'pointer',
          color: '#0066cc',
          fontFamily: 'MadaniArabic-SemiBold',
          textDecoration: 'underline',
          marginBottom: '24px',
        }}
      >
        <Link href='/' color='inherit' underline='hover'>
          Regresar al inicio
        </Link>
      </Typography>
      <Button
        variant='contained'
        color='primary'
        fullWidth
        onClick={handleSendCode}
        sx={{
          py: 2,
          fontFamily: 'MadaniArabic-SemiBold',
          textTransform: 'capitalize',
          borderRadius: '10px',
          backgroundColor: '#32169b',
          '&:hover': { backgroundColor: '#14005E' },
        }}
      >
        Enviar código
      </Button>
    </CardHome>
  );
}
