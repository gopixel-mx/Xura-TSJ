import axios from 'axios';

const getMatricula = async (clase: string) => {
  try {
    const { data } = await axios.get(`/api/matricula/clase/${clase}`);
    return data;
  } catch (error) {
    throw new Error(`Error al cargar los datos para la clase ${clase}`);
  }
};

const getTablaMatricula = async (clase: string) => {
  try {
    const { data } = await axios.get(`/api/matricula/real/${clase}`);
    return data;
  } catch (error) {
    throw new Error(`Error al cargar los datos para la clase ${clase}`);
  }
};

const getMatriculaByNombre = async (nombre: string) => {
  try {
    const { data } = await axios.get(`/api/carrera/real/${nombre}`);
    return data;
  } catch (error) {
    throw new Error(`Error al cargar los datos para la carrera ${nombre}`);
  }
};

const getMatriculaTotalUnidades = async () => {
  try {
    const { data } = await axios.get('/api/matricula/real');
    return data;
  } catch (error) {
    throw new Error('Error al cargar los datos');
  }
};

const getMatriculaTotal = async () => {
  try {
    const { data } = await axios.get('/api/matricula/total');
    return data;
  } catch (error) {
    throw new Error('Error al cargar los datos');
  }
};

// getAplicaciones.ts
const getAplicaciones = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/aplicaciones'); // URL completa
    return response.data;
  } catch (error) {
    console.error('Error al obtener las aplicaciones:', error);
    return [];
  }
};

const insertAplicacion = async (
  clave: string,
  nombre: string,
  redireccion: string,
) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/aplicaciones',
      { clave, nombre, redireccion },
    );
    return response.data;
  } catch (error: any) {
    console.error('Error al insertar la aplicación:', error);

    // Lanza el error en lugar de retornar un array vacío
    if (error.response && error.response.data) {
      throw error.response.data; // Lanzar el error para que el frontend lo capture
    } else {
      throw new Error('Error inesperado en la inserción de la aplicación');
    }
  }
};

const getGrupos = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/grupos'); // URL completa
    return response.data;
  } catch (error) {
    console.error('Error al obtener las aplicaciones:', error);
    return [];
  }
};

const getCredenciales = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/credenciales'); // URL completa
    return response.data;
  } catch (error) {
    console.error('Error al obtener las aplicaciones:', error);
    return [];
  }
};

const getPeriodos = async () => {
  const data = await fetch('http://192.168.8.164:3001/api/matricula/periodo')
    .then((res) => res.json());
  return data;
};

export {
  getMatricula,
  getMatriculaByNombre,
  getMatriculaTotalUnidades,
  getMatriculaTotal,
  getAplicaciones,
  getGrupos,
  getCredenciales,
  insertAplicacion,
  getPeriodos,
};
