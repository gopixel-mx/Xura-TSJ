'use client';

import { useState, useEffect, useMemo } from 'react';
import { ColDef } from 'ag-grid-community';
import { TableTemplate } from '@/app/shared/common';
import { Box, Paper } from '@mui/material';

interface TableUnidadesProps {
  datos: any[];
}

export default function TableUnidades({ datos }: TableUnidadesProps) {
  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const colDefs: ColDef[] = useMemo(() => {
    if (datos && datos.length > 0) {
      return Object.keys(datos[0]).map((key) => ({
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        field: key,
        flex: 1, // This will evenly distribute width among columns
      }));
    }
    return [];
  }, [datos]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRowData(datos);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [datos]);

  return (
    <Box sx={{ width: '100%', padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
        {' '}
        <TableTemplate
          rowData={rowData}
          colDefs={colDefs}
          loading={loading}
        />
      </Paper>
    </Box>
  );
}
