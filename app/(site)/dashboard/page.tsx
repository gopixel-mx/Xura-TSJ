import { Box } from '@mui/material';
import { GraphBarAll, CardFilter } from '@/app/components/common';

export default function DashboardPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
      }}
    >
      <CardFilter />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'auto',
          gap: 1,
          padding: 3,
          paddingLeft: 8,
        }}
      >
        <GraphBarAll
          title='Clase A'
          clase='d'
          width={450}
          height={300}
        />
        <GraphBarAll
          title='Clase B'
          clase='c'
          width={450}
          height={300}
        />
        <GraphBarAll
          title='Clase C'
          clase='b'
          width={450}
          height={300}
        />

        <Box
          sx={{
            gridColumn: 'span 3',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            paddingTop: 3,
            gap: 0,
          }}
        >
          <Box gridColumn='span 1'>
            <GraphBarAll
              title='Clase D'
              clase='a'
              width={650}
              height={300}
            />
          </Box>
          <Box gridColumn='span 1'>
            <GraphBarAll
              title='Clase E'
              clase='e'
              width={710}
              height={300}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
