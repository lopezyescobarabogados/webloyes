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
