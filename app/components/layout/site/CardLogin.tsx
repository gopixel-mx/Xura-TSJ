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

  const [userData, setUserData] = useState({
    curp: '',
    email: '',
    celular: '',
    password: '',
  });

  const [userErrors, setUserErrors] = useState({
    curpError: '',
    emailError: '',
    celularError: '',
    passwordError: '',
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

    if (!isValidEmail(userData.email)) {
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

    setUserErrors(errors);

    if (valid) {
      setLoading(true);
      try {
        const response = await getCurp(userData.curp);
        const { Nombre, ApellidoPaterno, ApellidoMaterno } = response.datos;
        if (response.estatus === 'ok' && response.datos) {
          setNombreCompleto(`${Nombre} ${ApellidoPaterno} ${ApellidoMaterno}`);
          setIsAspiranteMode(true);
        } else {
          setUserErrors((prevErrors) => (
            { ...prevErrors, curpError: 'No se encontró a la persona con esa CURP.' }
          ));
        }
      } catch (error) {
        setUserErrors((prevErrors) => (
          { ...prevErrors, curpError: 'Error al consultar la CURP.' }
        ));
      } finally {
        setLoading(false);
      }
    }
  };

  if (isAspiranteMode) {
    return (
      <CardAspirante
        email={userData.email}
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
          <LoginForm onSwitchToRegister={() => handleSliderChange('registrate')} />
        ) : (
          <RegisterForm
            onRegister={handleRegister}
            loading={loading}
            termsAccepted={termsAccepted}
            onCheckboxChange={handleCheckboxChange}
            userData={userData}
            setUserData={setUserData}
            userErrors={userErrors}
          />
        )}
      </Box>
    </CardHome>
  );
}
