import { useRouter } from 'next/router';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Loading } from '@/components/ui/Loading';
import { toast } from '@/libs/chakra/toast';
import { getCurrentUser } from '@/repositories/auth';

import { CurrentUser } from './model';
import { auth as authState } from './state';

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

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
  return { auth, login, logout };
};

const CurrentUserContext = createContext<CurrentUser | undefined>(undefined);

type AuthGuardProps = {
  children: ReactNode;
};
export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const auth = useRecoilValue(authState);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    if (auth.authenticated === false) {
      toast({
        title: 'ログインできませんでした。',
        status: 'error',
        position: 'top-right',
      });
      router.push('/');
    }
  }, [auth, router]);

  if (!auth.authenticated) {
    // currentUser === null の時は useEffect で処理する
    return null;
  }

  if (auth.isLoading) {
    return <Loading />;
  }

  return (
    <CurrentUserContext.Provider value={auth.currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const currentUser = useContext(CurrentUserContext);
  if (currentUser === undefined)
    throw new Error('useCurrentUser must be called inside <AuthGuard />');
  return currentUser;
};
