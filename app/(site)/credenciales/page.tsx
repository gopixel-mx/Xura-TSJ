import { Paper, Typography } from '@mui/material';
import { TableCredenciales } from '@/app/components/credenciales';
import { BottomActionButtons } from '@/app/shared/common/Buttons';

export default function CredencialesPage() {
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
        Credenciales
      </Typography>
      <TableCredenciales />
      <BottomActionButtons />
    </Paper>
  );
}
