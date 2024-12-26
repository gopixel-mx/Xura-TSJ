import {
  Button,
  Box,
} from '@mui/material';
import { Close, Add } from '@mui/icons-material';
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
        <Box sx={{ height: 308.8, display: 'flex', flexDirection: 'column' }}>
          <TableTemplate
            rowData={selectedRows}
            colDefs={colDefs}
            pageSize={20}
          />
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
              ...buttonStyles,
              backgroundColor: 'rgb(255, 77, 99)',
              color: '#fff',
              '&:hover': { backgroundColor: 'rgb(200, 50, 70)' },
            }}
          >
            Cancelar
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={onConfirmCancel}
            startIcon={<Add />}
            sx={{
              ...buttonStyles,
              backgroundColor: '#32169b',
              '&:hover': {
                backgroundColor: '#14005E',
              },
            }}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </DefaultModal>
  );
}
