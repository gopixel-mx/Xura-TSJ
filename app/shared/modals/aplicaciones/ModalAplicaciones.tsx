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
import DefaultModal from '../DefaultModal';

interface ModalAplicacionesProps {
  open: boolean;
  onClose: () => void;
  fields: Array<{
    name: string;
    label: string;
    type?: 'select' | 'text';
    icon?: React.ReactNode;
    disabled?: boolean;
    multiple?: boolean;
  }>;
  onSubmit: (data: Record<string, string | string[]>) => Promise<void>;
  formErrors: Record<string, string>;
}

export default function ModalAplicaciones({
  open,
  onClose,
  fields,
  onSubmit,
  formErrors,
}: ModalAplicacionesProps) {
  const [formValues, setFormValues] = useState<Record<string, string | string[]>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string | string[]>, field: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: field.multiple
        ? (value as string[]) : (value as string),
    });
  };

  const handleSubmit = async () => {
    await onSubmit(formValues);
  };

  const handleClose = () => {
    onClose();
  };

  const getGridSize = (index: number, totalFields: number) => {
    if (totalFields === 2) return 6;
    if (totalFields === 3) return 6;
    if (totalFields === 7) return index === 1 ? 8 : 4;
    return 12;
  };

  return (
    <DefaultModal open={open} onClose={handleClose} title='Agregar Aplicación'>
      <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Grid container spacing={2}>
          {fields.map((field, index) => (
            <Grid item xs={getGridSize(index, fields.length)} key={field.name}>
              {field.type === 'select' ? (
                <FormControl fullWidth error={!!formErrors[field.name]}>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    name={field.name}
                    value={formValues[field.name] || (field.multiple ? [] : '')}
                    onChange={(e) => handleSelectChange(e, field)}
                    label={field.label}
                    variant='outlined'
                    disabled={field.disabled}
                    multiple={field.multiple}
                    renderValue={(selected) => (Array.isArray(selected)
                      ? selected.join(', ') : selected)}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value='option1'>Option 1</MenuItem>
                    <MenuItem value='option2'>Option 2</MenuItem>
                    <MenuItem value='option3'>Option 3</MenuItem>
                    <MenuItem value='option4'>Option 4</MenuItem>
                    <MenuItem value='option5'>Option 5</MenuItem>
                  </Select>
                  {formErrors[field.name] && (
                    <Box sx={{ color: 'red', fontSize: '0.75rem', mt: 0.5 }}>
                      {formErrors[field.name]}
                    </Box>
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
                  error={!!formErrors[field.name]}
                  helperText={formErrors[field.name]}
                  disabled={field.disabled}
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            variant='contained'
            onClick={handleSubmit}
            startIcon={<Add />}
            sx={{
              py: 1,
              px: 3,
              fontFamily: 'MadaniArabic-SemiBold',
              textTransform: 'capitalize',
              borderRadius: '8px',
              backgroundColor: '#32169b',
              '&:hover': { backgroundColor: '#14005E' },
              fontSize: '0.875rem',
            }}
          >
            Guardar
          </Button>
          <Button
            variant='contained'
            onClick={handleClose}
            startIcon={<Close />}
            sx={{
              py: 1,
              px: 3,
              fontFamily: 'MadaniArabic-SemiBold',
              textTransform: 'capitalize',
              borderRadius: '8px',
              backgroundColor: 'rgb(255, 77, 99)',
              '&:hover': { backgroundColor: 'rgb(200, 50, 70)' },
              fontSize: '0.875rem',
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </DefaultModal>
  );
}
