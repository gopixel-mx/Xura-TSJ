'use client';

import { useState, useEffect } from 'react';
import { ColDef } from 'ag-grid-community';
import { getAplicaciones } from '@/app/services/handlers/getMatricula';
import ActionButtons from '@/app/components/common/Buttons/ActionButtons';
import TableTemplate from './TableTemplate';

interface AplicacionData {
  clave: string;
  nombre: string;
  redireccion: string;
  estado: string;
}

export default function TableAplicaciones() {
  const [rowData, setRowData] = useState<AplicacionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRowsCount, setSelectedRowsCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAplicaciones();
        setRowData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const colDefs: ColDef[] = [
    {
      field: 'clave',
      headerName: 'Clave',
      sortable: true,
      filter: true,
      flex: 1,
      checkboxSelection: true,
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      sortable: true,
      filter: true,
      flex: 2,
    },
    {
      field: 'redireccion',
      headerName: 'Redireccion',
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

  const isRowSelectable = (rowNode: any) => rowNode.data.clave !== 'sso';

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
        pageSize={10}
        loading={loading}
        rowSelection='multiple'
        isRowSelectable={isRowSelectable}
        onSelectionChanged={handleRowSelectionChanged}
      />
    </>
  );
}
