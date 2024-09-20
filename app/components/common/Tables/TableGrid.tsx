'use client';

import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ColDef } from 'ag-grid-community';
import { getMatriculaTotalUnidades } from '@/app/services/handlers/getMatricula';

// Definir la interfaz para los datos de la tabla
interface UnidadData {
  nombre: string;
  cantidad: number;
}

export default function TableGrid() {
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
        console.error('Error al cargar los datos:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Definir las columnas para AG Grid
  const [colDefs] = useState<ColDef[]>([
    {
      headerName: '#',
      valueGetter: 'node.rowIndex + 1', // Calcula el índice de la fila + 1
      width: 70,
      pinned: 'left', // Fija la columna a la izquierda
    },
    {
      field: 'nombre', headerName: 'Unidad Académica', sortable: true, filter: true,
    },
    {
      field: 'cantidad', headerName: 'Cantidad', sortable: true, filter: true,
    },
  ]);

  // Renderizar un indicador de carga mientras se obtienen los datos
  if (loading) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
      }}
      >
        <div>Cargando datos...</div>
      </div>
    );
  }

  return (
    <div className='ag-theme-quartz' style={{ height: 500, width: '100%' }}>
      <AgGridReact
        rowData={rowData} // Asignar datos dinámicos
        columnDefs={colDefs} // Asignar definiciones de columnas
        pagination // Activar la paginación
        paginationPageSize={10} // Número de filas por página
      />
    </div>
  );
}
