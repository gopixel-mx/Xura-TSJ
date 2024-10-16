'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Button, TextField, Link,
} from '@mui/material';
import { CardHome } from '@/app/components/common/Cards';

const generateUniqueId = (index: number) => `input-code-${index}-${Date.now()}`;

interface VerifyCodeProps {
  userData: string;
  type: 'Auth' | 'Register' | 'Forgot';
}

export default function VerifyCode({ userData, type }: VerifyCodeProps) {
  const [resendDisabled, setResendDisabled] = useState(true);
  const [altSendDisabled, setAltSendDisabled] = useState(false);
  const [permanentlyDisabled, setPermanentlyDisabled] = useState(false);
  const [showAltSend, setShowAltSend] = useState(false);
  const [counter, setCounter] = useState(30);
  const [codeValues, setCodeValues] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const inputIds = useRef([0, 1, 2, 3].map((index) => generateUniqueId(index)));

  const isEmail = /\S+@\S+\.\S+/.test(userData);

  useEffect(() => {
    if (counter > 0) {
      const timeout = setTimeout(() => setCounter((prev) => prev - 1), 1000);
      return () => clearTimeout(timeout);
    }
    setResendDisabled(false);
    if (permanentlyDisabled) {
      setShowAltSend(true);
    }
    return undefined;
  }, [counter, permanentlyDisabled]);

  const handleResendCode = () => {
    if (!resendDisabled && !permanentlyDisabled) {
      setResendDisabled(true);
      setPermanentlyDisabled(true);
      setCounter(30);
    }
  };

  const handleAltSend = () => {
    if (!altSendDisabled) {
      setResendDisabled(true);
      setAltSendDisabled(true);
      setCounter(30);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newValues = [...codeValues];
      newValues[index] = value;
      setCodeValues(newValues);
      if (value !== '' && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Determinar el título y el texto de acuerdo al tipo de operación
  const getTitle = () => {
    switch (type) {
      case 'Auth':
        return 'Ingresa el código de autenticación de dos factores';
      case 'Register':
        return 'Ingresa el código de verificación';
      case 'Forgot':
        return 'Ingresa el código de recuperación';
      default:
        return '';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'Auth':
        return isEmail
          ? `Te enviamos un código de autenticación a tu correo electrónico de ${userData}.`
          : `Te enviamos un código de autenticación a tu celular ${userData}.`;
      case 'Register':
        return isEmail
          ? `Te enviamos un código de verificación a tu correo electrónico de ${userData}.`
          : `Te enviamos un código de verificación a tu celular ${userData}.`;
      case 'Forgot':
        return isEmail
          ? `Te enviamos un código de recuperación a tu correo electrónico de ${userData}.`
          : `Te enviamos un código de recuperación a tu celular ${userData}.`;
      default:
        return '';
    }
  };

  return (
    <CardHome title={getTitle()}>
      <Typography
        sx={{
          color: '#6b6b6b',
          textAlign: 'center',
          fontFamily: 'MadaniArabic-Regular',
          opacity: 0.7,
          marginBottom: '24px',
        }}
      >
        {getDescription()}
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '9px',
        marginBottom: '24px',
      }}
      >
        {inputIds.current.map((id, index) => (
          <TextField
            key={id}
            inputRef={(el) => {
              inputRefs.current[index] = el;
            }}
            value={codeValues[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            variant='outlined'
            inputProps={{
              inputMode: 'numeric',
              maxLength: 1,
              style: { textAlign: 'center', height: '72px', fontFamily: 'MadaniArabic-SemiBold' },
            }}
            sx={{
              width: '64px',
              borderRadius: '15px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '15px',
                '& fieldset': {
                  borderColor: codeValues[index] ? '#32169b' : 'rgba(0, 0, 0, 0.15)',
                  borderWidth: codeValues[index] ? '2px' : '1px',
                },
              },
              '& .MuiInputBase-input': {
                padding: 0,
                textAlign: 'center',
              },
            }}
          />
        ))}
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '24px',
      }}
      >
        <Typography
          sx={{
            fontFamily: 'MadaniArabic-SemiBold',
            cursor: resendDisabled || permanentlyDisabled ? 'default' : 'pointer',
            color: resendDisabled || permanentlyDisabled ? '#aaa' : '#000',
            textDecoration: resendDisabled || permanentlyDisabled ? 'none' : 'underline',
            pointerEvents: resendDisabled || permanentlyDisabled ? 'none' : 'auto',
          }}
          onClick={handleResendCode}
        >
          Reenviar código
        </Typography>
        <Typography sx={{ fontFamily: 'MadaniArabic-Regular' }}>
          {resendDisabled ? `${counter}:00 seg.` : ''}
        </Typography>
      </Box>
      {showAltSend && (
        <Typography
          component='div'
          sx={{
            cursor: altSendDisabled ? 'default' : 'pointer',
            color: altSendDisabled ? '#aaa' : '#0066cc',
            fontFamily: 'MadaniArabic-Regular',
            textDecoration: 'underline',
            pointerEvents: altSendDisabled ? 'none' : 'auto',
            marginBottom: '24px',
          }}
          onClick={handleAltSend}
        >
          <Link color='inherit' underline='hover'>
            {isEmail
              ? '¿No recibió el código? Envíamelo al celular'
              : '¿No recibió el código? Envíamelo al correo'}
          </Link>
        </Typography>
      )}
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
        Confirmar código
      </Button>
    </CardHome>
  );
}
