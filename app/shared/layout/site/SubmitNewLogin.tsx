interface LoginPayload {
  curp?: string;
  celular?: string;
  correo?: string;
  contrasena: string;
}

export default async function SubmitNewLogin(
  form: LoginPayload,
  // eslint-disable-next-line no-unused-vars
  setErrorMessages: (errors: { account?: string; password?: string; general?: string }) => void,
  // eslint-disable-next-line no-unused-vars
  setLoading: (loading: boolean) => void,
  handleActionRequired: (
    // eslint-disable-next-line no-unused-vars
    action: string,
    // eslint-disable-next-line no-unused-vars
    validationNeeded: { correo?: boolean; celular?: boolean },
    // eslint-disable-next-line no-unused-vars
    correo?: string,
    // eslint-disable-next-line no-unused-vars
    celular?: string,
    // eslint-disable-next-line no-unused-vars
    credencial?: string,
  ) => void,
): Promise<void> {
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
      actionRequired,
      authenticationNeeded,
      validationNeeded,
      correo,
      celular,
      credencial,
    } = responseData;

    if (response.status === 401) {
      setErrorMessages({ account: 'Cuenta no válida o contraseña incorrecta.' });
    } else if (response.status === 403) {
      setErrorMessages({ account: 'La cuenta está inactiva.' });
    } else if (actionRequired === 'VALIDATE_CONTACT_INFO') {
      handleActionRequired(actionRequired, validationNeeded || {}, correo, celular, credencial);
    } else if (actionRequired === 'AUTHENTICATE_CONTACT_INFO') {
      handleActionRequired(actionRequired, authenticationNeeded || {}, correo, celular, credencial);
    } else {
      setErrorMessages({ general: 'Hubo un error al iniciar sesión. Inténtalo más tarde.' });
    }
  } catch (error) {
    setErrorMessages({ general: 'Hubo un error al iniciar sesión. Inténtalo más tarde.' });
  } finally {
    setLoading(false);
  }
}
