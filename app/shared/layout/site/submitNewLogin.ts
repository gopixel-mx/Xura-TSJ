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
  activateAuth: (token: string) => void,
  setLoading: (loading: boolean) => void,
) => {
  const endpoint = '/sesiones';

  setLoading(true);

  try {
    // Hacemos la llamada a la API usando createRecord
    const response = await createRecord({ data: form, endpoint });
    if (response.statusCode === 200) {
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      activateAuth(token); // Activa la autenticación
    } else {
      if (response.statusCode === 404) {
        setErrorMessages({ usuario: errors.usuario });
      } else if (response.statusCode === 401) {
        setErrorMessages({ contrasena: errors.contrasena });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    setErrorMessages({ general: 'Hubo un error al iniciar sesión.' });
  } finally {
    setLoading(false);
  }
};

export default submitNewLogin;
