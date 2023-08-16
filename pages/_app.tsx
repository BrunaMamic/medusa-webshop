import * as React from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';

import './globals.css';

const monaSans = localFont({
  src: [
    {
      path: '../public/fonts/mona-sans/Mona-Sans-Regular.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/mona-sans/Mona-Sans-RegularItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/mona-sans/Mona-Sans-SemiBold.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/mona-sans/Mona-Sans-SemiBoldItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/mona-sans/Mona-Sans-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/mona-sans/Mona-Sans-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/mona-sans/Mona-Sans-Black.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/mona-sans/Mona-Sans-BlackItalic.otf',
      weight: '800',
      style: 'italic',
    },
  ],
  variable: '--font-mona-sans',
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div className={`${monaSans.className}`}>
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}
