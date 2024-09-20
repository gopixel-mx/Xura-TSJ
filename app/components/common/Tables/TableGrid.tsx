'use client';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useState } from 'react';
import { ColDef } from 'ag-grid-community'; // Importa ColDef

interface CarData {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

export default function TableGrid() {
  const [rowData, setRowData] = useState<CarData[]>([
    {
      make: 'Tesla', model: 'Model S', price: 79999, electric: true,
    },
    {
      make: 'Ford', model: 'Mustang', price: 55999, electric: false,
    },
    {
      make: 'Chevrolet', model: 'Camaro', price: 42999, electric: false,
    },
    {
      make: 'Toyota', model: 'Prius', price: 24999, electric: true,
    },
    {
      make: 'BMW', model: 'i3', price: 45999, electric: true,
    },
    {
      make: 'Nissan', model: 'Leaf', price: 31999, electric: true,
    },
    {
      make: 'Audi', model: 'e-tron', price: 65999, electric: true,
    },
    {
      make: 'Hyundai', model: 'Kona', price: 37999, electric: true,
    },
    {
      make: 'Kia', model: 'Niro', price: 34999, electric: true,
    },
    {
      make: 'Mercedes-Benz', model: 'EQC', price: 68999, electric: true,
    },
    {
      make: 'Volkswagen', model: 'ID.4', price: 39999, electric: true,
    },
    {
      make: 'Porsche', model: 'Taycan', price: 89999, electric: true,
    },
    {
      make: 'Volvo', model: 'XC40 Recharge', price: 53999, electric: true,
    },
    {
      make: 'Jaguar', model: 'I-Pace', price: 72999, electric: true,
    },
    {
      make: 'Honda', model: 'Accord', price: 27999, electric: false,
    },
    {
      make: 'Mazda', model: 'CX-5', price: 30999, electric: false,
    },
    {
      make: 'Subaru', model: 'Outback', price: 35999, electric: false,
    },
    {
      make: 'Dodge', model: 'Charger', price: 45999, electric: false,
    },
    {
      make: 'Jeep', model: 'Wrangler', price: 39999, electric: false,
    },
    {
      make: 'Chevrolet', model: 'Bolt', price: 36999, electric: true,
    },
    {
      make: 'Ford', model: 'F-150', price: 29999, electric: false,
    },
    {
      make: 'Toyota', model: 'Camry', price: 27999, electric: false,
    },
    {
      make: 'Tesla', model: 'Model X', price: 99999, electric: true,
    },
    {
      make: 'BMW', model: '3 Series', price: 40999, electric: false,
    },
    {
      make: 'Audi', model: 'Q5', price: 43999, electric: false,
    },
    {
      make: 'Hyundai', model: 'Ioniq', price: 33999, electric: true,
    },
    {
      make: 'Kia', model: 'Soul EV', price: 32999, electric: true,
    },
    {
      make: 'Mercedes-Benz', model: 'GLC', price: 49999, electric: false,
    },
    {
      make: 'Volkswagen', model: 'Golf', price: 22999, electric: false,
    },
    {
      make: 'Porsche', model: 'Cayenne', price: 74999, electric: false,
    },
    {
      make: 'Volvo', model: 'XC60', price: 53999, electric: false,
    },
    {
      make: 'Jaguar', model: 'F-Pace', price: 59999, electric: false,
    },
    {
      make: 'Honda', model: 'Civic', price: 21999, electric: false,
    },
    {
      make: 'Mazda', model: 'MX-5', price: 28999, electric: false,
    },
    {
      make: 'Subaru', model: 'Forester', price: 32999, electric: false,
    },
    {
      make: 'Dodge', model: 'Durango', price: 49999, electric: false,
    },
    {
      make: 'Jeep', model: 'Grand Cherokee', price: 53999, electric: false,
    },
    {
      make: 'Chevrolet', model: 'Traverse', price: 42999, electric: false,
    },
    {
      make: 'Ford', model: 'Explorer', price: 45999, electric: false,
    },
    {
      make: 'Toyota', model: 'Highlander', price: 47999, electric: false,
    },
    {
      make: 'Tesla', model: 'Model 3', price: 49999, electric: true,
    },
    {
      make: 'BMW', model: 'X5', price: 65999, electric: false,
    },
    {
      make: 'Audi', model: 'A4', price: 38999, electric: false,
    },
    {
      make: 'Hyundai', model: 'Tucson', price: 31999, electric: false,
    },
    {
      make: 'Kia', model: 'Sportage', price: 28999, electric: false,
    },
    {
      make: 'Mercedes-Benz', model: 'C-Class', price: 46999, electric: false,
    },
    {
      make: 'Volkswagen', model: 'Tiguan', price: 32999, electric: false,
    },
    {
      make: 'Porsche', model: 'Macan', price: 54999, electric: false,
    },
    {
      make: 'Volvo', model: 'V60', price: 45999, electric: false,
    },
    {
      make: 'Jaguar', model: 'XE', price: 41999, electric: false,
    },
    {
      make: 'Honda', model: 'Pilot', price: 44999, electric: false,
    },
    {
      make: 'Mazda', model: '6', price: 30999, electric: false,
    },
    {
      make: 'Subaru', model: 'Impreza', price: 22999, electric: false,
    },
    {
      make: 'Dodge', model: 'Journey', price: 29999, electric: false,
    },
    {
      make: 'Jeep', model: 'Compass', price: 26999, electric: false,
    },
    {
      make: 'Chevrolet', model: 'Tahoe', price: 54999, electric: false,
    },
    {
      make: 'Ford', model: 'Bronco', price: 39999, electric: false,
    },
    {
      make: 'Toyota', model: 'RAV4', price: 35999, electric: false,
    },
    {
      make: 'Tesla', model: 'Model Y', price: 62999, electric: true,
    },
    {
      make: 'BMW', model: 'i8', price: 149999, electric: true,
    },
    {
      make: 'Audi', model: 'A6', price: 56999, electric: false,
    },
    {
      make: 'Hyundai', model: 'Santa Fe', price: 37999, electric: false,
    },
    {
      make: 'Kia', model: 'Telluride', price: 45999, electric: false,
    },
    {
      make: 'Mercedes-Benz', model: 'E-Class', price: 65999, electric: false,
    },
    {
      make: 'Volkswagen', model: 'Passat', price: 28999, electric: false,
    },
    {
      make: 'Porsche', model: 'Panamera', price: 89999, electric: false,
    },
    {
      make: 'Volvo', model: 'XC90', price: 73999, electric: false,
    },
    {
      make: 'Jaguar', model: 'XJ', price: 87999, electric: false,
    },
    {
      make: 'Honda', model: 'Fit', price: 18999, electric: false,
    },
    {
      make: 'Mazda', model: 'CX-3', price: 26999, electric: false,
    },
    {
      make: 'Subaru', model: 'BRZ', price: 28999, electric: false,
    },
    {
      make: 'Dodge', model: 'Viper', price: 119999, electric: false,
    },
    {
      make: 'Jeep', model: 'Renegade', price: 23999, electric: false,
    },
    {
      make: 'Chevrolet', model: 'Blazer', price: 42999, electric: false,
    },
    {
      make: 'Ford', model: 'Edge', price: 36999, electric: false,
    },
    {
      make: 'Toyota', model: '4Runner', price: 49999, electric: false,
    },
    {
      make: 'Tesla', model: 'Roadster', price: 200000, electric: true,
    },
    {
      make: 'BMW', model: '7 Series', price: 85999, electric: false,
    },
    {
      make: 'Audi', model: 'Q7', price: 74999, electric: false,
    },
    {
      make: 'Hyundai', model: 'Palisade', price: 45999, electric: false,
    },
    {
      make: 'Kia', model: 'Stinger', price: 39999, electric: false,
    },
    {
      make: 'Mercedes-Benz', model: 'S-Class', price: 109999, electric: false,
    },
    {
      make: 'Volkswagen', model: 'Atlas', price: 42999, electric: false,
    },
    {
      make: 'Porsche', model: '911', price: 129999, electric: false,
    },
    {
      make: 'Volvo', model: 'S90', price: 61999, electric: false,
    },
    {
      make: 'Jaguar', model: 'E-Pace', price: 46999, electric: false,
    },
    {
      make: 'Honda', model: 'HR-V', price: 23999, electric: false,
    },
    {
      make: 'Mazda', model: 'CX-30', price: 28999, electric: false,
    },
    {
      make: 'Subaru', model: 'Ascent', price: 41999, electric: false,
    },
    {
      make: 'Dodge', model: 'Challenger', price: 49999, electric: false,
    },
    {
      make: 'Jeep', model: 'Cherokee', price: 33999, electric: false,
    },
    {
      make: 'Chevrolet', model: 'Silverado', price: 52999, electric: false,
    },
    {
      make: 'Ford', model: 'Maverick', price: 20999, electric: false,
    },
    {
      make: 'Toyota', model: 'Tacoma', price: 36999, electric: false,
    },
  ]);

  // Define colDefs con tipo ColDef[]
  const [colDefs, setColDefs] = useState<ColDef[]>([
    {
      headerName: '#', // Nombre de la columna
      valueGetter: 'node.rowIndex + 1', // Calcula el índice de la fila + 1
      width: 70, // Ancho de la columna
      pinned: 'left', // Fija la columna a la izquierda
    },
    { field: 'make', headerName: 'Marca' },
    { field: 'model', headerName: 'Modelo' },
    { field: 'price', headerName: 'Precio' },
    { field: 'electric', headerName: 'Eléctrico' },
  ]);

  return (
    <div className='ag-theme-quartz' style={{ height: 500, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs} // colDefs con tipado correcto
        pagination // Activa la paginación si es necesario
        paginationPageSize={10} // Número de filas por página
      />
    </div>
  );
}
