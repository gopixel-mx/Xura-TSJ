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
} from '@mui/icons-material';

interface ActionButtonsProps {
  tableType: 'aplicaciones' | 'credenciales';
  selectedRowsCount: number;
  // eslint-disable-next-line no-unused-vars
  onButtonClick: (actionType: string) => void;
}

export default function ActionButtons({
  tableType,
  selectedRowsCount,
  onButtonClick,
}: ActionButtonsProps) {
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

  const isMultipleSelection = selectedRowsCount > 1;
  const isSingleSelection = selectedRowsCount === 1;

  const buttonsConfig = [
    {
      id: 'agregar',
      label: 'Agregar',
      icon: <Add />,
      disabled: isMultipleSelection || isSingleSelection,
      show: true,
    },
    {
      id: 'consultar',
      label: 'Consultar',
      icon: <Search />,
      disabled: isMultipleSelection,
      show: true,
    },
    {
      id: 'editar',
      label: 'Editar',
      icon: <EditOutlined />,
      disabled: isMultipleSelection,
      show: true,
    },
    {
      id: 'cancelar',
      label: 'Cancelar',
      icon: <Close />,
      show: true,
    },
    {
      id: 'perfil',
      label: 'Perfil',
      icon: <PersonOutline />,
      disabled: isMultipleSelection,
      show: tableType === 'credenciales',
    },
    {
      id: 'grupos',
      label: 'Grupos',
      icon: <GroupsOutlined />,
      disabled: isMultipleSelection,
      show: tableType === 'credenciales',
    },
    {
      id: 'etiquetas',
      label: 'Etiquetas',
      icon: <BookmarkBorder />,
      disabled: isMultipleSelection,
      show: tableType === 'credenciales',
    },
    {
      id: 'subir',
      label: 'Subir',
      icon: <FileUploadOutlined />,
      disabled: isMultipleSelection,
      show: tableType === 'credenciales',
    },
  ];

  return (
    <Box sx={{
      display: 'flex', justifyContent: 'flex-end', gap: 2, marginBottom: 2,
    }}
    >
      {buttonsConfig.map(
        (button) => button.show && (
          <Button
            key={button.id}
            variant='outlined'
            startIcon={button.icon}
            sx={customButtonStyles}
            onClick={() => onButtonClick(button.label)}
            disabled={button.disabled}
          >
            {button.label}
          </Button>
        ),
      )}
    </Box>
  );
}
