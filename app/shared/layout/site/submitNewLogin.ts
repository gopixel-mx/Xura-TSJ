import { createRecord } from '@/app/shared/utils/apiUtils';
import { parseJwt } from '@/app/shared/utils/getToken';

interface LoginResponse {
  statusCode: number;
  token?: string;
  errorMessage?: string;
  data?: any;
}

interface LoginPayload {
  curp?: string;
  celular?: string;
  correo?: string;
  contrasena: string;
}

const submitNewLogin = async (
  form: LoginPayload,
  errors: any,
  setErrorMessages: (errores: any) => void,
  activateAuth: (userData: any) => void,
  setLoading: (loading: boolean) => void,
) => {
  const endpoint = '/sesiones';
  setLoading(true);

  try {
    const response: LoginResponse = await createRecord({ data: form, endpoint });

    if (response.statusCode === 200 && response.token) {
      const { token } = response;
      const decodedToken = parseJwt(token);

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
    setErrorMessages({ general: 'Hubo un error al iniciar sesión.' });
  } finally {
    setLoading(false);
  }

  return null;
};

export default submitNewLogin;
