import type { Metadata, Viewport } from 'next';
import { defaultMetadata } from '@/lib/metadata';
import Analytics from '../components/Analytics';
import { StructuredData } from '@/lib/structured-data';
import { PreloadResources } from '@/lib/performance';
import AccessibilityProviders from '@/components/accessibility/AccessibilityProviders';
import { Suspense } from 'react';
import './globals.css';

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0a2342',
};

// Componente cliente separado para manejar hooks
function ClientComponents({ children }: { children: React.ReactNode }) {
  return (
    <AccessibilityProviders>
      {children}
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
      <StructuredData type="LegalService" data={null} />
      <StructuredData type="WebSite" data={null} />
    </AccessibilityProviders>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="font-sans">
      <head>
        <PreloadResources />
        <link rel="icon" href="/Logo2.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased">
        <main id="main-content">
          <ClientComponents>{children}</ClientComponents>
        </main>
      </body>
    </html>
  );
}
