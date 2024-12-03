import { Box, Paper, Typography } from '@mui/material';
import { TableCredenciales } from '@/app/components/credenciales';
import { BottomActionButtons } from '@/app/shared/common/Buttons';

export default function CredencialesPage() {
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
      <Paper elevation={3} sx={{ width: '90%', padding: 4 }}>
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
    </Box>
  );
}
