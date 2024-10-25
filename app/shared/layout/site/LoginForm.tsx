import React, { useState } from 'react';
import {
  Box, TextField, InputAdornment, IconButton, Button, Typography, Link, Divider,
} from '@mui/material';
import { PersonOutline, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useAuthContext } from '@/app/context/AuthContext';
import submitNewLogin from './submitNewLogin';

interface LoginPayload {
  curp?: string;
  celular?: string;
  correo?: string;
  contrasena: string;
}

interface LoginFormProps {
  onSwitchToRegister: () => void;
  userErrors: {
    account?: string;
    password?: string;
  };
  setUserErrors: React.Dispatch<React.SetStateAction<{
    account?: string;
    password?: string;
  }>>;
}

export default function LoginForm({
  onSwitchToRegister,
  userErrors,
  setUserErrors,
}: LoginFormProps) {
  const { activateAuth, setLoading } = useAuthContext();
  const [form, setForm] = React.useState({ account: '', password: '' });
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const isValidAccount = (value: string) => {
    const isEmail = /\S+@\S+\.\S+/.test(value);
    const isCurp = /^[A-Z0-9]{18}$/i.test(value);
    const isPhone = /^\d{10}$/i.test(value);
    return isEmail || isCurp || isPhone;
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async () => {
    let valid = true;
    const errors = { account: '', password: '' };

    if (!isValidAccount(form.account)) {
      errors.account = 'Ingrese un CURP, email o número de celular válido.';
      valid = false;
    }

    if (form.password.length === 0) {
      errors.password = 'La contraseña es obligatoria.';
      valid = false;
    }

    setUserErrors(errors);
    if (!valid) return;

    const payload: LoginPayload = { contrasena: form.password };

    if (/^[A-Z0-9]{18}$/i.test(form.account)) {
      payload.curp = form.account;
    } else if (/^\d{10}$/i.test(form.account)) {
      payload.celular = form.account;
    } else if (/\S+@\S+\.\S+/.test(form.account)) {
      payload.correo = form.account;
    }

    setLoading(true);
    const userData = await submitNewLogin(
      payload,
      setUserErrors,
      activateAuth,
      setLoading,
    );

    if (userData) {
      activateAuth(userData);
    }

    setLoading(false);
  };

  return (
    <>
      <TextField
        label='Cuenta'
        variant='outlined'
        placeholder='CURP, Email o Celular'
        fullWidth
        name='account'
        value={form.account}
        onChange={handleOnChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <PersonOutline />
            </InputAdornment>
          ),
        }}
        error={Boolean(userErrors.account)}
        helperText={userErrors.account}
      />
      <TextField
        label='Contraseña'
        variant='outlined'
        type={showPassword ? 'text' : 'password'}
        placeholder='Contraseña'
        fullWidth
        name='password'
        value={form.password}
        onChange={handleOnChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={togglePasswordVisibility} edge='end'>
                {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={Boolean(userErrors.password)}
        helperText={userErrors.password}
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
        onClick={handleSubmit}
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
