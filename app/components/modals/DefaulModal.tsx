'use client';

import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface DefaultModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function DefaultModal({
  open, onClose, title, children,
}: DefaultModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-title' variant='h6' component='h2'>
          {title}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
}
