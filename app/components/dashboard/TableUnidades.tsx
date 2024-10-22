'use client';

import { useState, useEffect } from 'react';
import { ColDef } from 'ag-grid-community';
import { getMatriculaTotalUnidades } from '@/app/services/handlers/getMatricula';
import { TableTemplate } from '@/app/shared/common';

// Definir la interfaz para los datos de la tabla
interface UnidadData {
  nombre: string;
  cantidad: number;
}

export default function TableUnidades() {
  // Estado para los datos de la tabla
  const [rowData, setRowData] = useState<UnidadData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Obtener datos del endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMatriculaTotalUnidades();
        setRowData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Definir las columnas para AG Grid
  const colDefs: ColDef[] = [
    {
      headerName: '#',
      valueGetter: 'node.rowIndex + 1', // Calcula el índice de la fila + 1
      width: 70,
      pinned: 'left', // Fija la columna a la izquierda
    },
    {
      field: 'nombre',
      headerName: 'Unidad Académica',
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      sortable: true,
      filter: true,
      flex: 1,
    },
  ];

  // Renderizar el componente TableTemplate
  return (
    <TableTemplate
      rowData={rowData} // Pasar los datos
      colDefs={colDefs} // Pasar las definiciones de columnas
      pageSize={20} // Número de filas por página
      loading={loading} // Pasar el estado de carga
    />
  );
}
