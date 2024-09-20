import { Box, Paper, Typography } from '@mui/material';

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  width?: string | number;
  height?: string | number;
}

export default function CardTemplate({
  title, description, image, width = 1500, height = 'auto',
}: CardProps) {
  return (
    <Box sx={{ maxWidth: width, height, padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
        {image && (
          <Box
            component='img'
            sx={{
              height: 200, width: '100%', objectFit: 'cover', mb: 2,
            }}
            alt={title}
            src={image}
          />
        )}
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        {description && (
          <Typography variant='body2' sx={{ color: 'textSecondary' }}>
            {description}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

CardTemplate.defaultProps = {
  description: '',
  image: '',
  width: 1500,
  height: 'auto',
};
