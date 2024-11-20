'use client';

import { useState, useEffect } from 'react';
import { ColDef } from 'ag-grid-community';
import {
  getData, createRecord, updateRecord, deleteRecord,
} from '@/app/shared/utils/apiUtils';
import { ModalAddCnl, ModalCancelar } from '@/app/shared/modals/sso';
import { RolFields } from '@/app/services/handlers/formFields';
import { TableTemplate, ActionButtons } from '@/app/shared/common';
import { useAuthContext } from '@/app/context/AuthContext';

interface AplicacionData {
  clave: string;
  nombre: string;
  estado: string;
  idRol?: number;
}

export default function TableRoles() {
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
        const { data } = await getData({ endpoint: '/roles' });
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
      const endpoint = `/roles/${selectedRowData.idRol}`;
      const response = await updateRecord({ endpoint, data });

      if (response.errorMessage) {
        setNoti({
          open: true,
          type: 'error',
          message: response.errorMessage,
        });
      } else {
        const { data: responseData } = await getData({ endpoint: '/roles' });
        setRowData(responseData);
        setOpenModal(false);
        setNoti({
          open: true,
          type: 'success',
          message: '¡Rol actualizado con éxito!',
        });
      }
    } else {
      const response = await createRecord({ endpoint: '/roles', data });
      if (response.errorMessage) {
        setNoti({
          open: true,
          type: 'error',
          message: response.errorMessage,
        });
      } else {
        const { data: responseData } = await getData({ endpoint: '/roles' });
        setRowData(responseData);
        setOpenModal(false);
        setNoti({
          open: true,
          type: 'success',
          message: '¡Rol creado con éxito!',
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
    const idsToDelete = selectedRowsData.map((row) => row.idRol);
    const endpoint = `/roles/${idsToDelete.join(',')}`;

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
        message: '¡Roles cancelados con éxito!',
      });
      setOpenCancelModal(false);
      const { data: responseData } = await getData({ endpoint: '/roles' });
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
      field: 'estado',
      headerName: 'Estado',
      sortable: true,
      filter: true,
      flex: 1,
    },
  ];

  const isRowSelectable = (rowNode: any) => {
    const nonSelectableRoles = ['admin', 'aspirante', 'alumno', 'docente'];
    return !nonSelectableRoles.includes(rowNode.data.clave);
  };

  const handleRowSelectionChanged = (params: any) => {
    const selectedRows = params.api.getSelectedRows();
    setSelectedRowsCount(selectedRows.length);
    setSelectedRowData(selectedRows.length === 1 ? selectedRows[0] : null);
    setSelectedRowsData(selectedRows);
  };

  return (
    <>
      <ActionButtons
        tableType='roles'
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
        title='Roles'
        open={openModal}
        onClose={() => setOpenModal(false)}
        fields={RolFields}
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
