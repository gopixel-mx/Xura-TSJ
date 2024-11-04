import { parseJwt } from '@/app/shared/utils/getToken';

interface LoginPayload {
  curp?: string;
  celular?: string;
  correo?: string;
  contrasena: string;
}

export default async function SubmitNewLogin(
  form: LoginPayload,
  setErrorMessages: (errors: { account?: string; password?: string; general?: string }) => void,
  activateAuth: (userData: any) => void,
  setLoading: (loading: boolean) => void,
  handleActionRequired: (
    action: string,
    validationNeeded: { correo?: boolean; celular?: boolean },
    correo?: string,
    celular?: string,
    credencial?: string,
  ) => void,
): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const domain = process.env.NEXT_PUBLIC_URL;
  const endpoint = `${domain}/sesiones`;
  setLoading(true);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        api_key: apiKey || '',
      },
      body: JSON.stringify(form),
    });

    const responseData = await response.json();
    const {
      token,
      actionRequired,
      validationNeeded,
      correo,
      celular,
      credencial,
    } = responseData;

    if (response.status === 200 && token) {
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        const userDataWithToken = {
          ...decodedToken,
          token,
        };
        activateAuth(userDataWithToken);
        return userDataWithToken;
      } else {
        setErrorMessages({ general: 'Error al decodificar el token' });
      }
    } else if (response.status === 401) {
      setErrorMessages({ account: 'Cuenta no válida o contraseña incorrecta.' });
    } else if (response.status === 403) {
      setErrorMessages({ account: 'La cuenta está inactiva.' });
    } else if (actionRequired === 'VALIDATE_CONTACT_INFO') {
      handleActionRequired(
        actionRequired,
        validationNeeded || {},
        correo,
        celular,
        credencial,
      );
    } else {
      setErrorMessages({ general: 'Hubo un error al iniciar sesión. Inténtalo más tarde.' });
    }
  } catch (error) {
    setErrorMessages({ general: 'Hubo un error al iniciar sesión. Inténtalo más tarde.' });
  } finally {
    setLoading(false);
  }

  return null;
}
