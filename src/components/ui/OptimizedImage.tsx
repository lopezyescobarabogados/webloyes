'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onError?: () => void;
  fallbackSrc?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading = 'lazy',
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  objectFit = 'cover',
  onError,
  fallbackSrc = '/images/placeholder.jpg',
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    setImgSrc(fallbackSrc);
    onError?.();
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const imageProps = {
    src: imgSrc,
    alt,
    className: `
      ${className}
      ${isLoading ? 'animate-pulse bg-gray-200' : ''}
      ${hasError ? 'opacity-75' : ''}
      transition-opacity duration-300
    `.trim(),
    priority,
    loading,
    quality,
    placeholder,
    blurDataURL,
    sizes,
    onLoad: handleLoad,
  };

  if (fill) {
    return (
      <div className="relative overflow-hidden">
        <Image
          {...imageProps}
          fill
          alt={alt}
          style={{ objectFit }}
          onError={handleError}
        />
      </div>
    );
  }

  return (
    <Image
      {...imageProps}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
    />
  );
}

// Componente específico para avatares
interface AvatarImageProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallbackInitials?: string;
}

export function AvatarImage({
  src,
  alt,
  size = 'md',
  className = '',
  fallbackInitials,
}: AvatarImageProps) {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-20 h-20 text-lg',
  };

  const sizePixels = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 80,
  };

  if (!src || hasError) {
    return (
      <div
        className={`
          ${sizeClasses[size]}
          ${className}
          rounded-full bg-navy flex items-center justify-center text-white font-medium
        `.trim()}
        role="img"
        aria-label={alt}
      >
        {fallbackInitials || alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={sizePixels[size]}
      height={sizePixels[size]}
      className={`${sizeClasses[size]} ${className} rounded-full object-cover`.trim()}
      onError={() => setHasError(true)}
      quality={85}
    />
  );
}

// Componente para lazy loading de secciones
interface LazyLoadSectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

export function LazyLoadSection({
  children,
  className = '',
  threshold = 0.1,
}: LazyLoadSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useState(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  });

  return (
    <div ref={setRef} className={className}>
      {isVisible ? children : <div className="h-32 bg-gray-100 animate-pulse rounded" />}
    </div>
  );
}
