// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import ContextProvider from '@contexts/index';
import '@styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { pageview } from '@utils/googleAnalytics';

/* eslint-disable prefer-destructuring */
const NEXT_PUBLIC_FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN =
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const NEXT_PUBLIC_FIREBASE_PROJECT_ID =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID =
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const NEXT_PUBLIC_FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

function MyApp({ Component, pageProps }: AppProps) {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  /* eslint-disable no-template-curly-in-string */
  const router = useRouter();
  console.log('rendering CSR');
  useEffect(() => {
    const firebaseConfig = {
      apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };

    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    if (!getApps().length) {
      const app = initializeApp(firebaseConfig);
      getAnalytics(app);
    } else {
      getApp();
    }
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </>
  );
}

export default MyApp;
