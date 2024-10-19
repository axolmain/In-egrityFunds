import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Inegrity',
  description: 'Smart finance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <UserProvider>
        <head>
          <meta name='viewport'
                content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'/>

          <meta name="pwa-demo" content="pwa-demo"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
          <meta name="apple-mobile-web-app-title" content="pwa-demo"/>
          <meta name="description" content="pwa-demo"/>
          <meta name="format-detection" content="telephone=no"/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="msapplication-TileColor" content="#2B5797"/>
          <meta name="msapplication-tap-highlight" content="no"/>
          <meta name="theme-color" content="#000000"/>

          <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
          <link rel="manifest" href="/manifest.json"/>
          <link rel="shortcut icon" href="/favicon.ico"/>
          <link
              rel='preload'
              href='/homeHero/solar-farm-poster.webp'
              as='image'
              type='image/webp'
          />
        </head>
        <body className={inter.className} suppressHydrationWarning={true}>
        <main className='relative'>
          <Navbar/>
          {children}

          <Footer/>
        </main>
        </body>
      </UserProvider>
    </html>
  );
}
