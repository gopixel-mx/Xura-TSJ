'use client';

import {
  Alert, Snackbar, Slide, SlideProps,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface SnackAlertProps {
  open: boolean;
  close: () => void;
  type: 'error' | 'warning' | 'info' | 'success';
  mensaje?: string;
}

function SlideTransition(props: SlideProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide {...props} direction='left' />;
}

export default function SnackAlert({
  open,
  close,
  type,
  mensaje = '',
}: SnackAlertProps) {
  const [internalType, setInternalType] = useState(type);

  useEffect(() => {
    if (open) {
      setInternalType(type);
    }
  }, [open, type]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={close}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={SlideTransition}
    >
      <Alert
        variant='filled'
        onClose={close}
        severity={internalType}
        sx={{ width: '100%' }}
      >
        {mensaje}
      </Alert>
    </Snackbar>
  );
}

SnackAlert.defaultProps = {
  mensaje: '',
};
