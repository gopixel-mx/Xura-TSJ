'use client';

import React from 'react';
import {
  Button, TextField, Box, InputAdornment,
} from '@mui/material';
import {
  PersonOutline,
  MailOutline,
  SmartphoneOutlined,
  VisibilityOffOutlined,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { CardHome } from '@/app/components/common/Cards';

interface CardAspiranteProps {
  email?: string;
  celular?: string;
  password?: string;
  curp: string;
  nombreCompleto: string;
}

export default function CardAspirante({
  email = '',
  celular = '',
  password = '',
  curp,
  nombreCompleto,
}: CardAspiranteProps) {
  const router = useRouter();

  const formatPassword = (passwd: string) => {
    if (passwd.length > 4) {
      const hiddenPart = '*'.repeat(passwd.length - 4);
      return `${hiddenPart}${passwd.slice(-4)}`;
    }
    return passwd;
  };

  const handleConfirm = () => {
    console.log('Confirmado');
  };

  const handleCancel = () => {
    router.back();
  };

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
          value={curp}
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
