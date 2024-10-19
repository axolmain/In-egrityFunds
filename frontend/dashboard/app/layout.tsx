// layout.tsx
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import Footer from '@/components/ui/footer';
import { AppSidebar } from '@/components/AppSidebar';
import Navbar from '@/components/Navbar'; // Abstracted Navbar
import WidgetSection from '@/components/WidgetSection';

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
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900`}
        >
          <div className='flex h-screen'>
            <SidebarProvider>
              <AppSidebar />
              <div className='flex-1 flex flex-col'>
                {/* Abstracted Navbar */}
                <Navbar />

                {/* Abstracted Widget Section */}
                <WidgetSection />

                {/* Main Content */}
                <main className='flex-1 p-6 bg-gray-50 dark:bg-gray-900'>
                  {children}
                </main>

                {/* Footer */}
                <Footer />
              </div>
            </SidebarProvider>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
