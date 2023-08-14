import './globals.css';
import localFont from 'next/font/local';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${monaSans.variable}`}>
      <head>
        <link rel="preload" href="/icons.svg" as="image" type="image/svg+xml" />
      </head>

      <body>{children}</body>
    </html>
  );
}
