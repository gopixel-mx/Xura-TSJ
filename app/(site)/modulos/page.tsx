import { Paper, Typography } from '@mui/material';
import { TableModulos } from '@/app/components/modulos';
import { BottomActionButtons } from '@/app/shared/common/Buttons';

export default function ModulosPage() {
  return (
    <Paper elevation={3} sx={{ width: '100%', padding: 4 }}>
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
  );
}
