import type { Metadata } from 'next';

export const siteConfig = {
  name: 'López & Escobar Abogados Asociados',
  description: 'Firma de abogados especializada en derecho corporativo, civil, penal y administrativo. Experiencia, profesionalismo y resultados efectivos.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lopez-escobar.com',
  ogImage: '/icons/icon-512.png',
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
      sizes: 'any',
    },
    {
      rel: 'icon',
      url: '/Logo2.svg',
      type: 'image/svg+xml',
    },
    {
      rel: 'apple-touch-icon',
      url: '/icons/icon-192.png',
      sizes: '192x192',
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
        width: 512,
        height: 512,
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
      images: image ? [image] : defaultMetadata.twitter?.images,
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
      images: image ? [image] : defaultMetadata.openGraph?.images,
      publishedTime,
      authors: author ? [author] : undefined,
    },
  };
};
