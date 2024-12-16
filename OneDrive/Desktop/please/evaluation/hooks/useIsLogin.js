import { getRole, isLogin, logout } from '@/utils/api';
import { useEffect, useState } from 'react';

export const useIslogin = () => {
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const Logout = () => {
    logout().then(() => {
      setLoading(false);
      setRole('');
      setError(false);
      setLoggedIn(false);
      // role == 'admin' ? router.replace('/admin') : router.replace('/');
    });
  };
  const ChangeStatus = (role) => {
    if (!role) throw new Error('role doesnt exist');
    setRole(role);
    setLoggedIn(true);
    setLoading(false);
    setError(false);
  };
  async function CheckStatus() {
    try {
      await isLogin();
      setLoggedIn(true);
      setRole((await getRole()).data.role);
    } catch (error) {
      setRole('');
      setLoggedIn(false);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    CheckStatus();
  }, []);

  return {
    error,
    isLoading,
    isLoggedIn,
    role,
    Logout,
    CheckStatus,
    ChangeStatus,
  };
};
