declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

export const pageview = (url: string) => {
  window.gtag(
    'config',
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
    {
      page_path: url,
    }
  );
};
