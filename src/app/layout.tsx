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
        {/* Favicon múltiple para mejor soporte */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" type="image/x-icon" />
        <link rel="icon" href="/Logo2.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        
        {/* Manifest y configuración */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a2342" />
        <meta name="msapplication-TileColor" content="#0a2342" />
        <meta name="msapplication-TileImage" content="/og-image.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Meta adicionales para buscadores */}
        <meta name="application-name" content="López &amp; Escobar Abogados" />
        <meta name="apple-mobile-web-app-title" content="López &amp; Escobar" />
      </head>
      <body className="font-sans antialiased">
        <main id="main-content">
          <ClientComponents>{children}</ClientComponents>
        </main>
      </body>
    </html>
  );
}
