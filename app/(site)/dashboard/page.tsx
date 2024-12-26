import { Box, Typography } from '@mui/material';
import {
  BarChartOutlined,
  WcOutlined,
  SchoolOutlined,
  LaptopMacOutlined,
} from '@mui/icons-material';
import {
  GraphBarAll, FilterSelect, CardTemplate,
} from '@/app/shared/common';
import { TableGrid } from '@/app/components/dashboard';

const matriculaTotal = async () => {
  const data = await fetch('http://192.168.8.206:3001/api/matricula/total')
    .then((res) => res.json());
  return data;
};

const generoTotal = async () => {
  const data = await fetch('http://192.168.8.206:3001/api/estudiantes/genero')
    .then((res) => res.json());
  return data;
};

const modalidadTotal = async () => {
  const data = await fetch('http://192.168.8.206:3001/api/modalidades')
    .then((res) => res.json());
  return data;
};

const estatusTotal = async () => {
  const data = await fetch('http://192.168.8.206:3001/api/matricula/estatus')
    .then((res) => res.json());
  return data;
};

const capitalizeWords = (str: string) => str
  .toLowerCase()
  .replace(/\b\w/g, (char) => char.toUpperCase());

export default async function DashboardPage() {
  const totalData = await matriculaTotal();
  const total = totalData[0];

  const generoData = await generoTotal();
  const modalidadData = await modalidadTotal();
  const estatusData = await estatusTotal();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        width: '100%',
        padding: 1,
      }}
    >
      {/* Título de la página */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          paddingLeft: 10,
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Typography
          variant='h4'
          sx={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '60%',
          }}
        >
          Matrícula Febrero 2024
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <FilterSelect />
        </Box>
      </Box>

      {/* Contenedor para mostrar el CardTemplate y alinear los 4 CardFilter */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'auto',
          gap: 2,
          justifyContent: 'center',
          paddingTop: 1,
          width: '80%',
        }}
      >
        <CardTemplate
          title='Matrícula'
          description={(
            <Typography variant='body1' sx={{ textTransform: 'none' }}>
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                Total:
              </Box>
              {' '}
              <Box component='span'>
                {total?.estudiantes || 0}
              </Box>
            </Typography>
          )}
          icon={(
            <BarChartOutlined
              sx={{ color: 'green', fontSize: '3rem' }}
            />
          )}
        />
        <CardTemplate
          title='Género'
          description={(
            <>
              {generoData.map((genero: any) => (
                <Typography
                  key={genero.genero}
                  variant='body1'
                  sx={{ textTransform: 'none' }}
                >
                  <Box component='span' sx={{ fontWeight: 'bold' }}>
                    {`${genero.genero === 'F' ? 'Femenino' : 'Masculino'}:`}
                  </Box>
                  {' '}
                  <Box component='span'>
                    {genero.cantidad}
                  </Box>
                </Typography>
              ))}
            </>
          )}
          icon={(
            <WcOutlined
              sx={{ color: 'blueviolet', fontSize: '3rem' }}
            />
          )}
        />
        <CardTemplate
          title='Modalidad'
          description={(
            <>
              {modalidadData.map((modalidad: any) => (
                <Typography
                  key={modalidad.modalidad}
                  variant='body1'
                  sx={{ textTransform: 'none' }}
                >
                  <Box component='span' sx={{ fontWeight: 'bold' }}>
                    {`${capitalizeWords(modalidad.modalidad)}:`}
                  </Box>
                  {' '}
                  {modalidad.cantidad}
                </Typography>
              ))}
            </>
          )}
          icon={(
            <LaptopMacOutlined
              sx={{ color: 'deepskyblue', fontSize: '3rem' }}
            />
          )}
        />
        <CardTemplate
          title='Estatus'
          description={(
            <>
              {estatusData.map((estatus: any) => (
                <Typography
                  key={estatus.estatus}
                  variant='body1'
                  sx={{ textTransform: 'none' }}
                >
                  <Box component='span' sx={{ fontWeight: 'bold' }}>
                    {`${estatus.estatus}:`}
                  </Box>
                  {' '}
                  {estatus.cantidad}
                </Typography>
              ))}
            </>
          )}
          icon={(
            <SchoolOutlined
              sx={{ color: 'orange', fontSize: '3rem' }}
            />
          )}
        />
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
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: 2,
            marginTop: 4,
            width: '100%',
            paddingLeft: 2,
          }}
        >
          {/* TableGrid a la izquierda */}
          <Box sx={{ paddingRight: 2 }}>
            <TableGrid />
          </Box>

          {/* LineChartPeriods a la derecha */}
          {/* <Box sx={{ paddingLeft: 2 }}> */}
          {/*  <LineChartPeriods /> */}
          {/* </Box> */}
        </Box>
      </Box>
    </Box>
  );
}
