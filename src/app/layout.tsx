import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import SetDocHeight from '@/utils/doc-height';
import NextAuthProvider from '@/components/Auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AnyDrop',
  description: '任意传送',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  // minimumScale: 1,
  // maximumScale: 1,
  // viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='zh-CN'>
      <body className={inter.className}>
        <NextAuthProvider>
          <SetDocHeight />
          <Providers>{children}</Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}
