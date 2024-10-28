import { createRecord } from '@/app/shared/utils/apiUtils';
import { parseJwt } from '@/app/shared/utils/getToken';

interface LoginResponse {
  statusCode: number;
  token?: string;
  message?: string;
  data?: any;
  actionRequired?: string;
  validationNeeded?: { correo?: boolean; celular?: boolean };
}

interface LoginPayload {
  curp?: string;
  celular?: string;
  correo?: string;
  contrasena: string;
}

const SubmitNewLogin = async (
  form: LoginPayload,
  setErrorMessages: (errors: { account?: string; password?: string; general?: string }) => void,
  activateAuth: (userData: any) => void,
  setLoading: (loading: boolean) => void,
  handleActionRequired: (
    action: string,
    validationNeeded: { correo?: boolean; celular?: boolean },
  ) => void,
): Promise<any> => {
  const endpoint = '/sesiones';
  setLoading(true);

  try {
    const response: LoginResponse = await createRecord({ data: form, endpoint });

    if (response.statusCode === 200 && response.token) {
      const { token } = response;
      const decodedToken = parseJwt(token);

      if (decodedToken) {
        const userDataWithToken = {
          ...decodedToken,
          token,
        };
        activateAuth(userDataWithToken);
        return userDataWithToken;
      }
      setErrorMessages({ general: 'Error al decodificar el token' });
    } else if (response.statusCode === 401) {
      setErrorMessages({ account: 'Cuenta no válida o contraseña incorrecta.' });
    } else if (response.statusCode === 403) {
      setErrorMessages({ account: 'La cuenta está inactiva.' });
    } else if (response.actionRequired === 'VALIDATE_CONTACT_INFO') {
      handleActionRequired(response.actionRequired, response.validationNeeded || {});
    }
  } catch (error) {
    setErrorMessages({ general: 'Hubo un error al iniciar sesión. Inténtalo más tarde.' });
  } finally {
    setLoading(false);
  }

  return null;
};

export default SubmitNewLogin;
