import { useState } from 'react';
import {
  Box, TextField, InputAdornment, IconButton, Button, Typography, Link, Divider,
} from '@mui/material';
import { PersonOutline, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { loginUser } from '@/app/services/handlers/getMatricula';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const isValidAccount = (value: string) => {
    const isEmail = /\S+@\S+\.\S+/.test(value);
    const isCurp = /^[A-Z0-9]{18}$/i.test(value);
    const isPhone = /^\d{10}$/.test(value);
    return isEmail || isCurp || isPhone;
  };

  const loginSubmit = async () => {
    if (!isValidAccount(account)) {
      setError('Ingrese un CURP, email o número de celular válido.');
      return;
    }

    if (password.length === 0) {
      setError('La contraseña es obligatoria.');
      return;
    }

    let payload = {};
    if (/^[A-Z0-9]{18}$/i.test(account)) {
      payload = { curp: account, contrasena: password };
    } else if (/^\d{10}$/.test(account)) {
      payload = { celular: account, contrasena: password };
    } else if (/\S+@\S+\.\S+/.test(account)) {
      payload = { email: account, contrasena: password };
    }

    try {
      const { token } = await loginUser(payload);
      localStorage.setItem('authToken', token);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <TextField
        label='Cuenta'
        variant='outlined'
        placeholder='CURP, Email o Celular'
        fullWidth
        value={account}
        onChange={(e) => setAccount(e.target.value)}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
      {error && (
        <Typography color='error' sx={{ marginBottom: '16px' }}>
          {error}
        </Typography>
      )}
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
        onClick={loginSubmit}
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
