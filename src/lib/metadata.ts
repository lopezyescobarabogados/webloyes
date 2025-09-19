import type { Metadata } from 'next';

export const siteConfig = {
  name: 'López & Escobar Abogados Asociados',
  description: 'Firma de abogados especializada en derecho corporativo, civil, penal y administrativo. Experiencia, profesionalismo y resultados efectivos.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lopez-escobar.com',
  ogImage: '/og-image.png',
  twitterImage: '/twitter-image.png',
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
    'López & Escobar'
  ]
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: 'López & Escobar Abogados',
      url: siteConfig.url,
    },
  ],
  creator: 'López & Escobar Abogados',
  publisher: 'López & Escobar Abogados',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
      sizes: '32x32',
      type: 'image/x-icon',
    },
    {
      rel: 'icon',
      url: '/Logo2.svg',
      type: 'image/svg+xml',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    {
      rel: 'icon',
      url: '/icons/icon-192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      rel: 'shortcut icon',
      url: '/favicon.ico',
      type: 'image/x-icon',
    },
  ],
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Logo`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.twitterImage,
        width: 800,
        height: 400,
        alt: `${siteConfig.name} - Logo`,
      },
    ],
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
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  category: 'legal services',
  alternates: {
    canonical: siteConfig.url,
  },
};

// Función para generar metadatos dinámicos
export const generateMetadata = (
  title?: string,
  description?: string,
  image?: string,
  noIndex?: boolean
): Metadata => {
  return {
    ...defaultMetadata,
    title: title ? `${title} | ${siteConfig.name}` : defaultMetadata.title,
    description: description || siteConfig.description,
    robots: noIndex ? { index: false, follow: false } : defaultMetadata.robots,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: image ? [image] : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: image ? [
        {
          url: image,
          width: 800,
          height: 400,
          alt: title || siteConfig.name,
        }
      ] : defaultMetadata.twitter?.images,
    },
  };
};

// Metadatos específicos para páginas de noticias
export const generateNewsMetadata = (
  title: string,
  excerpt: string,
  image?: string,
  publishedTime?: string,
  author?: string
): Metadata => {
  return {
    ...generateMetadata(title, excerpt, image),
    openGraph: {
      ...defaultMetadata.openGraph,
      type: 'article',
      title,
      description: excerpt,
      images: image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png',
        }
      ] : defaultMetadata.openGraph?.images,
      publishedTime,
      authors: author ? [author] : undefined,
    },
  };
};

// Función para generar metadatos de páginas (compatibilidad)
export const generatePageMetadata = (
  title: string,
  description: string,
  path?: string,
  keywords?: string[],
  noIndex?: boolean
): Metadata => {
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url;
  
  return {
    ...generateMetadata(title, description, undefined, noIndex),
    keywords: keywords || siteConfig.keywords,
    alternates: {
      canonical: url,
    },
  };
};
