import { CardLogin } from '@/app/components/layout';
import { Box } from '@mui/material';

export default function LoginPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '100%',
          gap: '20px',
          width: '100%',
        }}
      >
        <CardLogin />
      </Box>
    </Box>
  );
}
