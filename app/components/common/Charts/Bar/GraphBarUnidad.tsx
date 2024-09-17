'use client';

import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { getMatriculaByNombre } from '@/app/services/handlers/getMatricula';

interface BarUnidadProps {
  nameUnidad: string;
  width?: number;
  height?: number;
}

export default function GraphBarUnidad({ nameUnidad, width = 1350, height = 400 }: BarUnidadProps) {
  const [chartData, setChartData] = useState<{ abreviacion: string; cantidad: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMatriculaByNombre(nameUnidad);
      setChartData(data);
    };

    fetchData();
  }, [nameUnidad]);

  const labels = chartData.map((item) => item.abreviacion);
  const values = chartData.map((item) => item.cantidad);

  return (
    <Box sx={{ width, height, padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant='h6' component='h2' gutterBottom>
          Carreras en la Unidad Académica
          {nameUnidad}
        </Typography>

        <BarChart
          xAxis={[
            {
              id: 'carreras',
              data: labels,
              scaleType: 'band',
            },
          ]}
          series={[
            {
              id: 'cantidad',
              data: values,
            },
          ]}
          width={width - 20}
          height={height}
        />
      </Paper>
    </Box>
  );
}

GraphBarUnidad.defaultProps = {
  width: 1450,
  height: 400,
};
