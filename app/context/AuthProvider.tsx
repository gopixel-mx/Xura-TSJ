'use client';

import {
  ReactNode, useState, useMemo, useCallback, useEffect,
} from 'react';
import { useRouter } from 'next/router';
import SnackAlert from '@/app/shared/common/Alert';
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
  const [user, setUser] = useState<any>(null);
  const [noti, setNoti] = useState<Noti | null>(null); // Puede ser null si no hay notificaciones
  const [loading, setLoading] = useState<boolean>(false);

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = useCallback(() => !!user, [user]);

  // Función para eliminar la autenticación y redirigir al usuario
  const removeAuth = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  }, [router]);

  // Efecto para verificar el token almacenado en el localStorage al cargar la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
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
  }), [user, noti, loading, isAuthenticated, removeAuth]);

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
