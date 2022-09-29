import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';

import { AppLayout } from '@/components/layouts/AppLayout';

import type { AppProps } from 'next/app';

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
