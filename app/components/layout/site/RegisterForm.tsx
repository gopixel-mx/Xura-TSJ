import React, { useState } from 'react';
import {
  Box, TextField, InputAdornment, IconButton, Button, Typography, Checkbox, Link, CircularProgress,
} from '@mui/material';
import {
  PersonOutline,
  MailOutline,
  SmartphoneOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from '@mui/icons-material';

export default function RegisterForm({
  onRegister,
  loading,
  termsAccepted,
  onCheckboxChange,
  curp,
  setCurp,
  email,
  setEmail,
  celular,
  setCelular,
  password,
  setPassword,
  curpError,
  emailError,
  celularError,
  passwordError,
}: {
  onRegister: () => void,
  loading: boolean,
  termsAccepted: boolean,
  // eslint-disable-next-line no-unused-vars
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  curp: string,
  setCurp: React.Dispatch<React.SetStateAction<string>>,
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  celular: string,
  setCelular: React.Dispatch<React.SetStateAction<string>>,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  curpError: string,
  emailError: string,
  celularError: string,
  passwordError: string,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <TextField
        label='CURP'
        variant='outlined'
        fullWidth
        placeholder='CURP'
        value={curp}
        onChange={(e) => setCurp(e.target.value.toUpperCase())}
        error={Boolean(curpError)}
        helperText={curpError}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <PersonOutline />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label='Correo'
        variant='outlined'
        fullWidth
        placeholder='Correo electrónico'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={Boolean(emailError)}
        helperText={emailError}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <MailOutline />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label='Celular'
        variant='outlined'
        fullWidth
        placeholder='Celular'
        value={celular}
        onChange={(e) => setCelular(e.target.value)}
        error={Boolean(celularError)}
        helperText={celularError}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SmartphoneOutlined />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label='Contraseña'
        variant='outlined'
        type={showPassword ? 'text' : 'password'}
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={Boolean(passwordError)}
        helperText={passwordError}
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          checked={termsAccepted}
          onChange={onCheckboxChange}
        />
        <Typography sx={{ fontFamily: 'MadaniArabic-Regular' }}>
          Acepto los
          {' '}
          <Link
            href='/terminos'
            target='_blank'
            rel='noopener noreferrer'
            color='primary'
            sx={{
              textDecoration: 'underline',
              fontFamily: 'MadaniArabic-Regular',
            }}
          >
            términos y condiciones de privacidad
          </Link>
        </Typography>
      </Box>
      <Button
        variant='contained'
        color='primary'
        fullWidth
        onClick={onRegister}
        disabled={!termsAccepted || loading}
        sx={{
          py: 2,
          fontFamily: 'MadaniArabic-SemiBold',
          textTransform: 'capitalize',
          borderRadius: '10px',
          backgroundColor: '#32169b',
          '&:hover': { backgroundColor: '#14005E' },
          '&.Mui-disabled': {
            backgroundColor: '#32169b',
            color: '#fff',
            opacity: 1,
          },
        }}
      >
        {loading ? <CircularProgress size={24} color='inherit' /> : 'Registrate'}
      </Button>
    </>
  );
}
