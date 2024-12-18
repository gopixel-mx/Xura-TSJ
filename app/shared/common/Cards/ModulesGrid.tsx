'use client';

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import Link from 'next/link';

const moduleCards = [
  { icon: <AppsOutlinedIcon fontSize='large' />, title: 'Aplicaciones', link: '/aplicaciones' },
  { icon: <WysiwygOutlinedIcon fontSize='large' />, title: 'Módulos', link: '/modulos' },
  { icon: <ContactMailOutlinedIcon fontSize='large' />, title: 'Credenciales', link: '/credenciales' },
  { icon: <GroupsOutlinedIcon fontSize='large' />, title: 'Grupos', link: '/grupos' },
  { icon: <VpnKeyOutlinedIcon fontSize='large' />, title: 'Roles', link: '/roles' },
];

export default function ModulesGrid() {
  const accessibleCards = moduleCards;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        width: '100%',
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent='center'
        sx={{ maxWidth: 1100 }}
      >
        {accessibleCards.map((module) => (
          <Grid
            item
            xs={accessibleCards.length === 1 ? 12 : 6}
            md={accessibleCards.length > 3 ? 4 : 6}
            key={module.title}
          >
            <Link href={module.link} passHref>
              <Card
                elevation={3}
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    height: 200,
                  }}
                >
                  <Box sx={{ mb: 1 }}>{module.icon}</Box>
                  <Typography
                    variant='h6'
                    sx={{ fontWeight: '500', fontFamily: 'MadaniArabic-Regular' }}
                  >
                    {module.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
