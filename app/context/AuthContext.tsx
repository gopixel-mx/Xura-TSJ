'use client';

import { createContext } from 'react';

interface Noti {
  open: boolean;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

interface AuthContextProps {
  user: any;
  setUser: (user: any) => void;
  noti: Noti | null;
  setNoti: (noti: Noti | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isAuthenticated: () => boolean;
  removeAuth: () => void;
}

// eslint-disable-next-line import/prefer-default-export
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
