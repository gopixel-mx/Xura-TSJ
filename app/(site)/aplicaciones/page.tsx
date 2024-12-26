import { Paper, Typography } from '@mui/material';
import { TableAplicaciones } from '@/app/components/aplicaciones';
import { BottomActionButtons } from '@/app/shared/common';

export default function AplicacionesPage() {
  return (
    <Paper elevation={3} sx={{ width: '100%', padding: 4 }}>
      <Typography
        variant='h4'
        component='h1'
        gutterBottom
        align='left'
      >
        Aplicaciones
      </Typography>
      <TableAplicaciones />
      <BottomActionButtons />
    </Paper>
  );
}
