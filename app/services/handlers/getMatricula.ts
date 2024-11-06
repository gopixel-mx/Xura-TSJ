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

const getPeriodos = async () => {
  try {
    const response = await axios.get('/api/matricula/periodo');
    return response.data;
  } catch (error) {
    return [];
  }
};

const getCurp = async (curp: string) => {
  try {
    const response = await axios.get(`https://curp-mexico1.p.rapidapi.com/porCurp/${curp}`, {
      headers: {
        'x-rapidapi-key': 'a385736a0emsh5d3a0044a9bfe40p12370djsnc1eb53a79306',
        'x-rapidapi-host': 'curp-mexico1.p.rapidapi.com',
      },
    });
    return response.data;
  } catch (error) {
    return {};
  }
};

export {
  getMatricula,
  getMatriculaByNombre,
  getMatriculaTotalUnidades,
  getPeriodos,
  getCurp,
};
