interface TokenPayload {
  idCredencial: string;
  curp: string;
  correo: string;
  celular: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;
}

interface ParsedToken {
  idCredencial: string;
  curp: string;
  correo: string;
  celular: string;
  token: string;
}

function parseJwt(token: string): TokenPayload | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64)) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export default function getToken(): ParsedToken | null {
  const jwt = localStorage.getItem('authToken');
  if (!jwt) {
    return null;
  }

  const parsedJwt = parseJwt(jwt);
  if (!parsedJwt) {
    return null;
  }

  const {
    exp, idCredencial, curp, correo, celular,
  } = parsedJwt;

  // Verifica si el token ha expirado
  if (exp * 1000 < Date.now()) {
    localStorage.removeItem('authToken');
    return null;
  }

  const data: ParsedToken = {
    idCredencial,
    curp,
    correo,
    celular,
    token: jwt,
  };

  return data;
}
