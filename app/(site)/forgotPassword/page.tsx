import { Box } from '@mui/material';
import { CardForgotPassw } from '@/app/components/layout';

export default function ForgotPasswPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
        boxSizing: 'border-box',
        height: 'calc(100vh - 64px)',
        marginTop: '-25px',
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
        <CardForgotPassw />
      </Box>
    </Box>
  );
}
