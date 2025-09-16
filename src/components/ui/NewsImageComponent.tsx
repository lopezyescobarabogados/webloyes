import Image from 'next/image';
import { useState } from 'react';
import { resolveImageUrl, type NewsImage } from '@/utils/image-api';

interface NewsImageComponentProps {
  news: NewsImage;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
}

/**
 * Componente optimizado para mostrar imágenes de noticias
 * Maneja automáticamente imágenes de PostgreSQL y URLs externas
 */
export function NewsImageComponent({
  news,
  width = 800,
  height = 400,
  className = '',
  priority = false,
  sizes,
  fill = false,
}: NewsImageComponentProps) {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  const imageUrl = resolveImageUrl(news);
  const shouldShowImage = imageUrl && !imageError;

  // Placeholder cuando no hay imagen o hay error
  if (!shouldShowImage) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center text-gray-500 ${className}`}
        style={fill ? {} : { width, height }}
      >
        <span className="text-sm">Sin imagen</span>
      </div>
    );
  }

  const imageProps = {
    src: imageUrl,
    alt: news.title || 'Imagen de noticia',
    className: `transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'} ${className}`,
    onLoad: () => setLoading(false),
    onError: () => {
      setImageError(true);
      setLoading(false);
    },
    priority,
    sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    // Deshabilitar optimización para API local
    unoptimized: imageUrl.startsWith('/api/images/'),
  };

  return (
    <div className={fill ? 'relative' : ''} style={fill ? {} : { width, height }}>
      {loading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={fill ? {} : { width, height }}
        >
          <span className="text-gray-400 text-sm">Cargando...</span>
        </div>
      )}
      
      {fill ? (
        <Image
          {...imageProps}
          fill
          alt={news.title || 'Imagen de noticia'}
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <Image
          {...imageProps}
          width={width}
          height={height}
          alt={news.title || 'Imagen de noticia'}
          style={{ objectFit: 'cover' }}
        />
      )}
    </div>
  );
}
