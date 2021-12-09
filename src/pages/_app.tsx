<<<<<<< HEAD
import ContextProvider from '@contexts/index';
=======
import { UserProvider } from '@contexts/UserContext';
>>>>>>> ef08e0d (feat: ContextProvider 적용)
import '@styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" as="font" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          rel="preload"
          as="style"
          type="text/css"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=block"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=block"
        />
      </Head>
<<<<<<< HEAD
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
=======
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
>>>>>>> ef08e0d (feat: ContextProvider 적용)
    </>
  );
}

export default MyApp;
