'use client';

import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { BarChart, axisClasses } from '@mui/x-charts';
import { useRouter } from 'next/navigation';
import { unidadesAcademicas } from '@/app/mocks/unidadesAcademicas';
import { getMatricula } from '@/app/services/handlers/getMatricula';

interface BarchartTemplateProps {
  title: string;
  description?: string;
  image?: string;
  clase: string;
}

export default function GraphBarAll({
  title, description, image, clase,
}: BarchartTemplateProps) {
  const [chartData, setChartData] = useState<
    { clave: string; nombre: string; cantidad: number }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const data = await getMatricula(clase);
      setChartData(data);
    };

    loadData();
  }, [clase]);

  const claves = chartData.map((item, index) => `${item.clave}-${index}`);
  const values = chartData.map((item) => item.cantidad);
  const names = chartData.map((item) => item.nombre);

  const getColorByClave = (clave: string) => {
    const originalClave = clave.split('-')[0];
    const unidad = unidadesAcademicas.find((u) => u.clave === originalClave);
    return unidad ? unidad.color : '#000000';
  };

  const colors = claves.map((clave) => getColorByClave(clave));

  const chartWidth = Math.max(400, claves.length * 100);
  const chartHeight = 300;

  const handleBarClick = (nombre: string) => {
    router.push(`/dashboard/unidad/${nombre}`);
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2, height: '100%', minHeight: chartHeight }}>
        {image && (
          <Box
            component='img'
            sx={{
              height: 200, width: '100%', objectFit: 'cover', mb: 2,
            }}
            alt={title}
            src={image}
          />
        )}
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        {description && (
          <Typography variant='body2' sx={{ color: 'textSecondary' }}>
            {description}
          </Typography>
        )}
        <BarChart
          xAxis={[
            {
              scaleType: 'band',
              data: claves,
              colorMap: { type: 'ordinal', values: claves, colors },
              valueFormatter: (clave, context) => (context.location === 'tick'
                ? clave.split('-')[0]
                : names[claves.indexOf(clave)]),
            },
          ]}
          series={[
            {
              data: values,
            },
          ]}
          onItemClick={(event, { dataIndex }) => {
            const nombre = names[dataIndex];
            handleBarClick(nombre);
          }}
          width={chartWidth}
          height={chartHeight}
          sx={{
            [`.${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translate(-20px, 0)',
            },
          }}
        />
      </Paper>
    </Box>
  );
}

GraphBarAll.defaultProps = {
  description: '',
  image: '',
};
