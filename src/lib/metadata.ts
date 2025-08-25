import type { Metadata } from 'next';

export const siteConfig = {
  name: 'López y Escobar Abogados Asociados',
  description: 'Firma de abogados especializada en derecho corporativo, civil, penal y administrativo. Experiencia, profesionalismo y resultados efectivos.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lopez-escobar.com',
  ogImage: '/images/og-image.jpg',
  icon: '/Logo2.svg',
  links: {
    twitter: 'https://twitter.com/lopezescobarabogados',
    linkedin: 'https://linkedin.com/company/lopez-escobar-abogados',
    facebook: 'https://facebook.com/lopezescobarabogados',
  },
  keywords: [
    'abogados',
    'derecho corporativo',
    'derecho civil',
    'derecho penal',
    'derecho administrativo',
    'asesoría jurídica',
    'consultoría legal',
    'firma de abogados',
    'servicios legales',
    'López y Escobar'
  ]
};

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: 'López y Escobar Abogados Asociados',
      url: siteConfig.url,
    },
  ],
  creator: 'López y Escobar Abogados Asociados',
  publisher: 'López y Escobar Abogados Asociados',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@lopezescobarabogados',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: '/Logo2.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const generatePageMetadata = (
  title: string,
  description: string,
  path: string,
  keywords?: string[],
  image?: string
): Metadata => {
  return {
    title,
    description,
    keywords: keywords || defaultMetadata.keywords,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: `https://lopezescobarabogados.com${path}`,
      images: image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
      images: image ? [image] : defaultMetadata.twitter?.images,
    },
    alternates: {
      canonical: path,
    },
  };
};
