import React from 'react';

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
  icon?: React.ReactNode;
  type?: 'select' | 'text';
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

export const RolGrupoFields: Field[] = [
  { name: 'clave', label: 'Clave', icon: <EditOutlined /> },
  { name: 'nombre', label: 'Nombre', icon: <EditOutlined /> },
];

export const CredencialFields: Field[] = [
  { name: 'curp', label: 'CURP', icon: <PersonOutline /> },
  { name: 'usuario', label: 'Usuario', icon: <PersonOutline /> },
  { name: 'celular', label: 'Celular', icon: <SmartphoneOutlined /> },
  { name: 'correo', label: 'Correo', icon: <MailOutlined /> },
  { name: 'grupo', label: 'Grupo', type: 'select' },
  { name: 'etiquetas', label: 'Etiquetas', type: 'select' },
  { name: 'perfil', label: 'Perfil', type: 'select' },
];
