'use client';

import {
  ReactNode, useState, useMemo, useCallback, useEffect,
} from 'react';
import { useRouter } from 'next/navigation';
import SnackAlert from '@/app/shared/common/Alert';
import getTokenLocalStorage from '@/app/shared/utils/getToken';
import { AuthContext } from './AuthContext';

interface ProviderProps {
  children: ReactNode;
}

interface Noti {
  open: boolean;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

export default function AuthProvider({ children }: ProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [noti, setNoti] = useState<Noti | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = useCallback(() => !!user, [user]);

  // Función para eliminar la autenticación y redirigir al usuario
  const removeAuth = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
    router.push('/');
  }, [router]);

  // Función para activar la autenticación
  const activateAuth = useCallback((userData: any) => {
    setUser({
      id: userData.idCredencial,
      token: userData.token,
      email: userData.correo,
      curp: userData.curp,
      celular: userData.celular,
    });
    localStorage.setItem('authToken', userData.token);
    router.push('/dashboard');
  }, [router]);

  useEffect(() => {
    const storedUser = getTokenLocalStorage();
    if (storedUser) {
      setUser({
        id: storedUser.idCredencial,
        token: storedUser.token,
        email: storedUser.correo,
        curp: storedUser.curp,
        celular: storedUser.celular,
      });
    } else {
      removeAuth();
    }
  }, [removeAuth]);

  // Memoizar el valor para evitar recrear el objeto en cada render
  const providerValue = useMemo(() => ({
    user,
    setUser,
    noti,
    setNoti,
    loading,
    setLoading,
    isAuthenticated,
    removeAuth,
    activateAuth,
  }), [user, noti, loading, isAuthenticated, removeAuth, activateAuth]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
      {noti && (
        <SnackAlert
          open={noti.open}
          close={() => setNoti(null)}
          type={noti.type}
          mensaje={noti.message}
        />
      )}
    </AuthContext.Provider>
  );
}
