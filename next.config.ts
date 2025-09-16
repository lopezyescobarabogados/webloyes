import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configuración de imágenes optimizadas
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      // Servicios de imágenes externos
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // API local para desarrollo
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/images/**',
      },
      // API en Railway para producción (dominio dinámico)
      {
        protocol: 'https',
        hostname: '*.railway.app',
        pathname: '/api/images/**',
      }
    ],
    // Configuración optimizada para PostgreSQL images API
    unoptimized: false, // Mantener optimización para URLs externas
    minimumCacheTTL: 31536000, // 1 año de cache para imágenes de API
  },

  // Configuración de headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          }
        ],
      },
      // Headers específicos para API de imágenes
      {
        source: '/api/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          }
        ],
      },
    ];
  },

  // Configuración para production
  experimental: {
    optimizePackageImports: ['@prisma/client'],
  },

  // Configuración de output para Railway
  output: 'standalone',
};

export default nextConfig;
