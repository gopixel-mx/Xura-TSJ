'use client';

import { useParams } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { GraphBarUnidad } from '@/app/components/common';

const formatName = (name: string) => decodeURIComponent(name)
  .toLowerCase()
  .split(' ')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

export default function DashboardUnidadPage() {
  const { id } = useParams();

  const nombreUnidad = Array.isArray(id) ? id[0] : id;
  const formattedName = formatName(nombreUnidad);

  return (
    <Box>
      <Typography variant='h4'>
        Unidad Académica:
        {formattedName}
      </Typography>
      <GraphBarUnidad nameUnidad={formattedName} />
    </Box>
  );
}
