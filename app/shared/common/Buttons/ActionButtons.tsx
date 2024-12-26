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
  SellOutlined,
} from '@mui/icons-material';
import { madaniArabicRegular } from '@/public/assets/fonts';

interface ActionButtonsProps {
  tableType: 'aplicaciones' | 'credenciales' | 'grupos' | 'modulos' | 'roles';
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
  const notSelection = selectedRowsCount === 0;

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
      disabled: isMultipleSelection || notSelection,
      show: true,
    },
    {
      id: 'editar',
      label: 'Editar',
      icon: <EditOutlined />,
      disabled: isMultipleSelection || notSelection,
      show: true,
    },
    {
      id: 'cancelar',
      label: 'Cancelar',
      icon: <Close />,
      disabled: notSelection,
      show: true,
    },
    {
      id: 'perfil',
      label: 'Perfil',
      icon: <PersonOutline />,
      disabled: isMultipleSelection || notSelection,
      show: tableType === 'credenciales',
    },
    {
      id: 'grupos',
      label: 'Grupos',
      icon: <GroupsOutlined />,
      disabled: isMultipleSelection || notSelection,
      show: tableType === 'credenciales',
    },
    {
      id: 'etiquetas',
      label: 'Etiquetas',
      icon: <SellOutlined />,
      disabled: isMultipleSelection || notSelection,
      show: tableType === 'credenciales',
    },
    {
      id: 'permisos',
      label: 'Permisos',
      icon: <BookmarkBorder />,
      disabled: isMultipleSelection || notSelection,
      show: tableType === 'roles',
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
            className={madaniArabicRegular.className}
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
