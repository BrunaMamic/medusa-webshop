import * as React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <React.Suspense>
        <Header colorScheme="inverted" isAbsolute />
      </React.Suspense>

      {children}

      <Footer />
    </>
  );
}
