'use client';

import { Box, Paper, Typography } from '@mui/material';

export default function CardFilter() {
  const total = 100;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        width: '100%',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
          width: '230px',
          height: '120px',
        }}
      >
        <Typography
          sx={{
            marginRight: 15,
            fontSize: '1.1rem',
            fontWeight: 'bold',
          }}
        >
          Total TEC:
          {total}
        </Typography>
      </Paper>
    </Box>
  );
}
