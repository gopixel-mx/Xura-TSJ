'use client';

import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Box, InputAdornment,
} from '@mui/material';
import {
  PersonOutline,
  MailOutline,
  SmartphoneOutlined,
  VisibilityOffOutlined,
} from '@mui/icons-material';
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
  const [nombre, setNombre] = useState('');
  const [curpValue, setCurpValue] = useState('');

  const fetchCurpData = async () => {
    try {
      const response = await getCurp(curp);
      if (response.estatus === 'ok') {
        const { Nombre, Curp } = response.datos;
        setNombre(Nombre);
        setCurpValue(Curp);
      }
    } catch (error) {
      console.error('Error obteniendo los datos del CURP:', error);
    }
  };

  useEffect(() => {
    fetchCurpData();
  }, [curp]); // La función se ejecuta cuando cambia la curp

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
          label='Nombre'
          value={nombre}
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
          value={password}
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
