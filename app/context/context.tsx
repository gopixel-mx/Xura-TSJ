'use client';

// import React, {
//   createContext, useEffect, useState, useMemo, useCallback,
// } from 'react';
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import SnackAlert from '@/app/components/common/Alert';
// // import getTokenLocalStorage from './getToken'; // Importa cuando sea necesario
// // import { findRoute } from '../../components/Drawer/utils/menuUsers';
// // Importa cuando sea necesario
//
// export const Context = createContext();
//
// function Provider({ children }) {
//   const router = useRouter();
//   const [session, setSession] = useState({});
//   const [auth, setAuth] = useState(false);
//   const [noti, setNoti] = useState(false);
//   const [loading, setLoading] = useState(false);
//   // const [shouldRedirect, setShouldRedirect] = useState(false);
//   // const [section, setSection] = useState(findRoute(router.route, session.rol));
//
//   // const excludedRoutes = ['/cualquierRuta', '/cualquierRuta'];
//
//   const removeAuth = useCallback(() => {
//     router.push('/');
//     localStorage.removeItem('token');
//     setSession({});
//     setAuth(false);
//   }, [router]);
//
//   useEffect(() => {
//     // const storedData = getTokenLocalStorage();
//     // if (storedData) {
//     //   setSession(storedData);
//     //   setAuth(true);
//     // } else if (!excludedRoutes.includes(router.route)) {
//     //   setShouldRedirect(true);
//     // }
//     // if (findRoute(router.route, session.rol)) {
//     //   setSection(findRoute(router.route, session.rol));
//     // }
//   }, [router]);
//
//   useEffect(() => {
//     // if (shouldRedirect) {
//     //   removeAuth();
//     // }
//   }, [removeAuth]);
//
//   // [shouldRedirect, removeAuth]);
//
//   const value = useMemo(() => ({
//     session,
//     auth,
//     noti,
//     setNoti,
//     // section,
//     // setSection,
//     setLoading,
//     loading,
//     // activateAuth: (userData) => {
//     //   setSession({
//     //     id: userData.data.id,
//     //     nombre: userData.data.usuario,
//     //     rol: userData.data.rol.nombre,
//     //     token: userData.token,
//     //   });
//     //   localStorage.setItem('token', JSON.stringify(userData.token));
//     //   setAuth(true);
//     //   router.push('../home');
//     // },
//     removeAuth,
//   }), [noti, loading, removeAuth]);
//
//   return (
//     <Context.Provider value={value}>
//       {children}
//       <SnackAlert
//         open={noti.open}
//         close={() => setNoti(false)}
//         type={noti.type}
//         mensaje={noti.message}
//       />
//     </Context.Provider>
//   );
// }
//
// Provider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
//
// export default {
//   Provider,
//   Consumer: Context.Consumer,
// };

import React, {
  createContext, useEffect, useState, useMemo, useCallback, ReactNode,
} from 'react';
import { useRouter } from 'next/router';
import SnackAlert from '@/app/shared/common/Alert';

// Define the shape of the context
interface NotificationType {
  open: boolean;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

interface ContextProps {
  session: Record<string, any>;
  auth: boolean;
  noti: NotificationType | null;
  setNoti: React.Dispatch<React.SetStateAction<NotificationType | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  removeAuth: () => void;
}

// Create the context with a default value
export const Context = createContext<ContextProps | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  const router = useRouter();
  const [session, setSession] = useState<Record<string, any>>({});
  const [auth, setAuth] = useState(false);
  const [noti, setNoti] = useState<NotificationType | null>(null);
  const [loading, setLoading] = useState(false);
  // const [shouldRedirect, setShouldRedirect] = useState(false);
  // const [section, setSection] = useState(findRoute(router.route, session.rol));

  const removeAuth = useCallback(() => {
    router.push('/');
    localStorage.removeItem('token');
    setSession({});
    setAuth(false);
  }, [router]);

  useEffect(() => {
    // Example of handling session here
  }, [router]);

  const value = useMemo(
    () => ({
      session,
      auth,
      noti,
      setNoti,
      loading,
      setLoading,
      removeAuth,
    }),
    [session, auth, noti, loading, removeAuth],
  );

  return (
    <Context.Provider value={value}>
      {children}
      {noti && (
        <SnackAlert
          open={noti.open}
          close={() => setNoti(null)}
          type={noti.type}
          mensaje={noti.message}
        />
      )}
    </Context.Provider>
  );
}
