'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Button, TextField, Link,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { CardHome } from '@/app/shared/common/Cards';

interface VerifyCodeProps {
  type: 'Auth' | 'Register' | 'Forgot';
  email?: string;
  celular?: string;
  credencial?: string;
}

const generateUniqueId = (index: number) => `input-code-${index}-${Date.now()}`;

export default function VerifyCode({
  type,
  email = '',
  celular = '',
  credencial,
}: VerifyCodeProps) {
  const router = useRouter();
  const [resendDisabled, setResendDisabled] = useState(true);
  const [altSendDisabled, setAltSendDisabled] = useState(false);
  const [permanentlyDisabled, setPermanentlyDisabled] = useState(false);
  const [showAltSend, setShowAltSend] = useState(false);
  const [counter, setCounter] = useState(30);
  const [codeValues, setCodeValues] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const inputIds = useRef([0, 1, 2, 3].map((index) => generateUniqueId(index)));

  const [isEmailStep, setIsEmailStep] = useState(type === 'Register');
  const [error, setError] = useState('');

  const currentData = isEmailStep ? email : celular;
  const isEmail = /\S+@\S+\.\S+/.test(currentData ?? '');

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
      // Aquí se haría la llamada para reenvío del código según el paso actual
    }
  };

  const handleAltSend = () => {
    if (!altSendDisabled) {
      setResendDisabled(true);
      setAltSendDisabled(true);
      setCounter(30);
      // Aquí se haría la llamada para enviar el código alterno según el paso actual
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newValues = [...codeValues];
      newValues[index] = value;
      setCodeValues(newValues);
      setError('');
      if (value !== '' && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleConfirmCode = () => {
    const enteredCode = codeValues.join('');
    if (enteredCode === '1234') { // Sustituir con la lógica de verificación real
      if (type === 'Register' && isEmailStep) {
        setIsEmailStep(false);
        setCodeValues(['', '', '', '']);
        setCounter(30);
        setResendDisabled(true);
        setPermanentlyDisabled(false);
      } else if (type === 'Register') {
        router.push('/dashboard'); // Redirigir una vez completadas ambas validaciones
      } else {
        router.push('/');
      }
    } else {
      setError('El código ingresado es incorrecto.');
      setCodeValues(['', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'Auth':
        return 'Ingresa el código de autenticación de dos factores';
      case 'Register':
        return 'Ingresa el código de validación';
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
          ? `Te enviamos un código de autenticación a tu correo electrónico ${currentData}.`
          : `Te enviamos un código de autenticación a tu celular ${currentData}.`;
      case 'Register':
        return isEmailStep
          ? `Te enviamos un código de validación a tu correo electrónico ${email}.`
          : `Te enviamos un código de validación a tu celular ${celular}.`;
      case 'Forgot':
        return isEmail
          ? `Te enviamos un código de recuperación a tu correo electrónico ${currentData}.`
          : `Te enviamos un código de recuperación a tu celular ${currentData}.`;
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
            error={Boolean(error)}
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
      {error && (
        <Typography
          sx={{
            color: 'red',
            textAlign: 'center',
            fontFamily: 'MadaniArabic-Regular',
            marginBottom: '24px',
          }}
        >
          {error}
        </Typography>
      )}
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
      {type !== 'Register' && showAltSend && (
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
            {isEmailStep
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
        onClick={handleConfirmCode}
      >
        Confirmar código
      </Button>
    </CardHome>
  );
}
