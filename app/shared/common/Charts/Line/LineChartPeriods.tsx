'use client';

import { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from '@mui/material';
import { getPeriodos } from '@/app/services/handlers/getMatricula';
// import { getColorByYear } from '@/app/mocks/periodosColors';

interface PeriodoEstudiantes {
  periodo: string;
  estudiantes: number;
}

export default function LineChartPeriods() {
  const [data, setData] = useState<PeriodoEstudiantes[]>([]);

  useEffect(() => {
    const fetchPeriodos = async () => {
      const periodosData: PeriodoEstudiantes[] = await getPeriodos();
      setData(periodosData);
    };
    fetchPeriodos();
  }, []);

  // Filtramos los periodos A y B
  const periodosA = data.filter((item) => item.periodo.endsWith('A'));
  const periodosB = data.filter((item) => item.periodo.endsWith('B'));

  // Ordenamos el eje X: Primero los periodos B, luego los periodos A, por cada año
  const xAxisData = periodosB.map((item) => `${item.periodo.slice(0, 4)}B`)
    .concat(periodosA.map((item) => `${item.periodo.slice(0, 4)}A`));

  // Datos de estudiantes para ambos periodos
  const estudiantesBData = periodosB.map((item) => item.estudiantes);
  const estudiantesAData = periodosA.map((item) => item.estudiantes);

  // Creamos dos series, una para cada periodo (A y B)
  const series = [
    {
      data: estudiantesBData,
      label: 'Estudiantes Periodo B',
      color: '#8884d8', // Color para la línea de los periodos B
    },
    {
      data: estudiantesAData,
      label: 'Estudiantes Periodo A',
      color: '#82ca9d', // Color para la línea de los periodos A
    },
  ];

  return (
    <Box sx={{ width: '100%', height: 800 }}>
      <LineChart
        xAxis={[
          {
            data: xAxisData, // Eje X con periodos B primero, luego periodos A
            scaleType: 'point',
            // tickPadding: 20, // Ajustamos los ticks
          },
        ]}
        yAxis={[{ min: 1000 }]} // Ajustamos el eje Y para no empezar en 0
        series={series}
        width={500}
        height={400}
      />
    </Box>
  );
}
