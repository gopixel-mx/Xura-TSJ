import { CardLogin } from '@/app/components/layout';
import Image from 'next/image';
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
        <Image
          src='/logoTSJ.svg'
          alt='logoTSJ'
          width={461}
          height={188}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <CardLogin />
      </Box>
    </Box>
  );
}
