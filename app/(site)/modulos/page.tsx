import { Box, Paper, Typography } from '@mui/material';
import { TableModulos } from '@/app/components/modulos';
import BottomActionButtons from '@/app/shared/common/Buttons/BottomActionButtons';

export default function ModulosPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <Paper elevation={3} sx={{ width: '80%', padding: 4 }}>
        <Typography
          variant='h4'
          component='h1'
          gutterBottom
          align='left'
          sx={{
            fontFamily: 'MadaniArabic-Regular',
          }}
        >
          Modulos
        </Typography>
        <TableModulos />
        <BottomActionButtons />
      </Paper>
    </Box>
  );
}
