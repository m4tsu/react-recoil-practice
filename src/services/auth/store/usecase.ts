import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { getCurrentUser } from '@/repositories/auth';

import { auth as authState } from './state';

export const useAuth = () => useRecoilValue(authState);

export const useAuthActions = () => {
  const setAuth = useSetRecoilState(authState);

  const login = useCallback(async () => {
    setAuth({
      isLoading: true,
      currentUser: undefined,
      authenticated: undefined,
    });
    const user = await getCurrentUser();
    if (user) {
      setAuth({ isLoading: false, currentUser: user, authenticated: true });
    } else {
      setAuth({
        isLoading: false,
        currentUser: undefined,
        authenticated: false,
      });
    }
  }, [setAuth]);

  const logout = useCallback(() => {
    setAuth({
      isLoading: false,
      currentUser: undefined,
      authenticated: undefined,
    });
  }, [setAuth]);

  return { login, logout };
};
