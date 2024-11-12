import {
  Button,
  Box,
  Typography,
  Grid,
} from '@mui/material';
import { Close, DoNotDisturbAltOutlined } from '@mui/icons-material';
import DefaultModal from '../DefaultModal';

interface ModalCancelarProps {
  open: boolean;
  onClose: () => void;
  selectedKeys: string[];
  onConfirmCancel: () => void;
}

const buttonStyles = {
  py: 1,
  px: 3,
  borderRadius: '8px',
  fontFamily: 'MadaniArabic-SemiBold',
  textTransform: 'capitalize',
  fontSize: '0.875rem',
};

export default function ModalCancelar({
  open,
  onClose,
  selectedKeys,
  onConfirmCancel,
}: ModalCancelarProps) {
  const maxDisplayCount = 5;

  return (
    <DefaultModal open={open} onClose={onClose} title='¿Deseas cancelarlos?'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {selectedKeys.length <= maxDisplayCount ? (
          <Grid container spacing={2}>
            {selectedKeys.map((key) => (
              <Grid item xs={12} key={key}>
                <Typography variant='body1'>
                  Clave:
                  {' '}
                  {key}
                </Typography>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant='body1'>
            Se cancelarán varias aplicaciones seleccionadas.
          </Typography>
        )}
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
            onClick={onClose}
            startIcon={<Close />}
            sx={{
              ...buttonStyles,
              backgroundColor: '#32169b',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#14005E',
              },
            }}
          >
            Cerrar
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={onConfirmCancel}
            startIcon={<DoNotDisturbAltOutlined />}
            sx={{
              ...buttonStyles,
              backgroundColor: '#d32f2f',
              '&:hover': { backgroundColor: '#b71c1c' },
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </DefaultModal>
  );
}
