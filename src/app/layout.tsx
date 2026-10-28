import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { DirectionProvider, Toaster } from '@/components/UiComponents';
import { APP_DESCRIPTION, APP_NAME } from '@/lib/app-config';
import { locale } from '@/lib/locale';
export const metadata: Metadata = { title: APP_NAME, description: APP_DESCRIPTION };
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={locale.lang} dir={locale.dir} data-theme="light">
      <body className="bg-background font-sans text-foreground antialiased">
        <DirectionProvider>
          {children}
          <Toaster />
        </DirectionProvider>
      </body>
    </html>
  );
}
