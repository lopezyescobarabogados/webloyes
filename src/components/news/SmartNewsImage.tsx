/**
 * Componente wrapper que combina useNewsImage con ApiImage
 * Para el manejo inteligente de imágenes de noticias
 */

'use client';

import { ApiImage } from '@/components/ui/OptimizedImage';
import { useNewsImage, getNewsImageProps, type SmartNewsImageProps } from '@/hooks/useNewsImage';

export function SmartNewsImage({
  news,
  size = 'md',
  priority = false,
  className = '',
  fill = false,
}: SmartNewsImageProps) {
  const { imageUrl } = useNewsImage(news);
  const imageProps = getNewsImageProps(news, { size, priority, className });

  // Debug temporal para desarrollo
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('📰 [DEV] SmartNewsImage DEBUG:', {
      newsId: news.id,
      newsTitle: news.title?.substring(0, 30),
      originalImageUrl: news.imageUrl,
      processedImageUrl: imageUrl,
      finalSrc: imageUrl || imageProps.src,
      fill
    });
  }

  if (fill) {
    return (
      <ApiImage
        src={imageUrl || imageProps.src}
        alt={imageProps.alt}
        fill={true}
        priority={priority}
        className={className}
        fallbackText="Imagen no disponible"
      />
    );
  }

  return (
    <ApiImage
      {...imageProps}
      src={imageUrl || imageProps.src}
    />
  );
}

export default SmartNewsImage;
