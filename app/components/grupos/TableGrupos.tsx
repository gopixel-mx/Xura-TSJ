'use client';

import { useState, useEffect } from 'react';
import { ColDef } from 'ag-grid-community';
import { getData } from '@/app/shared/utils/apiUtils';
import { TableTemplate, ActionButtons } from '@/app/shared/common';

interface GrupoData {
  clave: string;
  nombre: string;
  estado: string;
}

export default function TableGrupos() {
  const [rowData, setRowData] = useState<GrupoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRowsCount, setSelectedRowsCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getData({ endpoint: '/grupos' });
        setRowData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const colDefs: ColDef[] = [
    // {
    //   headerName: '#',
    //   valueGetter: 'node.rowIndex + 1', // Calcula el índice de la fila + 1
    //   width: 70,
    //   pinned: 'left', // Fija la columna a la izquierda
    // },
    {
      field: 'clave',
      headerName: 'Clave',
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      sortable: true,
      filter: true,
      flex: 2,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      sortable: true,
      filter: true,
      flex: 1,
    },
  ];

  const isRowSelectable = (rowNode: any) => rowNode.data.clave !== 'General';

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
        selectedRowsCount={selectedRowsCount}
      />
      <TableTemplate
        rowData={rowData}
        colDefs={colDefs}
        pageSize={20}
        loading={loading}
        selectionMode='multiRow'
        isRowSelectable={isRowSelectable}
        onSelectionChanged={handleRowSelectionChanged}
      />
    </>
  );
}
