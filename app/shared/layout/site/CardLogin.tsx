'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { CardHome } from '@/app/shared/common';
import { getCurp } from '@/app/services/handlers/getMatricula';
import SliderLogin from './SliderLogin';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import CardAspirante from './CardAspirante';
import VerifyCode from './VerifyCode';

export default function CardLogin() {
  const [activeSlide, setActiveSlide] = useState<'ingresa' | 'registrate'>('ingresa');
  const [showVerifyCode, setShowVerifyCode] = useState(false);
  const [validationNeed, setValidationNeed] = useState<{ correo?: boolean; celular?: boolean }>({});
  const [contactData, setContactData] = useState<{ correo?: string; celular?: string; credencial?: string }>({});

  const [userData, setUserData] = useState({
    curp: '',
    correo: '',
    celular: '',
    password: '',
  });

  const [registerErrors, setRegisterErrors] = useState({
    curpError: '',
    emailError: '',
    celularError: '',
    passwordError: '',
  });

  const [loginErrors, setLoginErrors] = useState<{
    account?: string;
    password?: string;
  }>({
    account: '',
    password: '',
  });

  const [isAspiranteMode, setIsAspiranteMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

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
    const errors = {
      curpError: '', emailError: '', celularError: '', passwordError: '',
    };

    if (!isValidCurp(userData.curp)) {
      errors.curpError = 'La CURP debe tener exactamente 18 caracteres.';
      valid = false;
    }

    if (!isValidEmail(userData.correo)) {
      errors.emailError = 'Ingrese un correo electrónico válido.';
      valid = false;
    }

    if (!isValidCelular(userData.celular)) {
      errors.celularError = 'El número de celular debe tener 10 dígitos.';
      valid = false;
    }

    if (!isValidPassword(userData.password)) {
      errors.passwordError = `La contraseña debe tener al menos 8 caracteres,
      incluir una mayúscula, un número y un carácter especial.`;
      valid = false;
    }

    setRegisterErrors(errors);

    if (valid) {
      setLoading(true);
      try {
        const response = await getCurp(userData.curp);
        const { Nombre, ApellidoPaterno, ApellidoMaterno } = response.datos;
        if (response.estatus === 'ok' && response.datos) {
          setNombreCompleto(`${Nombre} ${ApellidoPaterno} ${ApellidoMaterno}`);
          setIsAspiranteMode(true);
        } else {
          setRegisterErrors((prevErrors) => (
            { ...prevErrors, curpError: 'No se encontró a la persona con esa CURP.' }
          ));
        }
      } catch (error) {
        setRegisterErrors((prevErrors) => (
          { ...prevErrors, curpError: 'Error al consultar la CURP.' }
        ));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleShowVerifyCode = (
    validationNeeded: { correo?: boolean; celular?: boolean },
    correo?: string,
    celular?: string,
    credencial?: string,
  ) => {
    setValidationNeed(validationNeeded);
    setContactData({ correo, celular, credencial });
    setShowVerifyCode(true);
  };

  if (showVerifyCode) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px',
          boxSizing: 'border-box',
          height: 'calc(100vh - 64px)',
          marginTop: '-35px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '100%',
            gap: '20px',
            width: '100%',
          }}
        >
          <VerifyCode
            type='Register'
            email={validationNeed.correo ? contactData.correo : undefined}
            celular={validationNeed.celular ? contactData.celular : undefined}
            credencial={contactData.credencial}
            validation={validationNeed}
          />
        </Box>
      </Box>
    );
  }

  if (isAspiranteMode) {
    return (
      <CardAspirante
        email={userData.correo}
        celular={userData.celular}
        password={userData.password}
        curp={userData.curp.toUpperCase()}
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
          <LoginForm
            onSwitchToRegister={() => handleSliderChange('registrate')}
            userErrors={loginErrors}
            setUserErrors={setLoginErrors}
            onShowVerifyCode={handleShowVerifyCode}
          />
        ) : (
          <RegisterForm
            onRegister={handleRegister}
            loading={loading}
            termsAccepted={termsAccepted}
            onCheckboxChange={handleCheckboxChange}
            userData={userData}
            setUserData={setUserData}
            userErrors={registerErrors}
          />
        )}
      </Box>
    </CardHome>
  );
}
