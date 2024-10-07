import { Box, Paper, Typography } from '@mui/material';
import { TableGrupos } from '@/app/components/common/Tables';
import BottomActionButtons from '@/app/components/common/Buttons/BottomActionButtons';

export default function GruposPage() {
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
          Grupos
        </Typography>
        <TableGrupos />
        <BottomActionButtons />
      </Paper>
    </Box>
  );
}
