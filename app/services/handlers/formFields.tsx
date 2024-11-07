import { ReactNode } from 'react';

import {
  LinkOutlined,
  EditOutlined,
  PersonOutline,
  SmartphoneOutlined,
  MailOutlined,
} from '@mui/icons-material';

interface Field {
  name: string;
  label: string;
  icon?: ReactNode;
  type?: 'select' | 'text';
  disabled?: boolean;
  multiple?: boolean;
}

export const AplicacionFields: Field[] = [
  { name: 'clave', label: 'Clave', icon: <EditOutlined /> },
  { name: 'nombre', label: 'Nombre', icon: <EditOutlined /> },
  { name: 'redireccion', label: 'Redirección', icon: <LinkOutlined /> },
];

export const ModuloFields: Field[] = [
  { name: 'clave', label: 'Clave', icon: <EditOutlined /> },
  { name: 'aplicacion', label: 'Aplicación', type: 'select' },
  { name: 'nombre', label: 'Nombre', icon: <EditOutlined /> },
];

export const RolFields: Field[] = [
  { name: 'clave', label: 'Clave', icon: <EditOutlined /> },
  { name: 'nombre', label: 'Nombre', icon: <EditOutlined /> },
];

export const GrupoFields: Field[] = [
  { name: 'clave', label: 'Clave', icon: <EditOutlined /> },
  { name: 'nombre', label: 'Nombre', icon: <EditOutlined /> },
  {
    name: 'etiquetas', label: 'Etiquetas', type: 'select', multiple: true,
  },
];

export const CredencialFields: Field[] = [
  { name: 'curp', label: 'CURP', icon: <PersonOutline /> },
  {
    name: 'nombre',
    label: 'Nombre',
    icon: <PersonOutline />,
    disabled: true,
  },
  { name: 'celular', label: 'Celular', icon: <SmartphoneOutlined /> },
  { name: 'correo', label: 'Correo', icon: <MailOutlined /> },
  { name: 'contrasena', label: 'Contraseña', icon: <PersonOutline /> },
  {
    name: 'perfil',
    label: 'Perfil',
    type: 'select',
    multiple: true,
  },
  {
    name: 'grupo',
    label: 'Grupo',
    type: 'select',
    multiple: true,
  },
];
