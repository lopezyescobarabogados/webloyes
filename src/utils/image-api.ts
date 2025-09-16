/**
 * Utilidades para manejo de imágenes desde PostgreSQL
 * Optimizado para producción con fallbacks
 */

export interface NewsImage {
  id: string;
  imageUrl?: string | null;
  title?: string;
}

/**
 * Resuelve la URL de imagen correcta según la disponibilidad
 * @param news - Objeto noticia con imageUrl e id
 * @returns URL de imagen o null si no existe
 */
export function resolveImageUrl(news: NewsImage): string | null {
  // Prioridad: imagen local > URL externa > fallback
  if (news.imageUrl?.startsWith('/api/images/')) {
    return news.imageUrl; // Imagen en PostgreSQL
  }
  
  if (news.imageUrl && isValidHttpUrl(news.imageUrl)) {
    return news.imageUrl; // URL externa válida
  }
  
  return null; // Sin imagen
}

/**
 * Genera URL de imagen desde PostgreSQL
 * @param newsId - ID de la noticia
 * @returns URL del endpoint de imagen
 */
export function getImageApiUrl(newsId: string): string {
  return `/api/images/${newsId}`;
}

/**
 * Verifica si una imagen existe sin descargarla
 * @param newsId - ID de la noticia
 * @returns Promise<boolean>
 */
export async function checkImageExists(newsId: string): Promise<boolean> {
  try {
    const response = await fetch(getImageApiUrl(newsId), {
      method: 'HEAD',
      cache: 'force-cache'
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Valida si una URL es HTTP/HTTPS válida
 */
function isValidHttpUrl(string: string): boolean {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Props optimizadas para Next.js Image component
 */
export function getImageProps(news: NewsImage) {
  const src = resolveImageUrl(news);
  
  return {
    src: src || '/images/placeholder.jpg',
    alt: news.title || 'Imagen de noticia',
    // Deshabilitar optimización para imágenes de API local
    unoptimized: src?.startsWith('/api/images/') || false,
    priority: false, // Cambiar a true para imágenes above-the-fold
  };
}

/**
 * Hook para precargar imágenes críticas
 */
export function preloadImage(src: string): void {
  if (typeof window !== 'undefined' && src) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  }
}
