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
  selectedRow: { idCredencial: number; perfil: string; grupo: string } | null;
  mode: 'Perfil' | 'Grupos';
}

interface PerfilGrupoData {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
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
}: ModalPerfilGruposProps) {
  const [rowData, setRowData] = useState<PerfilGrupoData[]>([]);
  const [updatedData, setUpdatedData] = useState<PerfilGrupoData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { setNoti } = useAuthContext();

  useEffect(() => {
    if (selectedRow && open) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const endpoint = mode === 'Perfil' ? `/roles/perfiles` : `/grupos`;
          const { data } = await getData({ endpoint });
          setRowData(data || []);
        } catch (error) {
          setNoti({
            open: true,
            type: 'error',
            message: `Error al cargar ${mode.toLowerCase()}s.`,
          });
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [open, selectedRow, mode, setNoti]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const endpoint = mode === 'Perfil'
        ? `/roles/${selectedRow?.idCredencial}/perfiles`
        : `/grupos`;
      await updateRecord({
        endpoint,
        data: updatedData,
      });

      setNoti({
        open: true,
        type: 'success',
        message: `${mode} actualizado correctamente.`,
      });
      onClose();
    } catch (error) {
      setNoti({
        open: true,
        type: 'error',
        message: `Error al actualizar el ${mode.toLowerCase()}.`,
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
      sortable: true,
      filter: true,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      flex: 2,
      editable: false,
      sortable: true,
      filter: true,
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
              enableSelection
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
