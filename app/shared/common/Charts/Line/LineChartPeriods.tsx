'use client';

import { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Paper } from '@mui/material';

interface LineChartProps {
  xAxisData: string[];
  yAxisData: number[];
  label?: string;
  color?: string;
  yAxisRange?: { min: number; max: number };
}

export default function DynamicLineChart({
  xAxisData,
  yAxisData,
  label = 'Datos',
  color = '#8884d8',
  yAxisRange = { min: 0, max: Math.max(...yAxisData) * 1.2 },
}: LineChartProps) {
  const [chartDimensions, setChartDimensions] = useState({ width: 200, height: 200 });

  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(window.innerWidth * 0.9, 430);
      const height = Math.min(window.innerHeight * 0.5, 390);
      setChartDimensions({ width, height });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const series = [{
    data: yAxisData,
    label,
    color,
  }];

  return (
    <Box sx={{ width: '100%', padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 2, height: '100%', minHeight: chartDimensions.height }}>
        <LineChart
          xAxis={[
            {
              data: xAxisData,
              scaleType: 'point',
            },
          ]}
          yAxis={[yAxisRange]}
          series={series}
          height={chartDimensions.height}
        />
      </Paper>
    </Box>
  );
}
