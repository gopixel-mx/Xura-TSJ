'use client';

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import DefaultModal from '../DefaulModal';

interface ModalAplicacionesProps {
  open: boolean;
  onClose: () => void;
}

export default function ModalAplicaciones({ open, onClose }: ModalAplicacionesProps) {
  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState('');
  const [redireccion, setRedireccion] = useState('');

  const handleSubmit = () => {
    console.log('Datos enviados:', { clave, nombre, redireccion });
    onClose();
  };

  return (
    <DefaultModal open={open} onClose={onClose} title='Agregar Aplicación'>
      <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label='Clave'
          variant='outlined'
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
        <TextField
          label='Nombre'
          variant='outlined'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          label='Redirección'
          variant='outlined'
          value={redireccion}
          onChange={(e) => setRedireccion(e.target.value)}
        />
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          Guardar
        </Button>
      </Box>
    </DefaultModal>
  );
}
