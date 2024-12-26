/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';
import Image from 'next/image';
import {
  Paper,
  Box,
  Typography,
  PaperProps,
} from '@mui/material';
import { madaniArabicBold } from '@/public/assets/fonts';

interface CardHomeProps extends PaperProps {
  title?: string;
  children: ReactNode;
}

export default function CardHome({ title = '', children, ...props }: CardHomeProps) {
  return (
    <Paper
      elevation={6}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        width: '100%',
        maxWidth: '427px',
        height: 'auto',
        padding: '24px',
        borderRadius: '10px',
      }}
      {...props}
    >
      <Box
        sx={{
          marginBottom: '24px',
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image
          src='/logoTSJ.svg'
          alt='Logo'
          width={250}
          height={114}
          priority
        />
      </Box>

      {title && (
        <Typography
          sx={{
            color: '#32169b',
            fontSize: '24px',
            marginBottom: '8px',
            textAlign: 'center',
          }}
          className={madaniArabicBold.className}
        >
          {title}
        </Typography>
      )}

      <Box sx={{
        width: '100%',
        maxWidth: '355px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        {children}
      </Box>
    </Paper>
  );
}
