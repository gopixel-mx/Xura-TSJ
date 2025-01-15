import { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Chip,
  Autocomplete,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Close, Add, BookmarkBorder } from '@mui/icons-material';
import { updateRecord, getData } from '@/app/shared/utils/apiUtils';
import DefaultModal from '../DefaultModal';

interface ModalEtiquetasProps {
  open: boolean;
  onClose: () => void;
  selectedCredencial: { idCredencial: string } | null;
  onSave: () => void;
}

interface EtiquetaData {
  idEtiqueta: number;
  nombre: string;
}

interface AsociacionData {
  idAsociacion: number;
  idCredencial: string;
  idEtiqueta: number;
  nombre: string;
}

export default function ModalEtiquetas({
  open,
  onClose,
  selectedCredencial,
  onSave,
}: ModalEtiquetasProps) {
  const [etiquetas, setEtiquetas] = useState<EtiquetaData[]>([]);
  const [selectedEtiquetas, setSelectedEtiquetas] = useState<EtiquetaData[]>([]);
  const [removedEtiquetas, setRemovedEtiquetas] = useState<EtiquetaData[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEtiquetas = async () => {
      if (selectedCredencial && open) {
        try {
          setLoading(true);
          const { data } = await getData({
            endpoint: `/credenciales/${selectedCredencial.idCredencial}/etiquetas`,
          });
          const etiquet = Array.isArray(data)
            ? data.map((etq: AsociacionData) => ({
              idEtiqueta: etq.idEtiqueta,
              nombre: etq.nombre,
            }))
            : [];
          setSelectedEtiquetas(etiquet);
        } catch (error) {
          setSelectedEtiquetas([]);
        } finally {
          setLoading(false);
        }
      }
    };

    const fetchCatalogoEtiquetas = async () => {
      try {
        const { data } = await getData({ endpoint: '/credenciales/etiquetas' });
        setEtiquetas(Array.isArray(data) ? data : []);
      } catch (error) {
        setEtiquetas([]);
      }
    };

    if (open) {
      fetchEtiquetas();
      fetchCatalogoEtiquetas();
    }
  }, [open, selectedCredencial]);

  const handleAddEtiqueta = (etiqueta: EtiquetaData) => {
    if (!selectedEtiquetas.some((etq) => etq.idEtiqueta === etiqueta.idEtiqueta)) {
      setSelectedEtiquetas([...selectedEtiquetas, etiqueta]);
    }
    setInputValue('');
  };

  const handleRemoveEtiqueta = (idEtiqueta: number) => {
    const etiquetaToRemove = selectedEtiquetas.find(
      (etq) => etq.idEtiqueta === idEtiqueta,
    );
    if (etiquetaToRemove) {
      setRemovedEtiquetas([...removedEtiquetas, etiquetaToRemove]);
      setSelectedEtiquetas(
        selectedEtiquetas.filter((etq) => etq.idEtiqueta !== idEtiqueta),
      );
    }
  };

  const handleSave = async () => {
    if (selectedCredencial) {
      const addedPayload = selectedEtiquetas.map((etq) => ({
        seleccionado: 1,
        idEtiqueta: etq.idEtiqueta.toString(),
      }));
      const removedPayload = removedEtiquetas.map((etq) => ({
        seleccionado: 0,
        idEtiqueta: etq.idEtiqueta.toString(),
      }));

      const payload = [...addedPayload, ...removedPayload];

      try {
        setLoading(true);
        await updateRecord({
          endpoint: `/credenciales/${selectedCredencial.idCredencial}/etiquetas`,
          data: payload,
        });
        onSave();
        onClose();
      } catch (error) {
        setEtiquetas([]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <DefaultModal open={open} onClose={onClose} title='Administrar Etiquetas'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Autocomplete
          options={etiquetas}
          getOptionLabel={(option) => option.nombre}
          isOptionEqualToValue={(option, value) => option.idEtiqueta === value.idEtiqueta}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
          onChange={(event, newValue) => {
            if (newValue) handleAddEtiqueta(newValue);
          }}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label='Etiqueta'
              inputProps={{
                ...params.inputProps,
                endAdornment: (
                  <InputAdornment position='end'>
                    <BookmarkBorder />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mt: 2,
          }}
        >
          {selectedEtiquetas.map((etq) => (
            <Chip
              key={etq.idEtiqueta}
              label={etq.nombre}
              variant='outlined'
              onDelete={() => handleRemoveEtiqueta(etq.idEtiqueta)}
              deleteIcon={(
                <Close
                  sx={{
                    color: 'rgb(50, 22, 155)',
                    '&:hover': {
                      color: 'rgb(35, 10, 120)',
                    },
                  }}
                />
              )}
              sx={{
                margin: '4px',
                color: 'rgb(50, 22, 155)',
                borderColor: 'rgb(50, 22, 155)',
                '&:hover': {
                  backgroundColor: 'rgba(50, 22, 155, 0.08)',
                  borderColor: 'rgb(50, 22, 155)',
                },
              }}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            mt: 3,
          }}
        >
          <Button
            variant='contained'
            onClick={onClose}
            startIcon={<Close />}
            sx={{
              py: 1,
              px: 3,
              borderRadius: '8px',
              textTransform: 'capitalize',
              backgroundColor: 'rgb(255, 77, 99)',
              '&:hover': { backgroundColor: 'rgb(200, 50, 70)' },
              fontSize: '0.875rem',
            }}
            disabled={loading}
          >
            Cerrar
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={handleSave}
            startIcon={<Add />}
            disabled={loading}
            sx={{
              py: 1,
              px: 3,
              borderRadius: '8px',
              textTransform: 'capitalize',
              backgroundColor: '#32169b',
              '&:hover': { backgroundColor: '#14005E' },
              fontSize: '0.875rem',
            }}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </DefaultModal>
  );
}
