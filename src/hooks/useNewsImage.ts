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
    if (!news.imageUrl) {
      setImageUrl(null);
      setHasValidImage(false);
      return;
    }

    // Usar directamente la URL sin verificación previa
    // El componente ApiImage maneja los errores internamente
    setImageUrl(news.imageUrl);
    setHasValidImage(true);
  }, [news.imageUrl, news.id]);

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
}
