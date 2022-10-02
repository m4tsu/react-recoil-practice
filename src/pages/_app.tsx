import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { FC, useEffect } from 'react';
import { RecoilRoot } from 'recoil';

import { AppLayout } from '@/components/layouts/AppLayout';
import { ToastContainer } from '@/libs/chakra/toast';
import { useAuth } from '@/store/Auth/usecase';

import type { AppProps } from 'next/app';

dayjs.extend(timezone);
dayjs.extend(utc);

// RecoilRoot の下で実行させたい
const Auth: FC = () => {
  const { login } = useAuth();
  useEffect(() => {
    login();
  }, [login]);
  return null;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Auth />
      <ChakraProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        <ToastContainer />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
