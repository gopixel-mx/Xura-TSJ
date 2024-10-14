'use client';

import { Box, Button } from '@mui/material';
import {
  Add,
  Search,
  EditOutlined,
  Close,
  PersonOutline,
  GroupsOutlined,
  BookmarkBorder,
  FileUploadOutlined,
  FileDownloadOutlined,
  Delete,
} from '@mui/icons-material';

interface ActionButtonProps {
  agregar?: boolean;
  consultar?: boolean;
  editar?: boolean;
  cancelar?: boolean;
  perfil?: boolean;
  grupos?: boolean;
  etiquetas?: boolean;
  subir?: boolean;
  descargar?: boolean;
  eliminar?: boolean;
  selectedRowsCount: number;
  onAgregar?: () => void;
}

export default function ActionButtons({
  agregar,
  consultar,
  editar,
  cancelar,
  perfil,
  grupos,
  etiquetas,
  subir,
  descargar,
  eliminar,
  selectedRowsCount,
  onAgregar,
}: ActionButtonProps) {
  const customButtonStyles = {
    borderRadius: '20px',
    color: 'rgb(50, 22, 155)',
    textTransform: 'capitalize',
    borderColor: 'rgb(50, 22, 155)',
    '&:hover': {
      backgroundColor: 'rgba(50, 22, 155, 0.08)',
      borderColor: 'rgb(50, 22, 155)',
    },
  };

  const isSingleSelection = selectedRowsCount === 1;
  const isMultipleSelection = selectedRowsCount > 1;

  const handleAction = (action: string) => {
    console.log(`${action} clickeado`);
  };

  return (
    <Box sx={{
      display: 'flex', justifyContent: 'flex-end', gap: 2, marginBottom: 2,
    }}
    >
      {
        agregar && (
          <Button
            variant='outlined'
            startIcon={<Add />}
            sx={customButtonStyles}
            onClick={onAgregar}
          >
            Agregar
          </Button>
        )
      }
      {
        consultar && (
          <Button
            variant='outlined'
            startIcon={<Search />}
            sx={customButtonStyles}
            onClick={() => handleAction('Consultar')}
            disabled={isMultipleSelection}
          >
            Consultar
          </Button>
        )
      }
      {
        editar && (
          <Button
            variant='outlined'
            startIcon={<EditOutlined />}
            sx={customButtonStyles}
            onClick={() => handleAction('Editar')}
            disabled={isMultipleSelection}
          >
            Editar
          </Button>
        )
      }
      {
        cancelar && (
          <Button
            variant='outlined'
            startIcon={<Close />}
            sx={customButtonStyles}
            onClick={() => handleAction('Cancelar')}
          >
            Cancelar
          </Button>
        )
      }
      {
        perfil && (
          <Button
            variant='outlined'
            startIcon={<PersonOutline />}
            sx={customButtonStyles}
            onClick={() => handleAction('Perfil')}
            disabled={isMultipleSelection}
          >
            Perfil
          </Button>
        )
      }
      {
        grupos && (
          <Button
            variant='outlined'
            startIcon={<GroupsOutlined />}
            sx={customButtonStyles}
            onClick={() => handleAction('Grupos')}
            disabled={isMultipleSelection}
          >
            Grupos
          </Button>
        )
      }
      {
        etiquetas && (
          <Button
            variant='outlined'
            startIcon={<BookmarkBorder />}
            sx={customButtonStyles}
            onClick={() => handleAction('Etiquetas')}
            disabled={isMultipleSelection}
          >
            Etiquetas
          </Button>
        )
      }
      {
        subir && (
          <Button
            variant='outlined'
            startIcon={<FileUploadOutlined />}
            sx={customButtonStyles}
            onClick={() => handleAction('Subir')}
            disabled={isMultipleSelection}
          >
            Subir
          </Button>
        )
      }
      {
        descargar && (
          <Button
            variant='outlined'
            startIcon={<FileDownloadOutlined />}
            sx={customButtonStyles}
            onClick={() => handleAction('Descargar')}
            disabled={isMultipleSelection}
          >
            Descargar
          </Button>
        )
      }
      {
        eliminar && (
          <Button
            variant='outlined'
            startIcon={<Delete />}
            sx={customButtonStyles}
            onClick={() => handleAction('Eliminar')}
            disabled={isMultipleSelection}
          >
            Eliminar
          </Button>
        )
      }
    </Box>
  );
}

ActionButtons.defaultProps = {
  agregar: undefined,
  consultar: undefined,
  editar: undefined,
  cancelar: undefined,
  perfil: undefined,
  grupos: undefined,
  etiquetas: undefined,
  subir: undefined,
  descargar: undefined,
  eliminar: undefined,
  onAgregar: undefined,
};
