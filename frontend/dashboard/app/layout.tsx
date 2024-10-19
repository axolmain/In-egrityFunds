import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Footer from '@/components/ui/footer';
import { AppSidebar } from '@/components/app-sidebar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Inegrity Funds',
  description: 'Manage your financial dashboard with ease',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Inegrity Funds PWA',
  },
  applicationName: 'Inegrity Funds',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <UserProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className='flex'>
            <SidebarProvider>
              <AppSidebar />
              <main>
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
          </div>
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
