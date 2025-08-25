interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization' | 'LegalService';
  name: string;
  url: string;
  logo?: string;
  description?: string;
  address?: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  contactPoint?: {
    '@type': 'ContactPoint';
    telephone?: string;
    contactType?: string;
    email?: string;
  };
  sameAs?: string[];
}

interface WebsiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}

interface ServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'Service';
  name: string;
  description: string;
  provider: {
    '@type': 'Organization';
    name: string;
  };
  serviceType: string;
  areaServed?: string;
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'López y Escobar Abogados Asociados',
    url: 'https://lopezescobarabogados.com',
    logo: 'https://lopezescobarabogados.com/images/logo.png',
    description: 'Firma de abogados especializada en derecho corporativo, civil, penal y administrativo en Colombia',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bogotá',
      addressRegion: 'Cundinamarca',
      addressCountry: 'CO',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@lopezescobarabogados.com',
      telephone: '+57-1-234-5678'
    },
    sameAs: [
      'https://www.linkedin.com/company/lopez-escobar-abogados',
      'https://www.facebook.com/lopezescobarabogados'
    ],
  };
}

export function generateWebsiteSchema(): WebsiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'López y Escobar Abogados Asociados',
    url: 'https://lopezescobarabogados.com',
    description: 'Firma de abogados especializada en derecho corporativo, civil, penal y administrativo en Colombia',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://lopezescobarabogados.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateServiceSchema(serviceName: string, description: string, serviceType: string): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description,
    provider: {
      '@type': 'Organization',
      name: 'López y Escobar Abogados Asociados',
    },
    serviceType,
    areaServed: 'Colombia',
  };
}

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
