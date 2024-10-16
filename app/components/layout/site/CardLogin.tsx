'use client';

import { useState } from 'react';
import {
  Box, Typography, Button, TextField, InputAdornment, IconButton, Divider, Checkbox, Link,
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
import SliderLogin from './SliderLogin';

export default function CardLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [activeSlide, setActiveSlide] = useState<'ingresa' | 'registrate'>('ingresa');

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSliderChange = (value: 'ingresa' | 'registrate') => {
    setIsRegister(value === 'registrate');
    setActiveSlide(value);
  };

  return (
    <CardHome>
      <Box sx={{
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
            {/* Formulario de inicio de sesión */}
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
            {/* Formulario de registro */}
            <TextField
              label='CURP'
              variant='outlined'
              fullWidth
              placeholder='CURP'
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
              sx={{
                py: 2,
                fontFamily: 'MadaniArabic-SemiBold',
                textTransform: 'capitalize',
                borderRadius: '10px',
                backgroundColor: '#32169b',
                '&:hover': { backgroundColor: '#14005E' },
              }}
            >
              Registrate
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography sx={{ fontFamily: 'MadaniArabic-Regular', opacity: '70%' }}>
                ¿Ya tienes una cuenta?
                {' '}
                <Typography
                  component='span'
                  color='primary'
                  sx={{
                    cursor: 'pointer',
                    fontFamily: 'MadaniArabic-SemiBold',
                    color: '#32169b',
                  }}
                  onClick={() => handleSliderChange('ingresa')}
                >
                  Ingresa
                </Typography>
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </CardHome>
  );
}
