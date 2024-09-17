'use client';

import { useState } from 'react';
import {
  Box, Paper, Select, MenuItem, Typography, FormControl, InputLabel,
} from '@mui/material';

export default function CardFilter() {
  const [selectedOption, setSelectedOption] = useState('');
  const total = 100;

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
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
          width: '700px',
        }}
      >
        <FormControl sx={{ width: '250px' }}>
          <InputLabel id='demo-simple-select-label'>Filtros</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={selectedOption}
            label='Filtros'
            onChange={handleChange}
          >
            <MenuItem value={1}>Fecha</MenuItem>
            <MenuItem value={2}>Periodo</MenuItem>
          </Select>
        </FormControl>
        <Typography
          sx={{
            marginRight: 15,
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
        >
          Total alumnos TEC:
          {total}
        </Typography>
      </Paper>
    </Box>
  );
}
