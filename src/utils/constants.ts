// Constantes de la aplicación

export const SITE_CONFIG = {
  name: 'López y Escobar Abogados Asociados',
  description: 'Firma de abogados especializada en derecho corporativo, civil, penal y administrativo en Colombia',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: 'López y Escobar Abogados Asociados',
} as const;

export const NAVIGATION_ITEMS = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/contacto', label: 'Contacto' },
] as const;

export const SOCIAL_LINKS = {
  email: 'info@lopezescobarabogados.com',
  phone: '+57-1-234-5678',
  linkedin: 'https://linkedin.com/company/lopez-escobar-abogados',
  facebook: 'https://facebook.com/lopezescobarabogados',
  address: 'Carrera 11 #93-45, Oficina 801, Bogotá, Colombia'
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const COLORS = {
  navy: '#0a2342',
  white: '#ffffff',
} as const;
