'use client';

import { createContext, useContext } from 'react';

interface User {
  id: string;
  token: string;
  correo?: string;
  curp?: string;
  celular?: string;
}

interface Noti {
  open: boolean;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  noti: Noti | null;
  setNoti: (noti: Noti | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isAuthenticated: () => boolean;
  removeAuth: () => void;
  activateAuth: (userData: User) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within a AuthProvider',
    );
  }
  return context;
}
