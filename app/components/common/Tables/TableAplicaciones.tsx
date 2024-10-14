'use client';

import { useState, useEffect } from 'react';
import { ColDef } from 'ag-grid-community';
import { getAplicaciones, insertAplicacion } from '@/app/services/handlers/getMatricula';
import { ActionButtons } from '@/app/components/common/Buttons';
import ModalAplicaciones from '@/app/components/modals/aplicaciones/ModalAplicaciones';
import { AplicacionFields } from '@/app/services/handlers/formFields';
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
  const [openModal, setOpenModal] = useState<boolean>(false); // Estado para controlar el modal

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

  const handleInsertAplicacion = async (data: Record<string, string>) => {
    const { clave, nombre, redireccion } = data;
    try {
      await insertAplicacion(clave, nombre, redireccion);
      const datos = await getAplicaciones();
      setRowData(datos);
      setOpenModal(false); // Solo cierra el modal si la operación es exitosa
    } catch (error: any) {
      console.error('Error al insertar la aplicación:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        throw error; // Lanza el error para que ModalAplicaciones lo capture
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
        onAgregar={() => setOpenModal(true)}
      />
      <TableTemplate
        rowData={rowData}
        colDefs={colDefs}
        pageSize={20}
        loading={loading}
        rowSelection='multiple'
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
