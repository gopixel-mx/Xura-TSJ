'use client';

/* eslint-disable no-unused-vars */

import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import {
  Woman, Man, Groups2, Cast, AccountBalanceOutlined, CheckCircle, FlagCircle, PauseCircle,
} from '@mui/icons-material';
import { GraphBarAll, LineChartPeriods, IndicatorCard } from '@/app/shared/common';
// import { MapaJalisco } from '@/app/shared/common';
// import topojal from '@/app/mocks/json/jal_topojson.json';
import { madaniArabicBold } from '@/public/assets/fonts';

interface DataState {
  total: number;
  generoData: Array<any>;
  modalidadData: Array<any>;
  estatusData: Array<any>;
  periodo: string;
  fechas: {
    xAxis: Array<any>;
    yAxis: Array<any>;
    min: number;
    max: number;
  };
  procedencias: Array<any>;
  captacionData: Array<any>;
  captacionExamen: Array<any>;
  ultimaFecha: string;
}

interface DashboardPageProps {
  data: DataState;
}

interface GeneroData {
  genero: string;
  cantidad: number;
}

interface ModalidadData {
  modalidad: string;
  cantidad: number;
}

interface EstatusData {
  estatus: string;
  cantidad: number;
}

interface IndicatorCardItem {
  label: string;
  value: string;
  icon: ReactNode;
}

const getIcon = (type: string, category: string) => {
  switch (category) {
    case 'genero':
      return type === 'M'
        ? <Woman sx={{ fontSize: '10rem', color: '#ff4d63' }} />
        : <Man sx={{ fontSize: '10rem', color: '#308fff' }} />;
    case 'modalidad':
      return type === 'NO ESCOLARIZADA'
        ? <Cast sx={{ color: '#308fff', fontSize: '6rem' }} />
        : <AccountBalanceOutlined sx={{ color: '#54c98f', fontSize: '6rem' }} />;
    case 'estatus':
      switch (type) {
        case 'EXAMEN PAGADO':
          return <CheckCircle sx={{ color: '#308fff', fontSize: '3rem' }} />;
        case 'REGISTRADO SIN VALIDAR':
          return <PauseCircle sx={{ color: '#ffae31', fontSize: '2rem' }} />;
        case 'REGISTRADO VALIDADO':
          return <FlagCircle sx={{ color: '#54c98f', fontSize: '2rem' }} />;
        default:
          return null;
      }
    default:
      return null;
  }
};

const capitalizeWords = (str: string) => str.toLowerCase()
  .replace(/\b\w/g, (char) => char.toUpperCase());

const mapDataToItems = (
  data: any[],
  category: string,
  total?: number,
): IndicatorCardItem[] => data.map((item) => ({
  label: capitalizeWords(item[category]),
  value: total ? new Intl.NumberFormat('es-MX').format(item.cantidad) : item.cantidad,
  icon: getIcon(item[category], category),
}));

function CaptacionTotalIndicator({ captacionTotal }: { captacionTotal: number }) {
  return (
    <IndicatorCard
      title='Registros totales'
      value={new Intl.NumberFormat('es-MX').format(captacionTotal)}
      icon={<Groups2 sx={{ fontSize: '7rem', color: '#308fff' }} />}
      colors={{
        iconColor: `#308fff`,
      }}
    />
  );
}

function GeneroIndicator({ generoData, captacionTotal }:
  { generoData: GeneroData[]; captacionTotal: number }) {
  return (
    <IndicatorCard
      title='Genero'
      items={mapDataToItems(generoData, 'genero')}
      layout='horizontal'
    />
  );
}

function ModalidadIndicator({ modalidadData, captacionTotal }:
  { modalidadData: ModalidadData[]; captacionTotal: number }) {
  return (
    <IndicatorCard
      title='Modalidad'
      items={mapDataToItems(modalidadData, 'modalidad')}
      layout='horizontal'
    />
  );
}

function EstatusIndicator({ estatusData, lastFecha }:
  { estatusData: EstatusData[]; lastFecha: string }) {
  return (
    <IndicatorCard
      title='Estatus'
      items={mapDataToItems(estatusData, 'estatus')}
    />
  );
}

export default function DashboardCaptacion({ data }: DashboardPageProps) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 0,
      width: '100%',
      padding: 1,
    }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: { xs: 2, md: 10 },
        marginTop: 1,
        flexDirection: { xs: 'column', md: 'row' },
      }}
      >
        <Typography
          variant='h4'
          sx={{ whiteSpace: 'nowrap' }}
          className={madaniArabicBold.className}
        >
          Captación
          {' '}
          {data.periodo}
        </Typography>
        <Typography variant='h5' sx={{ whiteSpace: 'nowrap', maxWidth: { xs: '100%', md: '60%' } }}>
          Última actualización
          {' '}
          {data.ultimaFecha}
        </Typography>
      </Box>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        width: '100%',
      }}
      >
        <CaptacionTotalIndicator captacionTotal={data.total} />
        <GeneroIndicator generoData={data.generoData} captacionTotal={data.total} />
        <ModalidadIndicator modalidadData={data.modalidadData} captacionTotal={data.total} />
        <EstatusIndicator estatusData={data.estatusData} lastFecha={data.ultimaFecha} />
      </Box>
      <Box sx={{ padding: { xs: 1, xl: 1 }, alignItems: 'center', width: '100%' }}>
        <Box sx={{
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)' },
          width: '100%',
        }}
        >
          <GraphBarAll title='Unidades' chartData={data.captacionExamen} dataType='captacion' />
          <LineChartPeriods
            xAxisData={data.fechas.xAxis}
            yAxisData={data.fechas.yAxis}
            label='Aspirantes'
            color='#3f8ef8'
            yAxisRange={{ min: data.fechas.min - 10, max: data.fechas.max }}
          />
          {/* <MapaJalisco topojson={topojal} entidad={14} data={data.procedencias} /> */}
        </Box>
      </Box>
    </Box>
  );
}
