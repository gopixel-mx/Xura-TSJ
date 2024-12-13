import { Box, Paper, Typography } from '@mui/material';
import { TableGrupos } from '@/app/components/grupos';
import { BottomActionButtons } from '@/app/shared/common/Buttons';

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
          Grupos
        </Typography>
        <TableGrupos />
        <BottomActionButtons />
      </Paper>
    </Box>
  );
}
