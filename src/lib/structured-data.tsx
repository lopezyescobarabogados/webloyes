import { TeamMember } from '@/components/admin/TeamManagement';

export interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Person' | 'WebPage' | 'BreadcrumbList' | 'LocalBusiness' | 'LegalService';
  data: unknown;
}

// Schema.org Organization
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'López y Escobar Abogados Asociados',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lopez-escobar.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://lopez-escobar.com'}/og-image.png`,
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://lopez-escobar.com'}/og-image.png`,
    description: 'Firma de abogados especializada en derecho corporativo, civil, penal y administrativo',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Carrera 11 # 93-07, Oficina 501',
      addressLocality: 'Bogotá',
      addressRegion: 'Cundinamarca',
      postalCode: '110111',
      addressCountry: 'CO'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+57-1-555-0123',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English'],
      areaServed: 'CO'
    },
    serviceType: [
      'Derecho Corporativo',
      'Derecho Civil',
      'Derecho Penal',
      'Derecho Administrativo',
      'Asesoría Jurídica',
      'Consultoría Legal'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Colombia'
    },
    sameAs: [
      'https://facebook.com/lopezescobarabogados',
      'https://twitter.com/lopezescobarabogados',
      'https://linkedin.com/company/lopez-escobar-abogados'
    ]
  };
}

// Schema.org WebSite
export function generateWebSiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lopez-escobar.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'López y Escobar Abogados Asociados',
    url: baseUrl,
    description: 'Firma de abogados especializada en derecho corporativo, civil, penal y administrativo',
    publisher: {
      '@type': 'LegalService',
      name: 'López y Escobar Abogados Asociados'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/buscar?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

// Schema.org Person (para abogados del equipo)
export function generatePersonSchema(member: TeamMember) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lopez-escobar.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.position,
    email: member.email,
    image: member.imageUrl,
    description: member.bio,
    worksFor: {
      '@type': 'LegalService',
      name: 'López y Escobar Abogados Asociados',
      url: baseUrl
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Medellín' // Ciudad fija para la firma de abogados
    },
    sameAs: [
      // Eliminar campos que no existen en el modelo
    ].filter(Boolean),
    additionalType: 'https://schema.org/Attorney'
  };
}

// Schema.org LocalBusiness
export function generateLocalBusinessSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lopez-escobar.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${baseUrl}#legalservice`,
    name: 'López y Escobar Abogados Asociados',
    image: `${baseUrl}/images/logo.png`,
    url: baseUrl,
    telephone: '+57-1-555-0123',
    priceRange: 'Consulta previa cita',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Carrera 11 # 93-07, Oficina 501',
      addressLocality: 'Bogotá',
      postalCode: '110111',
      addressCountry: 'CO'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 4.6097, // Coordenadas de Bogotá
      longitude: -74.0817
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday', 
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '08:00',
      closes: '18:00'
    },
    serviceType: [
      'Derecho Corporativo',
      'Derecho Civil',
      'Derecho Penal',
      'Derecho Administrativo'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Colombia'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '89'
    }
  };
}

// Schema.org BreadcrumbList
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://webloyes.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: `${baseUrl}${breadcrumb.url}`
    }))
  };
}

// Schema.org WebPage
export function generateWebPageSchema(title: string, description: string, url: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://webloyes.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: `${baseUrl}${url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Webloyes',
      url: baseUrl
    },
    about: {
      '@type': 'Organization',
      name: 'Webloyes'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Webloyes'
    }
  };
}

// Componente para renderizar structured data
export function StructuredData({ type, data }: StructuredDataProps) {
  let schema;
  
  switch (type) {
    case 'Organization':
      schema = generateOrganizationSchema();
      break;
    case 'LegalService':
      schema = generateOrganizationSchema(); // Usa el mismo schema que ya está configurado como LegalService
      break;
    case 'WebSite':
      schema = generateWebSiteSchema();
      break;
    case 'LocalBusiness':
      schema = generateLocalBusinessSchema();
      break;
    case 'Person':
      schema = data;
      break;
    case 'WebPage':
      schema = data;
      break;
    case 'BreadcrumbList':
      schema = data;
      break;
    default:
      schema = data;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2)
      }}
    />
  );
}
