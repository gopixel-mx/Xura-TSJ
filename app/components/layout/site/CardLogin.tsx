'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Checkbox,
  Link,
  CircularProgress,
} from '@mui/material';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import {
  MailOutline,
  PersonOutline,
  VisibilityOffOutlined,
  VisibilityOutlined,
  SmartphoneOutlined,
} from '@mui/icons-material';
import { CardHome } from '@/app/components/common/Cards';
import { getCurp } from '@/app/services/handlers/getMatricula';
import SliderLogin from './SliderLogin';
import CardAspirante from './CardAspirante';

export default function CardLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [activeSlide, setActiveSlide] = useState<'ingresa' | 'registrate'>('ingresa');
  const [curp, setCurp] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [password, setPassword] = useState('');
  const [isAspiranteMode, setIsAspiranteMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nombreCompleto, setNombreCompleto] = useState('');

  const [curpError, setCurpError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [celularError, setCelularError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSliderChange = (value: 'ingresa' | 'registrate') => {
    setIsRegister(value === 'registrate');
    setActiveSlide(value);
  };

  // Validaciones
  const isValidEmail = (correo: string) => /\S+@\S+\.\S+/.test(correo);
  const isValidCurp = (crp: string) => crp.length === 18;
  const isValidCelular = (cel: string) => /^\d{10}$/.test(cel);
  const isValidPassword = (passw: string) => (
    passw.length >= 8
    && /[A-Z]/.test(passw)
    && /\d/.test(passw)
    && /[!@#$%^&*(),.?":{}|<>]/.test(passw)
  );

  const handleRegister = async () => {
    let valid = true;

    // Validar CURP
    if (!isValidCurp(curp)) {
      setCurpError('La CURP debe tener exactamente 18 caracteres.');
      valid = false;
    } else {
      setCurpError('');
    }

    // Validar correo
    if (!isValidEmail(email)) {
      setEmailError('Ingrese un correo electrónico válido.');
      valid = false;
    } else {
      setEmailError('');
    }

    // Validar celular
    if (!isValidCelular(celular)) {
      setCelularError('El número de celular debe tener 10 dígitos.');
      valid = false;
    } else {
      setCelularError('');
    }

    // Validar contraseña
    if (!isValidPassword(password)) {
      setPasswordError(
        `La contraseña debe tener al menos 8 caracteres, incluir una mayúscula,
        un número y un carácter especial.`,
      );
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      setLoading(true);
      try {
        const response = await getCurp(curp);
        if (response.estatus === 'ok' && response.datos) {
          setNombreCompleto(`${response.datos.Nombre} ${response.datos.ApellidoPaterno} ${response.datos.ApellidoMaterno}`);
          setIsAspiranteMode(true);
        } else {
          setCurpError('No se encontró a la persona con esa CURP.');
        }
      } catch (error) {
        setCurpError('Error al consultar la CURP.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (isAspiranteMode) {
    return (
      <CardAspirante
        email={email}
        celular={celular}
        password={password}
        curp={curp.toUpperCase()}
        nombreCompleto={nombreCompleto}
      />
    );
  }

  return (
    <CardHome>
      <Box
        sx={{
          width: '100%',
          maxWidth: '355px',
          gap: '32px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <SliderLogin active={activeSlide} onChange={handleSliderChange} />

        {!isRegister ? (
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
                  onClick={() => handleSliderChange('registrate')}
                >
                  Registrate
                </Typography>
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <TextField
              label='CURP'
              variant='outlined'
              fullWidth
              placeholder='CURP'
              value={curp}
              onChange={(e) => setCurp(e.target.value.toUpperCase())} // Convertir a mayúsculas
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
              onChange={(e) => setEmail(e.target.value)} // Sin conversión
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
              onChange={(e) => setCelular(e.target.value)} // Sin conversión
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
              onChange={(e) => setPassword(e.target.value)} // Sin conversión
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
              <Checkbox />
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
              onClick={handleRegister}
              sx={{
                py: 2,
                fontFamily: 'MadaniArabic-SemiBold',
                textTransform: 'capitalize',
                borderRadius: '10px',
                backgroundColor: '#32169b',
                '&:hover': { backgroundColor: '#14005E' },
              }}
            >
              {loading ? <CircularProgress size={24} color='inherit' /> : 'Registrate'}
            </Button>
          </>
        )}
      </Box>
    </CardHome>
  );
}
