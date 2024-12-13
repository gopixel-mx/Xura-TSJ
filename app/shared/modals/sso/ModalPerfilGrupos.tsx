'use client';

import { useState, useEffect } from 'react';
import {
  Box, Button, CircularProgress,
} from '@mui/material';
import { Close, Add } from '@mui/icons-material';
import { getData, updateRecord } from '@/app/shared/utils/apiUtils';
import { TableTemplate } from '@/app/shared/common';
import { useAuthContext } from '@/app/context/AuthContext';
import DefaultModal from '../DefaultModal';

interface ModalPerfilGruposProps {
  open: boolean;
  onClose: () => void;
  selectedRow: { idCredencial: string } | null;
  mode: 'Perfil' | 'Grupos';
  // eslint-disable-next-line no-unused-vars
  setShouldReload: (value: boolean) => void;
}

interface PerfilGrupoData {
  idRol: number;
  idGrupo: number;
  nombre: string;
  estado: string;
  seleccionado: number;
}

const buttonStyles = {
  py: 1,
  px: 3,
  borderRadius: '8px',
  fontFamily: 'MadaniArabic-SemiBold',
  textTransform: 'capitalize',
  fontSize: '0.875rem',
};

export default function ModalPerfilGrupos({
  open,
  onClose,
  selectedRow,
  mode,
  setShouldReload,
}: ModalPerfilGruposProps) {
  const [rowData, setRowData] = useState<PerfilGrupoData[]>([]);
  const [updatedRoles, setUpdatedRoles] = useState<{
    [key: number]: number;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { setNoti } = useAuthContext();

  useEffect(() => {
    const fetchRoles = async () => {
      if (selectedRow && open) {
        try {
          setLoading(true);
          const endpoint = mode === 'Perfil'
            ? `/roles/${selectedRow.idCredencial}/select`
            : `/grupos/${selectedRow.idCredencial}/select`;
          const { data } = await getData({ endpoint });
          setRowData(data || []);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRoles();
  }, [open, selectedRow, mode]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const updates = rowData.map((item) => (mode !== 'Perfil' ? {
        idGrupo: item.idGrupo,
        seleccionado: updatedRoles[item.idGrupo]
            ?? item.seleccionado,
      } : { idRol: item.idRol, seleccionado: updatedRoles[item.idRol] ?? item.seleccionado }));

      const endpoint = mode === 'Perfil'
        ? `/roles/${selectedRow?.idCredencial}/perfiles`
        : `/grupos/${selectedRow?.idCredencial}/miembros`;

      await updateRecord({
        endpoint,
        data: updates,
      });

      setNoti({
        open: true,
        type: 'success',
        message: `${mode === 'Perfil' ? 'Roles' : 'Grupos'} actualizados correctamente!`,
      });
      setShouldReload(true);
      onClose();
    } catch (error) {
      setNoti({
        open: true,
        type: 'error',
        message: `Error al actualizar los ${mode === 'Perfil' ? 'roles' : 'grupos'}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const colDefs = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 2,
      editable: false,
    },
    {
      field: 'seleccionado',
      headerName: 'Seleccionar',
      flex: 2,
      editable: true,
      cellEditor: 'agCheckboxCellEditor',
      cellRenderer: 'agCheckboxCellRenderer',
      valueGetter: (params: any) => params.data.seleccionado === 1,
      valueSetter: (params: any) => {
        const newValue = params.newValue ? 1 : 0;
        setUpdatedRoles((prev) => ({
          ...prev,
          [params.data.idRol]: newValue,
        }));
        // eslint-disable-next-line no-param-reassign
        params.data.seleccionado = newValue;
        return true;
      },
    },
  ];

  return (
    <DefaultModal
      open={open}
      onClose={onClose}
      title={`Administrar ${mode}`}
    >
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Box sx={{ width: '100%', overflowX: 'auto', mb: 2 }}>
            <TableTemplate
              rowData={rowData}
              colDefs={colDefs}
              pageSize={20}
              loading={loading}
              height={350}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
            }}
          >
            <Button
              variant='contained'
              startIcon={<Close />}
              onClick={onClose}
              sx={{
                ...buttonStyles,
                backgroundColor: 'rgb(255, 77, 99)',
                color: '#fff',
                '&:hover': { backgroundColor: 'rgb(200, 50, 70)' },
              }}
            >
              Cancelar
            </Button>
            <Button
              variant='contained'
              startIcon={<Add />}
              onClick={handleSave}
              disabled={loading}
              sx={{
                ...buttonStyles,
                backgroundColor: '#32169b',
                '&:hover': {
                  backgroundColor: '#14005E',
                },
              }}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      )}
    </DefaultModal>
  );
}
