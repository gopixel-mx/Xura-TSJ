import { createRecord } from '@/app/shared/utils/apiUtils';
import { parseJwt } from '@/app/shared/utils/getToken';

interface LoginPayload {
  curp?: string;
  celular?: string;
  email?: string;
  contrasena: string;
}

const submitNewLogin = async (
  form: LoginPayload,
  errors: any,
  setErrorMessages: (errors: any) => void,
  activateAuth: (userData: any) => void,
  setLoading: (loading: boolean) => void,
) => {
  const endpoint = '/sesiones';
  setLoading(true);

  try {
    // Agregamos un console.log para ver qué datos se están enviando
    console.log('Enviando datos al servidor:', form);

    const response = await createRecord({ data: form, endpoint });

    // Agregamos otro console.log para ver qué respuesta se recibe
    console.log('Respuesta recibida del servidor:', response);

    if (response.statusCode === 200 && response.data && response.data.token) {
      const { token } = response.data;
      const decodedToken = parseJwt(token);

      // Imprimir el token decodificado
      console.log('Token decodificado:', decodedToken);

      if (decodedToken) {
        activateAuth({
          ...decodedToken,
          token,
        });
      } else {
        setErrorMessages({ general: 'Error al decodificar el token' });
      }
    } else if (response.statusCode === 404) {
      setErrorMessages({ account: errors.account });
    } else if (response.statusCode === 401) {
      setErrorMessages({ password: errors.password });
    }
  } catch (error) {
    // Agregamos un console.log para ver si ocurre algún error
    console.error('Error al realizar la solicitud:', error);
    setErrorMessages({ general: 'Hubo un error al iniciar sesión.' });
  } finally {
    setLoading(false);
  }

  return null;
};

export default submitNewLogin;
