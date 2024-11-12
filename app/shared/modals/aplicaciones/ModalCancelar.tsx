import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface ModalCancelarProps {
  open: boolean;
  onClose: () => void;
  selectedKeys: string[];
  onConfirmCancel: () => void;
}

export default function ModalCancelar({
  open,
  onClose,
  selectedKeys,
  onConfirmCancel,
}: ModalCancelarProps) {
  const maxDisplayCount = 5;

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle>¿Deseas cancelarlos?</DialogTitle>
      <DialogContent>
        {selectedKeys.length <= maxDisplayCount ? (
          <Box>
            {selectedKeys.map((key) => (
              <Typography key={key}>
                Clave:
                {key}
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography>Se cancelarán varias aplicaciones seleccionadas.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined'>
          Cerrar
        </Button>
        <Button onClick={onConfirmCancel} variant='contained' color='error'>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
