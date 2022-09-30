import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { AppLayout } from '@/components/layouts/AppLayout';

import type { AppProps } from 'next/app';

dayjs.extend(timezone);
dayjs.extend(utc);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ChakraProvider>
  );
}

export default MyApp;
