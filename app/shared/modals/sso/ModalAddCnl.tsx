import {
  ChangeEvent, ReactNode, useState, useEffect,
} from 'react';
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

interface AplicacionData {
  clave: string;
  nombre: string;
  redireccion: string;
  estado: string;
}

interface ModalAddCnlProps {
  title: string;
  open: boolean;
  onClose: () => void;
  fields: Array<{
    name: string;
    label: string;
    type?: 'select' | 'text';
    icon?: ReactNode;
    disabled?: boolean;
    multiple?: boolean;
    validation?: {
      required?: boolean;
      minLength?: number;
      maxLength?: number;
      pattern?: RegExp;
      errorMessage?: string;
    };
  }>;
  mode: 'agregar' | 'consultar' | 'editar';
  selectedData?: AplicacionData | null;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: Record<string, string | string[]>) => Promise<void>;
}

export default function ModalAddCnl({
  title,
  open,
  onClose,
  fields,
  mode,
  selectedData = null,
  onSubmit,
}: ModalAddCnlProps) {
  const [formValues, setFormValues] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open && selectedData && mode !== 'agregar') {
      const transformedData = Object.fromEntries(
        Object.entries(selectedData).map(([key, value]) => [key, value]),
      ) as Record<string, string | string[]>;
      setFormValues(transformedData);
    } else if (mode === 'agregar') {
      setFormValues({});
    }
  }, [selectedData, mode, open]);

  const validateField = (field: any, value: string | string[]): string => {
    const {
      required,
      minLength,
      maxLength,
      pattern,
      errorMessage,
    } = field.validation || {};
    let error = '';

    if (required && !value) {
      error = 'Este campo es obligatorio.';
    } else if (minLength && typeof value === 'string' && value.length < minLength) {
      error = `Debe tener al menos ${minLength} caracteres.`;
    } else if (maxLength && typeof value === 'string' && value.length > maxLength) {
      error = `Debe tener como máximo ${maxLength} caracteres.`;
    } else if (pattern && typeof value === 'string' && !pattern.test(value)) {
      error = errorMessage || 'Formato no válido.';
    }

    return error;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const field = fields.find((f) => f.name === name);
    if (field) {
      const error = validateField(field, value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string | string[]>, field: any) => {
    const { name, value } = e.target;
    const newValue = field.multiple ? (value as string[]) : (value as string);
    const error = validateField(field, newValue);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setFormValues({ ...formValues, [name]: newValue });
  };

  const handleSubmit = async () => {
    if (mode === 'consultar') return;

    let formIsValid = true;
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formValues[field.name] || '';
      const error = validateField(field, value);
      if (error) formIsValid = false;
      newErrors[field.name] = error;
    });

    setErrors(newErrors);

    if (formIsValid) {
      await onSubmit(formValues);
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
    setFormValues({});
    setErrors({});
  };

  const isReadOnly = mode === 'consultar';

  const getGridSize = (index: number, totalFields: number) => {
    if (totalFields === 2) return 6;
    if (totalFields === 3) return 6;
    if (totalFields === 7) return index === 1 ? 8 : 4;
    return 12;
  };

  const upperMode = mode.charAt(0).toUpperCase() + mode.slice(1);

  return (
    <DefaultModal open={open} onClose={handleClose} title={`${upperMode} ${title}`}>
      <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Grid container spacing={2}>
          {fields.map((field, index) => (
            <Grid item xs={getGridSize(index, fields.length)} key={field.name}>
              {field.type === 'select' ? (
                <FormControl fullWidth error={!!errors[field.name]}>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    name={field.name}
                    value={formValues[field.name] || (field.multiple ? [] : '')}
                    onChange={(e) => handleSelectChange(e, field)}
                    label={field.label}
                    variant='outlined'
                    disabled={isReadOnly || field.disabled}
                    multiple={field.multiple}
                    renderValue={(selected) => (Array.isArray(selected)
                      ? selected.join(', ') : selected)}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value='option1'>Option 1</MenuItem>
                    <MenuItem value='option2'>Option 2</MenuItem>
                  </Select>
                  {errors[field.name] && (
                    <Box sx={{ color: 'red', fontSize: '0.75rem', mt: 0.5 }}>
                      {errors[field.name]}
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
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                  disabled={isReadOnly || field.disabled}
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
            {mode === 'consultar' ? 'Cerrar' : 'Cancelar'}
          </Button>
          {mode !== 'consultar' && (
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
          )}
        </Box>
      </Box>
    </DefaultModal>
  );
}
