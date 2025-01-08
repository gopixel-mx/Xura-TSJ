import React, { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import CardTemplateClient from './CardTemplateClient';

interface IndicatorCardProps {
  title: string;
  icon?: React.ReactNode;
  value?: number | string;
  description?: string;
  items?: Array<{ label: string; value: number | string; icon?: ReactNode }>;
  colors?: {
    iconColor?: string;
    valueColor?: string;
    hoverBackgroundColor?: string;
  };
  layout?: 'vertical' | 'horizontal';
  sx?: object;
  link?: string;
}

export default function IndicatorCard({
  title,
  icon,
  value,
  description,
  items,
  colors = {},
  layout = 'vertical',
  sx = {},
  link,
}: IndicatorCardProps) {
  const isVertical = layout === 'vertical';

  const cardContent = (
    <CardTemplateClient
      title={title}
      description={(
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: isVertical ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            {icon && (
              <Box
                sx={{
                  color: colors.iconColor || '#308fff',
                  fontSize: '6rem',
                  ...(isVertical ? {} : { marginRight: 2 }),
                }}
              >
                {icon}
              </Box>
            )}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isVertical ? 'center' : 'flex-start',
              }}
            >
              <Typography
                color={colors.valueColor || 'text.primary'}
                component='div'
                variant='h4'
                sx={{ textAlign: 'center' }}
              >
                {typeof value === 'number'
                  ? new Intl.NumberFormat('es-MX').format(value)
                  : value}
              </Typography>
              {description && (
                <Typography
                  sx={{
                    textAlign: isVertical ? 'center' : 'left',
                    mt: 1,
                  }}
                >
                  {description}
                </Typography>
              )}
              {items && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: isVertical ? 'column' : 'row',
                    gap: 1,
                  }}
                >
                  {items.map((item) => (
                    <Box
                      component='span'
                      key={item.label}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      {item.icon && (
                        <Box
                          sx={{
                            color: colors.iconColor || '#308fff',
                          }}
                        >
                          {item.icon}
                        </Box>
                      )}
                      <Typography
                        variant='h3'
                        sx={{
                          fontWeight: 'bold',
                          textAlign: 'center',
                          fontSize: '1rem',
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        variant='h4'
                        sx={{
                          color: colors.valueColor || 'text.primary',
                          fontSize: '1.2rem',
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
      sx={{
        width: '100%',
        padding: 2,
        '&:hover': {
          backgroundColor: colors.hoverBackgroundColor || 'background.paper',
        },
        ...sx,
      }}
    />
  );

  return link ? (
    <Link href={link} passHref>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}
