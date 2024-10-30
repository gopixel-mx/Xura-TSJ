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
  validation: { correo?: boolean; celular?: boolean };
}

const generateUniqueId = (index: number) => `input-code-${index}-${Date.now()}`;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

export default function VerifyCode({
  type,
  email = '',
  celular = '',
  credencial,
  validation,
}: VerifyCodeProps) {
  const router = useRouter();
  const [resendDisabled, setResendDisabled] = useState(true);
  const [showAltSend, setShowAltSend] = useState(false);
  const [counter, setCounter] = useState(30);
  const [codeValues, setCodeValues] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const inputIds = useRef([0, 1, 2, 3].map((index) => generateUniqueId(index)));
  const [isEmailStep, setIsEmailStep] = useState(validation.correo);
  const [error, setError] = useState('');
  const [resendPressedOnce, setResendPressedOnce] = useState(false);

  const currentData = isEmailStep ? email : celular;

  const messageType = type === 'Auth' ? 'Autenticación' : type === 'Register' ? 'Validación' : 'Recuperación';
  const messageMedium = isEmailStep ? 'Correo' : 'Celular';
  const destinatario = isEmailStep ? email : celular;

  const initiateVerification = async () => {
    if (!credencial || !destinatario) return;
    try {
      await fetch(`${domain}/credenciales/${credencial}/codigos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          api_key: apiKey || '',
        },
        body: JSON.stringify({
          tipo: messageType,
          medio: messageMedium,
          destinatario,
        }),
      });
    } catch (errorcito: any) {
      setError('Hubo un error al enviar el código.');
    }
  };

  useEffect(() => {
    initiateVerification();
  }, [credencial, destinatario, messageType, messageMedium]);

  useEffect(() => {
    if (counter > 0) {
      const timeout = setTimeout(() => setCounter((prev) => prev - 1), 1000);
      return () => clearTimeout(timeout);
    }

    if (!resendPressedOnce) {
      setResendDisabled(false);
    }
    return undefined;
  }, [counter, resendPressedOnce]);

  const resetCode = () => {
    setCodeValues(['', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const verifyCode = async () => {
    const enteredCode = codeValues.join('');
    if (!credencial || enteredCode.length !== 4) return;

    try {
      const response = await fetch(`${domain}/credenciales/${credencial}/codigos/${enteredCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          api_key: apiKey || '',
        },
        body: JSON.stringify({
          tipo: messageType,
          medio: messageMedium,
        }),
      });

      if (response.statusText === 'OK') {
        if (type === 'Register' && isEmailStep && validation.celular) {
          setIsEmailStep(false);
          resetCode();
        } else {
          router.push('/dashboard');
        }
      } else {
        setError('El código ingresado es incorrecto.');
        resetCode();
      }
    } catch (errorcito: any) {
      setError('Hubo un error al verificar el código.');
      resetCode();
    }
  };

  const handleResendCode = async () => {
    if (resendDisabled || resendPressedOnce || !credencial || !destinatario) return;

    try {
      await initiateVerification();
      setResendDisabled(true);
      setResendPressedOnce(true);
      setCounter(30);
      setShowAltSend(false);
    } catch {
      setError('Hubo un error al reenviar el código.');
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
        return `Te enviamos un código de autenticación a tu
        ${isEmailStep ? 'correo electrónico' : 'celular'} ${currentData}.`;
      case 'Register':
        return `Te enviamos un código de validación a tu
        ${isEmailStep ? 'correo electrónico' : 'celular'} ${currentData}.`;
      case 'Forgot':
        return `Te enviamos un código de recuperación a tu
        ${isEmailStep ? 'correo electrónico' : 'celular'} ${currentData}.`;
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
            cursor: resendDisabled ? 'default' : 'pointer',
            color: resendDisabled ? '#aaa' : '#000',
            textDecoration: resendDisabled ? 'none' : 'underline',
            pointerEvents: resendDisabled ? 'none' : 'auto',
          }}
          onClick={handleResendCode}
        >
          Reenviar código
        </Typography>
        {counter > 0 && (
          <Typography sx={{ fontFamily: 'MadaniArabic-Regular' }}>
            {`${counter}:00 seg.`}
          </Typography>
        )}
      </Box>
      {type !== 'Register' && showAltSend && (
        <Typography
          component='div'
          sx={{
            cursor: 'pointer',
            color: '#0066cc',
            fontFamily: 'MadaniArabic-Regular',
            textDecoration: 'underline',
            marginBottom: '24px',
          }}
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
        onClick={verifyCode}
      >
        Confirmar código
      </Button>
    </CardHome>
  );
}
