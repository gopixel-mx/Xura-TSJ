'use client';

import { useState, ChangeEvent } from 'react';
import {
  Typography, Button, TextField, InputAdornment, Link,
} from '@mui/material';
import { PersonOutline } from '@mui/icons-material';
import { CardHome } from '@/app/shared/common';
import VerifyCode from './VerifyCode';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

export default function CardForgotPassw() {
  const [userData, setUserData] = useState('');
  const [isVerifyMode, setIsVerifyMode] = useState(false);
  const [error, setError] = useState('');
  const [idCredencial, setIdCredencial] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [celular, setCelular] = useState<string>('');

  const isValidEmail = (correo: string) => /\S+@\S+\.\S+/.test(correo);
  const isValidPhone = (phone: string) => /^\d{10}$/.test(phone);
  const isValidCurp = (crp: string) => crp.length === 18;

  const getIdCredencial = async () => {
    try {
      let requestData;

      if (isValidEmail(userData)) {
        requestData = { correo: userData };
      } else if (isValidPhone(userData)) {
        requestData = { celular: userData };
      } else if (isValidCurp(userData)) {
        requestData = { curp: userData };
      } else {
        setError('Ingrese un correo electrónico, CURP o número de celular válido.');
        return;
      }

      const response = await fetch(`${domain}/sesiones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          api_key: apiKey || '',
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();

      if (response.ok && responseData?.idCredencial) {
        setIdCredencial(responseData.idCredencial);
        setIsVerifyMode(true);
        setEmail(responseData.correo || '');
        setCelular(responseData.celular || '');
      } else {
        setError('Error al obtener el id de credencial.');
      }
    } catch (err) {
      setError('Hubo un error al procesar la solicitud.');
    }
  };

  const handleSendCode = () => {
    setError('');
    getIdCredencial();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData(e.target.value);
    setError('');
  };

  const renderVerifyCode = () => (
    <VerifyCode
      type='Forgot'
      email={email}
      celular={celular}
      credencial={idCredencial}
      validation={{ correo: true, celular: true }}
    />
  );

  return isVerifyMode && idCredencial ? (
    renderVerifyCode()
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
        Introduzca su correo, celular ó CURP asociado a su cuenta.
      </Typography>
      <TextField
        variant='outlined'
        placeholder='Correo, celular o CURP'
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
