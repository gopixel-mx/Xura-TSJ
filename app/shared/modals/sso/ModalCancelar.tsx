import {
  Button,
  Box,
  Typography,
} from '@mui/material';
import { Close, DoNotDisturbAltOutlined } from '@mui/icons-material';
import { TableTemplate } from '@/app/shared/common';
import { ColDef } from 'ag-grid-community';
import DefaultModal from '../DefaultModal';

interface ModalCancelarProps {
  open: boolean;
  onClose: () => void;
  selectedRows: any[];
  colDefs: ColDef[];
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
  selectedRows,
  colDefs,
  onConfirmCancel,
}: ModalCancelarProps) {
  return (
    <DefaultModal open={open} onClose={onClose} title='¿Deseas cancelarlos?'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {selectedRows.length > 0 ? (
          <Box sx={{ height: 308.5, display: 'flex', flexDirection: 'column' }}>
            <TableTemplate
              rowData={selectedRows}
              colDefs={colDefs}
              pageSize={20}
            />
          </Box>
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
            mt: 3,
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
