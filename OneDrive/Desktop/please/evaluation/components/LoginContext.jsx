import { useIslogin } from '@/hooks/useIsLogin';
import { createContext, useContext } from 'react';

export const LoginContext = createContext(null);

export const LoginContextProvider = ({
  children
}) => {
  const {
    isLoading,
    isLoggedIn,
    error,
    role,
    Logout,
    CheckStatus,
    ChangeStatus,
  } = useIslogin();
  return (
    (<LoginContext.Provider
      value={{
        isLoading: isLoading,
        isLoggedIn: isLoggedIn,
        error: error,
        role: role,
        logout: Logout,
        CheckStatus: CheckStatus,
        ChangeStatus: ChangeStatus,
      }}>
      {children}
    </LoginContext.Provider>)
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) throw new Error('missing context');
  return context;
};
