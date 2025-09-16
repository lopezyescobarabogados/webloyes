/**
 * Utilidad para manejar imágenes en el sistema de noticias
 * Combina las soluciones de Google Drive y proxy CORS
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { convertGoogleDriveUrl, isGoogleDriveUrl } from '../utils/image-utils';

/**
 * Procesa una URL de imagen para garantizar que funcione correctamente
 * @param imageUrl - URL original de la imagen
 * @returns Promise con la URL procesada o datos base64
 */
export async function processImageUrl(imageUrl: string): Promise<{
  success: boolean;
  processedUrl?: string;
  dataUrl?: string;
  method: 'direct' | 'converted' | 'proxied' | 'base64';
  error?: string;
}> {
  try {
    // 1. Si es base64, devolver directamente
    if (imageUrl.startsWith('data:image/')) {
      return {
        success: true,
        dataUrl: imageUrl,
        method: 'base64'
      };
    }

    // 2. Si es Google Drive, convertir URL
    if (isGoogleDriveUrl(imageUrl)) {
      const convertedUrl = convertGoogleDriveUrl(imageUrl);
      return {
        success: true,
        processedUrl: convertedUrl,
        method: 'converted'
      };
    }

    // 3. Para otras URLs externas, intentar proxy CORS
    if (imageUrl.startsWith('http')) {
      try {
        const response = await fetch('/api/proxy-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.dataUrl) {
            return {
              success: true,
              dataUrl: result.dataUrl,
              method: 'proxied'
            };
          }
        }
      } catch (proxyError) {
        console.warn('Proxy falló, intentando URL directa:', proxyError);
      }
    }

    // 4. Como último recurso, devolver URL original
    return {
      success: true,
      processedUrl: imageUrl,
      method: 'direct'
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      method: 'direct'
    };
  }
}

/**
 * Hook para validar y procesar imágenes en formularios
 */
export function useImageProcessor() {
  const processImage = async (imageUrl: string) => {
    if (!imageUrl.trim()) {
      throw new Error('URL de imagen requerida');
    }

    const result = await processImageUrl(imageUrl);
    
    if (!result.success) {
      throw new Error(result.error || 'Error al procesar imagen');
    }

    // Determinar qué URL usar para el componente Image de Next.js
    const finalUrl = result.dataUrl || result.processedUrl || imageUrl;
    
    return {
      url: finalUrl,
      method: result.method,
      isDataUrl: !!result.dataUrl
    };
  };

  return { processImage };
}

/**
 * Componente para mostrar imágenes procesadas con fallback
 */
export function ProcessedImage({ 
  src, 
  alt, 
  className = '',
  width = 400,
  height = 300,
  ...props 
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  [key: string]: string | number | undefined;
}) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadImage = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        const result = await processImageUrl(src);
        
        if (result.success) {
          const finalSrc = result.dataUrl || result.processedUrl || src;
          setImageSrc(finalSrc);
        } else {
          setError(result.error || 'Error al cargar imagen');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };

    if (src) {
      loadImage();
    }
  }, [src]);

  if (isLoading) {
    return (
      <div className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}>
        <span className="text-gray-500">Cargando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-100 border border-red-300 flex items-center justify-center ${className}`}>
        <span className="text-red-500 text-sm">Error: {error}</span>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  );
}
