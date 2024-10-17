'use client';

import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Box, InputAdornment, Typography,
} from '@mui/material';
import {
  PersonOutline,
  MailOutline,
  SmartphoneOutlined,
  VisibilityOffOutlined,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { CardHome } from '@/app/components/common/Cards';
import { getCurp } from '@/app/services/handlers/getMatricula';

interface CardAspiranteProps {
  email?: string;
  celular?: string;
  password?: string;
  curp: string;
}

export default function CardAspirante({
  email = '',
  celular = '',
  password = '',
  curp,
}: CardAspiranteProps) {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [curpValue, setCurpValue] = useState('');
  const [curpNotFound, setCurpNotFound] = useState(false);
  const router = useRouter();

  const formatPassword = (passwd: string) => {
    if (passwd.length > 4) {
      const hiddenPart = '*'.repeat(passwd.length - 4);
      return `${hiddenPart}${passwd.slice(-4)}`;
    }
    return passwd;
  };

  const fetchCurpData = async () => {
    try {
      const response = await getCurp(curp);
      if (response.estatus === 'ok' && response.datos) {
        const {
          Nombre, ApellidoPaterno, ApellidoMaterno, Curp,
        } = response.datos;
        setNombreCompleto(`${Nombre} ${ApellidoPaterno} ${ApellidoMaterno}`);
        setCurpValue(Curp);
        setCurpNotFound(false); // La CURP existe
      } else {
        setCurpNotFound(true); // La CURP no existe
      }
    } catch (error) {
      console.error('Error obteniendo los datos del CURP:', error);
      setCurpNotFound(true); // En caso de error, asumir que la CURP no existe
    }
  };

  useEffect(() => {
    fetchCurpData();
  }, [curp]); // La función se ejecuta cuando cambia la curp

  const handleConfirm = () => {
    // Callback vacío por ahora
    console.log('Confirmado');
  };

  const handleCancel = () => {
    router.back();
  };

  // Si la CURP no existe, mostrar el mensaje de que la persona no fue encontrada
  if (curpNotFound) {
    return (
      <CardHome title='La persona no existe'>
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
          <Typography variant='body1' sx={{ textAlign: 'center', color: '#ff4d63' }}>
            No pudimos encontrar a la persona con esa CURP.
          </Typography>
        </Box>
      </CardHome>
    );
  }

  // Si la CURP existe, mostrar los datos de la persona
  return (
    <CardHome title='Confirma tus datos'>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
      }}
      >
        <TextField
          label='Nombre Completo'
          value={nombreCompleto}
          fullWidth
          disabled
          variant='outlined'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <PersonOutline sx={{ color: 'rgba(0, 0, 0, 0.35)' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label='CURP'
          value={curpValue}
          fullWidth
          disabled
          variant='outlined'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <PersonOutline sx={{ color: 'rgba(0, 0, 0, 0.35)' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label='Correo'
          value={email}
          fullWidth
          disabled
          variant='outlined'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <MailOutline sx={{ color: 'rgba(0, 0, 0, 0.35)' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label='Celular'
          value={celular}
          fullWidth
          disabled
          variant='outlined'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SmartphoneOutlined sx={{ color: 'rgba(0, 0, 0, 0.35)' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label='Contraseña'
          value={formatPassword(password)} // Mostrar solo los últimos 4 caracteres
          fullWidth
          disabled
          variant='outlined'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <VisibilityOffOutlined sx={{ color: 'rgba(0, 0, 0, 0.35)' }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={handleConfirm} // Llamada al callback vacío
          sx={{
            py: 2,
            fontFamily: 'MadaniArabic-SemiBold',
            textTransform: 'capitalize',
            borderRadius: '10px',
            backgroundColor: '#32169b',
            '&:hover': { backgroundColor: '#14005E' },
          }}
        >
          Confirmar
        </Button>
        <Button
          variant='contained'
          fullWidth
          onClick={handleCancel} // Redirigir al inicio o volver a la página anterior
          sx={{
            py: 2,
            fontFamily: 'MadaniArabic-SemiBold',
            textTransform: 'capitalize',
            borderRadius: '10px',
            backgroundColor: 'rgb(255, 77, 99)',
            '&:hover': { backgroundColor: 'rgb(200, 50, 70)' },
          }}
        >
          Cancelar
        </Button>
      </Box>
    </CardHome>
  );
}

CardAspirante.defaultProps = {
  email: '',
  celular: '',
  password: '',
};
