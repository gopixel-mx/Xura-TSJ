'use client';

import { useState, useEffect } from 'react';
import { ColDef } from 'ag-grid-community';
import { getCredenciales } from '@/app/services/handlers/getMatricula';
import { TableTemplate, ActionButtons } from '@/app/shared/common';

interface CredencialData {
  curp: string;
  usuario: string;
  grupo: string;
  etiquetas: string;
  perfil: string;
  tipo: string;
  estado: string;
}

export default function TableCredenciales() {
  const [rowData, setRowData] = useState<CredencialData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRowsCount, setSelectedRowsCount] = useState<number>(0);

  // Obtener datos del endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCredenciales(); // Asume que tienes esta función en tu servicio
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
  const colDefs: ColDef[] = [
    {
      field: 'curp',
      headerName: 'CURP',
      sortable: true,
      filter: true,
      flex: 1,
      checkboxSelection: true,
    },
    {
      field: 'usuario',
      headerName: 'Usuario',
      sortable: true,
      filter: true,
      flex: 2,
    },
    {
      field: 'grupo',
      headerName: 'Grupo',
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      field: 'etiquetas',
      headerName: 'Etiquetas',
      sortable: true,
      filter: true,
      flex: 2,
    },
    {
      field: 'perfil',
      headerName: 'Perfil',
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      field: 'tipo',
      headerName: 'Tipo',
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      sortable: true,
      filter: true,
      flex: 1,
    },
  ];

  const isRowSelectable = (rowNode: any) => rowNode.data.grupos !== 'administrador';

  const handleRowSelectionChanged = (params: any) => {
    setSelectedRowsCount(params.api.getSelectedRows().length);
  };

  return (
    <>
      <ActionButtons
        agregar
        consultar
        editar
        cancelar
        perfil
        grupos
        etiquetas
        selectedRowsCount={selectedRowsCount}
      />
      <TableTemplate
        rowData={rowData}
        colDefs={colDefs}
        pageSize={10}
        loading={loading}
        rowSelection='multiple'
        isRowSelectable={isRowSelectable}
        onSelectionChanged={handleRowSelectionChanged}
      />
    </>
  );
}
