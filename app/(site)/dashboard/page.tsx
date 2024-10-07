import { Box, Typography } from '@mui/material';
import { GraphBarAll, FilterSelect, CardTemplate } from '@/app/components/common';
import { TableGrid } from '@/app/components/common/Tables';

const matriculaTotal = async () => {
  const data = await fetch('http://192.168.8.164:3001/api/matricula/total')
    .then((res) => res.json());
  return data;
};

export default async function DashboardPage() {
  const totalData = await matriculaTotal();
  const total = totalData[0]; // Accede al primer objeto del arreglo

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
      {/* Título de la página */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%',
          paddingLeft: 18,
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Typography variant='h5'>Matrícula Febrero 2024</Typography>
      </Box>

      {/* Mantén el FilterSelect a la derecha */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end', // Mantiene FilterSelect a la izquierda
          width: '100%',
        }}
      >
        <FilterSelect />
      </Box>

      {/* Contenedor para mostrar el CardTemplate y alinear los 4 CardFilter */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', // Alinea 4 CardFilter
          gridTemplateRows: 'auto',
          gap: 2,
          justifyContent: 'center', // Centra los CardFilter en la fila
          paddingTop: 1,
          width: '80%',
        }}
      >
        <CardTemplate
          title='Matrícula'
          description={`Total: ${total?.estudiantes || 0}`}
        />
        <CardTemplate title='Género' description='Más detalles' />
        <CardTemplate title='Modalidad' description='Más detalles' />
        <CardTemplate title='Estatus' description='Más detalles' />
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
        <GraphBarAll title='Clase A' clase='d' />
        <GraphBarAll title='Clase B' clase='c' />
        <GraphBarAll title='Clase C' clase='b' />

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
            <GraphBarAll title='Clase D' clase='a' />
          </Box>
          <Box gridColumn='span 1'>
            <GraphBarAll title='Clase E' clase='e' />
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: 4,
            width: '110%',
            paddingLeft: 2,
          }}
        >
          <TableGrid />
        </Box>
      </Box>
    </Box>
  );
}
