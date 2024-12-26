import { Paper, Typography } from '@mui/material';
import { TableRoles } from '@/app/components/roles';
import { BottomActionButtons } from '@/app/shared/common/Buttons';

export default function RolesPage() {
  return (
    <Paper elevation={3} sx={{ width: '100%', padding: 4 }}>
      <Typography
        variant='h4'
        component='h1'
        gutterBottom
        align='left'
      >
        Roles
      </Typography>
      <TableRoles />
      <BottomActionButtons />
    </Paper>
  );
}
