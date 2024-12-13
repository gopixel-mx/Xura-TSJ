'use client';

import { useState, useEffect } from 'react';
import { ColDef } from 'ag-grid-community';
import {
  getData, createRecord, updateRecord, deleteRecord,
} from '@/app/shared/utils/apiUtils';
import { ModalAddCnl, ModalCancelar } from '@/app/shared/modals/sso';
import { AplicacionFields } from '@/app/services/handlers/formFields';
import { TableTemplate, ActionButtons } from '@/app/shared/common';
import { useAuthContext } from '@/app/context/AuthContext';

interface AplicacionData {
  clave: string;
  nombre: string;
  redireccion: string;
  estado: string;
  idAplicacion: number;
}

export default function TableAplicaciones() {
  const { setNoti } = useAuthContext();
  const [rowData, setRowData] = useState<AplicacionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRowsCount, setSelectedRowsCount] = useState<number>(0);
  const [selectedRowsData, setSelectedRowsData] = useState<AplicacionData[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<AplicacionData | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'agregar' | 'consultar' | 'editar'>('agregar');

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

  const handleSaveAplicacion = async (data: Record<string, string | string[]>) => {
    if (modalMode === 'editar' && selectedRowData) {
      const endpoint = `/aplicaciones/${selectedRowData.idAplicacion}`;
      const response = await updateRecord({ endpoint, data });

      if (response.errorMessage) {
        setNoti({
          open: true,
          type: 'error',
          message: response.errorMessage,
        });
      } else {
        const { data: responseData } = await getData({ endpoint: '/aplicaciones' });
        setRowData(responseData);
        setOpenModal(false);
        setNoti({
          open: true,
          type: 'success',
          message: '¡Aplicación actualizada con éxito!',
        });
      }
    } else {
      const response = await createRecord({ endpoint: '/aplicaciones', data });
      if (response.errorMessage) {
        setNoti({
          open: true,
          type: 'error',
          message: response.errorMessage,
        });
      } else {
        const { data: responseData } = await getData({ endpoint: '/aplicaciones' });
        setRowData(responseData);
        setOpenModal(false);
        setNoti({
          open: true,
          type: 'success',
          message: '¡Aplicación creada con éxito!',
        });
      }
    }
  };

  const handleOpenModal = (actionType: string) => {
    if (actionType === 'Agregar') {
      setModalMode('agregar');
      setSelectedRowData(null);
      setOpenModal(true);
    } else if (actionType === 'Consultar' && selectedRowsCount === 1) {
      setModalMode('consultar');
      setOpenModal(true);
    } else if (actionType === 'Editar' && selectedRowsCount === 1) {
      setModalMode('editar');
      setOpenModal(true);
    } else if (actionType === 'Cancelar' && selectedRowsCount >= 1) {
      setOpenCancelModal(true);
    }
  };

  const handleConfirmCancel = async () => {
    const idsToDelete = selectedRowsData.map((row) => row.idAplicacion);
    const endpoint = `/aplicaciones/${idsToDelete.join(',')}`;

    const response = await deleteRecord({ endpoint });
    if (response.errorMessage) {
      setNoti({
        open: true,
        type: 'error',
        message: response.errorMessage,
      });
    } else {
      setNoti({
        open: true,
        type: 'success',
        message: '¡Aplicaciones canceladas con éxito!',
      });
      setOpenCancelModal(false);
      const { data: responseData } = await getData({ endpoint: '/aplicaciones' });
      setRowData(responseData);
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
    const selectedRows = params.api.getSelectedRows();
    setSelectedRowsCount(selectedRows.length);
    setSelectedRowData(selectedRows.length === 1 ? selectedRows[0] : null);
    setSelectedRowsData(selectedRows);
  };

  return (
    <>
      <ActionButtons
        tableType='aplicaciones'
        selectedRowsCount={selectedRowsCount}
        onButtonClick={handleOpenModal}
      />
      <TableTemplate
        rowData={rowData}
        colDefs={colDefs}
        pageSize={20}
        loading={loading}
        selectionMode='multiRow'
        isRowSelectable={isRowSelectable}
        onSelectionChanged={handleRowSelectionChanged}
        enableSelection
      />
      <ModalAddCnl
        title='Aplicación'
        open={openModal}
        onClose={() => setOpenModal(false)}
        fields={AplicacionFields}
        onSubmit={handleSaveAplicacion}
        mode={modalMode}
        selectedData={selectedRowData}
      />
      <ModalCancelar
        open={openCancelModal}
        onClose={() => setOpenCancelModal(false)}
        selectedRows={selectedRowsData}
        colDefs={colDefs}
        onConfirmCancel={handleConfirmCancel}
      />
    </>
  );
}
