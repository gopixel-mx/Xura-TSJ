'use client';

import { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from '@mui/material';
import { getPeriodos } from '@/app/services/handlers/getMatricula';

interface PeriodoEstudiantes {
  periodo: string;
  estudiantes: number;
}

export default function LineChartPeriods() {
  const [data, setData] = useState<PeriodoEstudiantes[]>([]);

  useEffect(() => {
    const fetchPeriodos = async () => {
      const periodosData: PeriodoEstudiantes[] = await getPeriodos(); // Llamamos al endpoint
      setData(periodosData); // Guardamos los datos en el estado
    };
    fetchPeriodos();
  }, []); // Se ejecuta una sola vez al montar el componente

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <LineChart
        xAxis={[{ data: data.map((item) => item.periodo), scaleType: 'point' }]}
        series={[
          {
            data: data.map((item) => item.estudiantes), // Datos de estudiantes
            label: 'Estudiantes',
          },
        ]}
        width={600}
        height={400}
      />
    </Box>
  );
}
