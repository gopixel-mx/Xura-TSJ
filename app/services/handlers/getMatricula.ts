import axios from 'axios';

const getMatricula = async (clase: string) => {
  try {
    const { data } = await axios.get(`/api/matricula/clase/${clase}`);
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

export {
  getMatricula,
  getMatriculaByNombre,
  getMatriculaTotalUnidades,
  getMatriculaTotal,
  getAplicaciones,
  getGrupos,
  getCredenciales,
};
