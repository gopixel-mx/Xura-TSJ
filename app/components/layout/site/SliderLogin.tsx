'use client';

import { Box, Button } from '@mui/material';
import { useState } from 'react';

export default function SliderLogin() {
  const [active, setActive] = useState<'ingresa' | 'registrate'>('ingresa');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#32169b',
        borderRadius: '12px',
        overflow: 'hidden',
        width: '100%',
        height: '32px',
        padding: '3px',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: active === 'ingresa' ? '3px' : 'calc(50% + 3px)',
          transform: 'translateY(-50%)',
          width: 'calc(50% - 6px)',
          height: '80%',
          backgroundColor: 'white',
          borderRadius: '12px',
          transition: 'left 0.3s ease',
        }}
      />
      <Button
        onClick={() => setActive('ingresa')}
        sx={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'transparent',
          color: active === 'ingresa' ? 'black' : 'white',
          width: '50%',
          height: '100%',
          fontFamily: 'MadaniArabic-SemiBold',
          fontSize: '13px',
          textTransform: 'capitalize',
          borderRadius: '10px',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        Ingresa
      </Button>
      <Button
        onClick={() => setActive('registrate')}
        sx={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'transparent',
          color: active === 'registrate' ? 'black' : 'white',
          width: '50%',
          height: '100%',
          fontFamily: 'MadaniArabic-SemiBold',
          fontSize: '13px',
          textTransform: 'capitalize',
          borderRadius: '10px',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        Registrate
      </Button>
    </Box>
  );
}
