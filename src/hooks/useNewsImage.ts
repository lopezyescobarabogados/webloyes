/**
 * Hook personalizado para manejo optimizado de imágenes de noticias
 * Facilita la integración con el componente ApiImage
 */

import { useState, useEffect } from 'react';

interface NewsImageData {
  id: string;
  title: string;
  imageUrl?: string | null;
}

/**
 * Hook para obtener la URL correcta de imagen de una noticia
 */
export function useNewsImage(news: NewsImageData) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [hasValidImage, setHasValidImage] = useState(false);

  useEffect(() => {
    // Debug temporal para desarrollo
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.log('🐛 [DEV] useNewsImage DEBUG:', {
        newsId: news.id,
        newsTitle: news.title?.substring(0, 30),
        originalImageUrl: news.imageUrl,
        hostname: window.location.hostname
      });
    }

    // Si tenemos una imageUrl válida, procesarla
    if (news.imageUrl && news.imageUrl.trim().length > 0) {
      let processedUrl = news.imageUrl;
      
      // Si la URL ya es absoluta de producción, usarla tal como está
      if (news.imageUrl.startsWith('https://') && 
          (news.imageUrl.includes('lopezyescobarabogados.com') || news.imageUrl.includes('railway.app'))) {
        processedUrl = news.imageUrl;
      }
      // En producción, convertir URLs relativas a absolutas
      else if (typeof window !== 'undefined' && 
          news.imageUrl.startsWith('/api/images/') && 
          window.location.hostname.includes('lopezyescobarabogados.com')) {
        processedUrl = `https://${window.location.hostname}${news.imageUrl}`;
      }
      // En desarrollo, si la URL es relativa pero la base de datos es de producción
      else if (typeof window !== 'undefined' && 
               window.location.hostname === 'localhost' &&
               news.imageUrl.startsWith('/api/images/')) {
        // Asumir que es una imagen de producción
        processedUrl = `https://www.lopezyescobarabogados.com${news.imageUrl}`;
      }
      
      setImageUrl(processedUrl);
      setHasValidImage(true);
      return;
    }

    // Si no hay imageUrl pero tenemos un ID, usar el endpoint de imagen
    if (news.id) {
      let fallbackUrl = `/api/images/${news.id}`;
      
      // En producción, usar URL absoluta
      if (typeof window !== 'undefined' && window.location.hostname.includes('lopezyescobarabogados.com')) {
        fallbackUrl = `https://${window.location.hostname}/api/images/${news.id}`;
      }
      // En desarrollo, usar URL de producción
      else if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        fallbackUrl = `https://www.lopezyescobarabogados.com/api/images/${news.id}`;
      }
      
      setImageUrl(fallbackUrl);
      setHasValidImage(true);
      return;
    }

    // Si no hay nada, establecer como sin imagen
    setImageUrl(null);
    setHasValidImage(false);
  }, [news.imageUrl, news.id, news.title]);

  return {
    imageUrl,
    hasValidImage,
    // URL por defecto usando el ID de la noticia
    fallbackUrl: `/api/images/${news.id}`,
  };
}

/**
 * Utilidad para generar props optimizadas para ApiImage
 */
export function getNewsImageProps(
  news: NewsImageData,
  options: {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    priority?: boolean;
    className?: string;
  } = {}
) {
  const { size = 'md', priority = false, className = '' } = options;
  
  const sizes = {
    sm: { width: 200, height: 150 },
    md: { width: 400, height: 300 },
    lg: { width: 600, height: 400 },
    xl: { width: 800, height: 500 },
  };

  return {
    src: news.imageUrl || `/api/images/${news.id}`,
    alt: `Imagen del artículo: ${news.title}`,
    width: sizes[size].width,
    height: sizes[size].height,
    priority,
    className: `rounded-lg ${className}`,
    fallbackText: 'Sin imagen',
  };
}

/**
 * Utilidad para precargar imágenes críticas
 */
export function preloadNewsImages(newsItems: NewsImageData[], count: number = 3) {
  if (typeof window === 'undefined') return;

  newsItems.slice(0, count).forEach((news) => {
    if (news.imageUrl) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = news.imageUrl;
      document.head.appendChild(link);
    }
  });
}

/**
 * Tipo para props de SmartNewsImage
 */
export interface SmartNewsImageProps {
  news: NewsImageData;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  priority?: boolean;
  className?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}
