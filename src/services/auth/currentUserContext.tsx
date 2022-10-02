import { useRouter } from 'next/router';
import { createContext, FC, ReactNode, useContext, useEffect } from 'react';
import React from 'react';

import { Loading } from '@/components/ui/Loading';

import { toast } from '../toast';

import { CurrentUser } from './store/model';
import { useAuth } from './store/usecase';

const CurrentUserContext = createContext<CurrentUser | undefined>(undefined);

type AuthGuardProps = {
  children: ReactNode;
};
export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const auth = useAuth();
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
