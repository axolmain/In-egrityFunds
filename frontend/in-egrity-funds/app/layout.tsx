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
          {/* Preload Video Poster as Image */}
          <link
            rel='preload'
            href='/homeHero/solar-farm-poster.webp'
            as='image'
            type='image/webp'
          />
        </head>
        <body className={inter.className} suppressHydrationWarning={true}>
          <main className='relative'>
            <Navbar />
            {children}

            <Footer />
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
