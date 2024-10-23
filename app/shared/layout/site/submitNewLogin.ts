import { createRecord } from '@/app/shared/utils/apiUtils';

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
  setLoading: (loading: boolean) => void,
) => {
  const endpoint = '/sesiones';
  setLoading(true);

  try {
    // Hacemos la llamada a la API usando createRecord
    const response = await createRecord({ data: form, endpoint });

    if (response.statusCode === 200 && response.data && response.data.token) {
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);

      // Devuelve los datos completos del usuario
      return {
        token,
        id: user.idCredencial,
        email: user.correo,
        curp: user.curp,
        celular: user.celular,
      };
    } else {
      if (response.statusCode === 404) {
        setErrorMessages({ account: errors.account });
      } else if (response.statusCode === 401) {
        setErrorMessages({ password: errors.password });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    setErrorMessages({ general: 'Hubo un error al iniciar sesión.' });
  } finally {
    setLoading(false);
  }

  return null;
};

export default submitNewLogin;
