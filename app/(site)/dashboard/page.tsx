import { Box, Typography } from '@mui/material';
import { GraphBarAll, CardFilter, FilterSelect } from '@/app/components/common';
import { TableUA, TableGrid } from '@/app/components/common/Tables';

export default function DashboardPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        width: '100%', // Asegura que el ancho se distribuya correctamente
        padding: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%',
          paddingLeft: 18,
          marginBottom: 2,
        }}
      >
        <Typography variant='h5'>
          Matrícula Febrero 2024
        </Typography>
      </Box>
      {/* Mantén el FilterSelect a la izquierda */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end', // Mantiene FilterSelect a la izquierda
          width: '100%',
          paddingRight: 18, // Ajuste del padding para alinear
        }}
      >
        <FilterSelect />
      </Box>

      {/* Contenedor para alinear los 4 CardFilter */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', // Alinea 4 CardFilter
          gridTemplateRows: 'auto',
          gap: 2,
          justifyContent: 'center', // Centra los CardFilter en la fila
          paddingTop: 2,
          width: '100%',
        }}
      >
        <CardFilter />
        <CardFilter />
        <CardFilter />
        <CardFilter />
      </Box>

      {/* Contenedor para los gráficos */}
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
        <Box
          sx={{
            marginTop: 4,
            width: '120%',
            paddingLeft: 2,
          }}
        >
          <TableUA />
          <TableGrid />
        </Box>
      </Box>
    </Box>
  );
}
