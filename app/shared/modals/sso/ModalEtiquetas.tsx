import { KeyboardEvent, useState, useEffect } from 'react';
import {
  Button,
  Box,
  TextField,
  Chip,
  InputAdornment,
} from '@mui/material';
import {
  Close, Add, BookmarkBorder,
} from '@mui/icons-material';
import { updateRecord, getData } from '@/app/shared/utils/apiUtils';
import DefaultModal from '../DefaultModal';

interface ModalEtiquetasProps {
  open: boolean;
  onClose: () => void;
  selectedCredencial: { idCredencial: string; } | null;
  onSave: () => void;
}

interface EtiquetaData {
  idEtiqueta?: number;
  idGrupo?: number;
  nombre: string;
  estado?: string;
}

export default function ModalEtiquetas({
  open,
  onClose,
  selectedCredencial,
  onSave,
}: ModalEtiquetasProps) {
  const [etiqueta, setEtiqueta] = useState('');
  const [etiquetas, setEtiquetas] = useState<EtiquetaData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEtiquetas = async () => {
      if (selectedCredencial && open) {
        try {
          setLoading(true);
          const { data } = await getData({
            endpoint: `/credenciales/${selectedCredencial.idCredencial}/etiquetas`,
          });

          if (data && Array.isArray(data)) {
            const activeEtiquetas = data.filter((etq: EtiquetaData) => etq.estado === 'Activo');
            setEtiquetas(activeEtiquetas);
          } else {
            setEtiquetas([]);
          }
        } catch (error) {
          setEtiquetas([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEtiquetas();
  }, [open, selectedCredencial]);

  const handleAddEtiqueta = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && etiqueta.trim()) {
      e.preventDefault();
      if (!etiquetas.some((etq) => etq.nombre === etiqueta.trim())) {
        setEtiquetas([...etiquetas, { nombre: etiqueta.trim(), estado: 'Activo' }]);
      }
      setEtiqueta('');
    }
  };

  const handleRemoveEtiqueta = (etiquetaToRemove: string) => {
    setEtiquetas(etiquetas.filter((etq) => etq.nombre !== etiquetaToRemove));
  };

  const handleSave = async () => {
    if (selectedCredencial) {
      const endpoint = `/credenciales/${selectedCredencial.idCredencial}/etiquetas`;
      const etiquetasData = etiquetas.map((etq) => etq.nombre).join(',');

      try {
        setLoading(true);
        await updateRecord({ endpoint, data: { etiquetas: etiquetasData } });
        onSave();
        onClose();
      } catch (error) {
        console.error('Error saving etiquetas:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <DefaultModal open={open} onClose={onClose} title='Administrar Etiquetas'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label='Etiqueta'
            value={etiqueta}
            onChange={(e) => setEtiqueta(e.target.value)}
            onKeyDown={handleAddEtiqueta}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <BookmarkBorder />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mt: 2,
          }}
        >
          {etiquetas.map((etq) => (
            <Chip
              key={etq.nombre}
              label={etq.nombre}
              variant='outlined'
              onDelete={() => handleRemoveEtiqueta(etq.nombre)}
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
              fontFamily: 'MadaniArabic-SemiBold',
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
            disabled={!etiquetas.length || loading}
            sx={{
              py: 1,
              px: 3,
              borderRadius: '8px',
              fontFamily: 'MadaniArabic-SemiBold',
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
