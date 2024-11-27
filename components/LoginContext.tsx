import { useRedirect } from '@/hooks/useRedirect';
import { getRole, isLogin } from '@/utils/api';
import { router } from 'expo-router';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export const LoginContext = createContext('');

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function checkIfLoggedin() {
      try {
        await isLogin();
        useRedirect((await getRole()).data.role);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    checkIfLoggedin();
  }, []);
  console.log('isloading', isLoading);
  console.log('error ', error);
  //   return;
  if (isLoading) return;
  //   if (error) return;
  //   if (role) {
  //     console.log(role);

  //     // useRedirect(role);

  //     return;
  //   }
  return <LoginContext.Provider value={''}>{children}</LoginContext.Provider>;
};

export const useLoginContext = () => {
  return useContext(LoginContext);
};
