'use client';

import { useState } from 'react';
import {
  FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';

export default function FilterSelect() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FormControl sx={{ width: '120px' }}>
      <InputLabel id='filter-select-label'>Filtros</InputLabel>
      <Select
        labelId='filter-select-label'
        id='filter-select'
        value={selectedOption}
        label='Filtros'
        onChange={handleChange}
      >
        <MenuItem value={1}>Fecha</MenuItem>
        <MenuItem value={2}>Periodo</MenuItem>
      </Select>
    </FormControl>
  );
}
