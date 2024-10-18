'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { CardHome } from '@/app/components/common/Cards';
import { getCurp } from '@/app/services/handlers/getMatricula';
import SliderLogin from './SliderLogin';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import CardAspirante from './CardAspirante';

export default function CardLogin() {
  const [activeSlide, setActiveSlide] = useState<'ingresa' | 'registrate'>('ingresa');
  const [curp, setCurp] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [password, setPassword] = useState('');
  const [isAspiranteMode, setIsAspiranteMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [curpError, setCurpError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [celularError, setCelularError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSliderChange = (value: 'ingresa' | 'registrate') => {
    setActiveSlide(value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
  };

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

    if (!isValidCurp(curp)) {
      setCurpError('La CURP debe tener exactamente 18 caracteres.');
      valid = false;
    } else {
      setCurpError('');
    }

    if (!isValidEmail(email)) {
      setEmailError('Ingrese un correo electrónico válido.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!isValidCelular(celular)) {
      setCelularError('El número de celular debe tener 10 dígitos.');
      valid = false;
    } else {
      setCelularError('');
    }

    if (!isValidPassword(password)) {
      setPasswordError(
        `La contraseña debe tener al menos 8 caracteres,
        incluir una mayúscula, un número y un carácter especial.`,
      );
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      setLoading(true);
      try {
        const response = await getCurp(curp);
        const { Nombre, ApellidoPaterno, ApellidoMaterno } = response.datos;
        if (response.estatus === 'ok' && response.datos) {
          setNombreCompleto(`${Nombre} ${ApellidoPaterno} ${ApellidoMaterno}`);
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

        {activeSlide === 'ingresa' ? (
          <LoginForm onSwitchToRegister={() => handleSliderChange('registrate')} />
        ) : (
          <RegisterForm
            onRegister={handleRegister}
            loading={loading}
            termsAccepted={termsAccepted}
            onCheckboxChange={handleCheckboxChange}
            curp={curp}
            setCurp={setCurp}
            email={email}
            setEmail={setEmail}
            celular={celular}
            setCelular={setCelular}
            password={password}
            setPassword={setPassword}
            curpError={curpError}
            emailError={emailError}
            celularError={celularError}
            passwordError={passwordError}
          />
        )}
      </Box>
    </CardHome>
  );
}
