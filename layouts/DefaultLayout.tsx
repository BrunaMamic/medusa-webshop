import * as React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  );
}
