import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { Add, Close, EditOutlined } from '@mui/icons-material';
import DefaultModal from '../DefaulModal';

interface ModalAplicacionesProps {
  open: boolean;
  onClose: () => void;
  fields: Array<{ name: string; label: string; type?: 'select' | 'text'; icon?: React.ReactNode }>;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: Record<string, string>) => Promise<void>;
}

export default function ModalAplicaciones({
  open,
  onClose,
  fields,
  onSubmit,
}: ModalAplicacionesProps) {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<{ value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(formValues); // Llama a onSubmit, que maneja la petición al backend
      setFormErrors({}); // Limpia los errores si la operación es exitosa
      onClose(); // Cierra el modal solo si todo sale bien (sin errores)
    } catch (error: any) {
      // Si hay errores de validación desde el backend, los manejamos aquí
      if (error.response && error.response.data && error.response.data.errors) {
        const backendErrors = error.response.data.errors;

        // Mapea los errores correctamente a los campos
        const allErrors = Object.keys(backendErrors).reduce((acc: Record<string, string>, key) => {
          acc[key] = backendErrors[key]; // Asigna cada mensaje de error al campo correspondiente
          return acc;
        }, {});

        setFormErrors(allErrors); // Asigna todos los errores al estado formErrors
      } else {
        console.error('Error inesperado:', error);
      }
    }
  };

  const handleClose = () => {
    onClose();
  };

  const customButtonStyles = {
    borderRadius: '20px',
    color: 'rgb(50, 22, 155)',
    textTransform: 'capitalize',
    borderColor: 'rgb(50, 22, 155)',
    '&:hover': {
      backgroundColor: 'rgba(50, 22, 155, 0.08)',
      borderColor: 'rgb(50, 22, 155)',
    },
  };

  const getGridSize = (index: number, totalFields: number) => {
    if (totalFields === 2) return 6;
    if (totalFields === 3) return 6;
    if (totalFields === 7) return index === 6 ? 8 : 4;
    return 12;
  };

  return (
    <DefaultModal open={open} onClose={onClose} title='Agregar Aplicación'>
      <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Grid container spacing={2}>
          {fields.map((field, index) => (
            <Grid item xs={getGridSize(index, fields.length)} key={field.name}>
              {field.type === 'select' ? (
                <FormControl fullWidth>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    name={field.name}
                    value={formValues[field.name] || ''}
                    onChange={handleSelectChange}
                    label={field.label}
                    error={!!formErrors[field.name]} // Mostrar error si existe
                  >
                    <MenuItem value=''><em>None</em></MenuItem>
                    <MenuItem value='option1'>Option 1</MenuItem>
                    <MenuItem value='option2'>Option 2</MenuItem>
                  </Select>
                  {formErrors[field.name] && (
                    <span style={{ color: 'red' }}>{formErrors[field.name]}</span>
                  )}
                </FormControl>
              ) : (
                <TextField
                  label={field.label}
                  name={field.name}
                  variant='outlined'
                  value={formValues[field.name] || ''}
                  onChange={handleInputChange}
                  fullWidth
                  error={!!formErrors[field.name]} // Muestra error si existe
                  helperText={formErrors[field.name]} // Muestra el mensaje de error
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        {field.icon || <EditOutlined />}
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Grid>
          ))}

        </Grid>
        <Box sx={{
          display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2,
        }}
        >
          <Button
            variant='outlined'
            sx={customButtonStyles}
            onClick={handleSubmit}
            startIcon={<Add />}
          >
            Guardar
          </Button>
          <Button
            variant='outlined'
            sx={customButtonStyles}
            onClick={handleClose}
            startIcon={<Close />}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </DefaultModal>
  );
}
