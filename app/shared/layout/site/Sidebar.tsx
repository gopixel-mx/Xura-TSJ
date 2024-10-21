'use client';

import React, { useState } from 'react';
import { Box, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <Box
      sx={{
        width: isOpen ? 250 : 60, // Cambia el ancho según el estado isOpen
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        bgcolor: 'grey.200',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: isOpen ? 'flex-start' : 'center', // Alineación de íconos
        paddingTop: 8,
        transition: 'width 0.3s ease-in-out', // Corregido, transición suave
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Íconos */}
      <Link href='/dashboard' passHref>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            px: 2,
            mt: 2,
            color: 'black',
          }}
        >
          <HomeIcon sx={{ cursor: 'pointer', mr: isOpen ? 2 : 0 }} />
          {isOpen && <ListItemText primary='Home' sx={{ textDecoration: 'none' }} />}
        </Box>
      </Link>

      <Link href='/' passHref>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            px: 2,
            mt: 2,
            color: 'black',
          }}
        >
          <PersonIcon sx={{ cursor: 'pointer', mr: isOpen ? 2 : 0 }} />
          {isOpen && (
            <ListItemText primary='Profile' sx={{ textDecoration: 'none' }} />
          )}
        </Box>
      </Link>

      <Link href='/' passHref>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            px: 2,
            mt: 2,
            color: 'black',
          }}
        >
          <SettingsIcon sx={{ cursor: 'pointer', mr: isOpen ? 2 : 0 }} />
          {isOpen && <ListItemText primary='Settings' sx={{ textDecoration: 'none' }} />}
        </Box>
      </Link>

      <Link href='/' passHref>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            px: 2,
            mt: 2,
            color: 'black',
          }}
        >
          <LogoutIcon sx={{ cursor: 'pointer', mr: isOpen ? 2 : 0 }} />
          {isOpen && <ListItemText primary='Logout' sx={{ textDecoration: 'none' }} />}
        </Box>
      </Link>
    </Box>
  );
}

export default Sidebar;
