'use client';

import { useState, useEffect } from 'react';
import { ColDef } from 'ag-grid-community';
import { getData } from '@/app/shared/utils/apiUtils';
import { insertAplicacion } from '@/app/services/handlers/getMatricula';
import ModalAplicaciones from '@/app/shared/modals/aplicaciones/ModalAplicaciones';
import { AplicacionFields } from '@/app/services/handlers/formFields';
import { TableTemplate, ActionButtons } from '@/app/shared/common';

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
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getData({ endpoint: '/aplicaciones' });
        setRowData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInsertAplicacion = async (data: Record<string, string>) => {
    const { clave, nombre, redireccion } = data;
    try {
      await insertAplicacion(clave, nombre, redireccion);
      // eslint-disable-next-line no-shadow
      const { data } = await getData({ endpoint: '/aplicaciones' });
      setRowData(data);
      setOpenModal(false);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        throw error;
      } else {
        throw new Error('Error inesperado en la inserción de la aplicación');
      }
    }
  };

  const colDefs: ColDef[] = [
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
        onAgregar={() => setOpenModal(true)}
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
      <ModalAplicaciones
        open={openModal}
        onClose={() => setOpenModal(false)}
        fields={AplicacionFields}
        onSubmit={handleInsertAplicacion}
      />
    </>
  );
}
