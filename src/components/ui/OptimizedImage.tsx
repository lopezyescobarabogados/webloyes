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

/**
 * Componente específico para imágenes servidas desde PostgreSQL via API local
 * Optimizado para /api/images/[id] con manejo robusto de errores
 */
interface ApiImageProps {
  /** URL de la imagen (preferiblemente /api/images/[id]) */
  src: string;
  /** Texto alternativo para accesibilidad */
  alt: string;
  /** Ancho de la imagen */
  width?: number;
  /** Alto de la imagen */
  height?: number;
  /** Clases CSS adicionales */
  className?: string;
  /** Si la imagen debe tener prioridad de carga */
  priority?: boolean;
  /** Usar fill en lugar de width/height */
  fill?: boolean;
  /** Texto personalizado para el fallback */
  fallbackText?: string;
  /** Mostrar indicador de carga */
  showLoader?: boolean;
}

export function ApiImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
  fill = false,
  fallbackText = 'Sin imagen',
  showLoader = true,
}: ApiImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Debug temporal para desarrollo
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('🖼️ [DEV] ApiImage props:', {
      src,
      alt: alt?.substring(0, 30),
      width,
      height,
      fill,
      isApiImage: src?.startsWith('/api/images/') || src?.includes('/api/images/')
    });
  }

  // Detectar si es una imagen de la API local
  const isApiImage = src?.startsWith('/api/images/') || src?.includes('/api/images/');

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Componente de fallback cuando hay error o no hay imagen
  const FallbackComponent = () => (
    <div
      className={`
        bg-gray-100 border-2 border-dashed border-gray-300 
        flex items-center justify-center text-gray-500 text-sm
        ${fill ? 'absolute inset-0' : ''} 
        ${className}
      `}
      style={fill ? {} : { width, height }}
      role="img"
      aria-label={`${fallbackText}: ${alt}`}
    >
      <div className="text-center p-4">
        <svg
          className="mx-auto h-8 w-8 text-gray-400 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>{fallbackText}</span>
      </div>
    </div>
  );

  // Componente de loading
  const LoadingComponent = () => (
    <div
      className={`
        bg-gray-200 animate-pulse 
        flex items-center justify-center text-gray-400 text-sm
        ${fill ? 'absolute inset-0' : ''} 
        ${className}
      `}
      style={fill ? {} : { width, height }}
      role="status"
      aria-label="Cargando imagen"
    >
      {showLoader && (
        <div className="text-center">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mb-2" />
          <div>Cargando...</div>
        </div>
      )}
    </div>
  );

  // Si no hay src o hay error, mostrar fallback
  if (!src || hasError) {
    return <FallbackComponent />;
  }

  const imageProps = {
    src,
    alt,
    onLoad: handleLoad,
    onError: handleError,
    className: `
      transition-opacity duration-300 
      ${isLoading ? 'opacity-0' : 'opacity-100'} 
      ${className}
    `,
    priority,
    // Importante: deshabilitar optimización para imágenes de API local
    unoptimized: isApiImage,
    // Configuración para imágenes de API
    ...(isApiImage && {
      quality: 90,
      placeholder: 'empty' as const,
    }),
  };

  return (
    <div className={fill ? 'relative' : 'relative inline-block'} style={fill ? {} : { width, height }}>
      {/* Mostrar loader mientras carga */}
      {isLoading && <LoadingComponent />}
      
      {/* Imagen principal */}
      {fill ? (
        <Image
          {...imageProps}
          fill
          alt={alt}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <Image
          {...imageProps}
          width={width}
          height={height}
          alt={alt}
          style={{ objectFit: 'cover' }}
        />
      )}
    </div>
  );
}

/**
 * Variante específica para imágenes de noticias con estilos predefinidos
 */
interface NewsImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallbackText?: string;
}

export function NewsImage({
  src,
  alt,
  className = '',
  priority = false,
  size = 'md',
  fallbackText = 'Sin imagen',
}: NewsImageProps) {
  const sizes = {
    sm: { width: 200, height: 150 },
    md: { width: 400, height: 300 },
    lg: { width: 600, height: 400 },
    xl: { width: 800, height: 500 },
  };

  const { width, height } = sizes[size];

  return (
    <ApiImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-lg shadow-sm ${className}`}
      priority={priority}
      fallbackText={fallbackText}
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
