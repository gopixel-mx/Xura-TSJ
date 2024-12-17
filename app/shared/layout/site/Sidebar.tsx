'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';

const menuItems = [
  { icon: <HomeIcon />, label: 'Inicio', link: '/dashboard' },
  { icon: <AppsOutlinedIcon />, label: 'Aplicaciones', link: '/aplicaciones' },
  { icon: <WysiwygOutlinedIcon />, label: 'Módulos', link: '/modulos' },
  { icon: <ContactMailOutlinedIcon />, label: 'Credenciales', link: '/credenciales' },
  { icon: <GroupsOutlinedIcon />, label: 'Grupos', link: '/grupos' },
  { icon: <VpnKeyOutlinedIcon />, label: 'Roles', link: '/roles' },
  { icon: <LogoutIcon />, label: 'Salir', link: '/' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <Box
      sx={{
        width: isOpen ? 200 : 70,
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        bgcolor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        borderRight: '1px solid #ddd',
        zIndex: 1,
        paddingTop: 8,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {menuItems.map((item) => (
        <Link href={item.link} key={item.label} passHref>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              px: 2,
              py: 2,
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              '&:hover': { bgcolor: '#e0e0e0' },
            }}
          >
            <Box sx={{
              minWidth: 40,
              color: '#444',
              display: 'flex',
              justifyContent: 'center',
            }}
            >
              {item.icon}
            </Box>
            {isOpen && (
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#444',
                  ml: 2,
                  fontFamily: 'MadaniArabic-Regular',
                }}
              >
                {item.label}
              </Typography>
            )}
          </Box>
        </Link>
      ))}
    </Box>
  );
}
