import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configuración de imágenes optimizadas
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ]
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
