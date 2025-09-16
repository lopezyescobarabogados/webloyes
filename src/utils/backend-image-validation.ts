/**
 * Validaciones del backend para URLs de imagen
 * Utiliza las mismas funciones de validación que el frontend
 */

import { validateImageUrl, getImageUrlInfo } from '@/utils/image-validation';

/**
 * Middleware de validación para APIs que reciben URLs de imagen
 */
export function validateImageUrlMiddleware(imageUrl: string): {
  isValid: boolean;
  error?: string;
  processedUrl?: string;
  needsProcessing: boolean;
} {
  if (!imageUrl || imageUrl.trim() === '') {
    return {
      isValid: true, // URL opcional
      needsProcessing: false
    };
  }

  const validation = validateImageUrl(imageUrl);
  
  if (!validation.isValid) {
    return {
      isValid: false,
      error: validation.error,
      needsProcessing: false
    };
  }

  const urlInfo = getImageUrlInfo(imageUrl);
  
  return {
    isValid: true,
    processedUrl: imageUrl,
    needsProcessing: urlInfo.needsProcessing
  };
}

/**
 * Valida datos de noticia incluyendo URL de imagen
 */
export function validateNewsData(data: {
  title: string;
  excerpt: string;
  author: string;
  category: string;
  imageUrl?: string;
}): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  // Validar campos requeridos
  if (!data.title || data.title.trim().length < 5) {
    errors.title = 'El título debe tener al menos 5 caracteres';
  }
  if (data.title && data.title.length > 200) {
    errors.title = 'El título no puede superar 200 caracteres';
  }

  if (!data.excerpt || data.excerpt.trim().length < 20) {
    errors.excerpt = 'El resumen debe tener al menos 20 caracteres';
  }
  if (data.excerpt && data.excerpt.length > 10000) {
    errors.excerpt = 'El resumen no puede superar 10,000 caracteres';
  }

  if (!data.author || data.author.trim().length < 2) {
    errors.author = 'El autor debe tener al menos 2 caracteres';
  }
  if (data.author && data.author.length > 100) {
    errors.author = 'El autor no puede superar 100 caracteres';
  }

  if (!data.category || data.category.trim().length < 2) {
    errors.category = 'La categoría es requerida';
  }

  // Validar URL de imagen si está presente
  if (data.imageUrl && data.imageUrl.trim() !== '') {
    const imageValidation = validateImageUrlMiddleware(data.imageUrl);
    if (!imageValidation.isValid) {
      errors.imageUrl = imageValidation.error || 'URL de imagen inválida';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Sanitiza y prepara datos de noticia para guardar en base de datos
 */
export function sanitizeNewsData(data: {
  title: string;
  excerpt: string;
  author: string;
  category: string;
  imageUrl?: string;
}): {
  title: string;
  excerpt: string;
  author: string;
  category: string;
  imageUrl: string;
  needsImageProcessing: boolean;
} {
  const imageValidation = validateImageUrlMiddleware(data.imageUrl || '');
  
  return {
    title: data.title.trim(),
    excerpt: data.excerpt.trim(),
    author: data.author.trim(),
    category: data.category.trim(),
    imageUrl: data.imageUrl?.trim() || '',
    needsImageProcessing: imageValidation.needsProcessing
  };
}

/**
 * Valida múltiples campos de imagen (por ejemplo, para validación de galería)
 */
export function validateImageGallery(imageUrls: string[]): {
  isValid: boolean;
  validUrls: string[];
  invalidUrls: Array<{ url: string; error: string }>;
} {
  const validUrls: string[] = [];
  const invalidUrls: Array<{ url: string; error: string }> = [];

  imageUrls.forEach(url => {
    const validation = validateImageUrl(url);
    if (validation.isValid) {
      validUrls.push(url);
    } else {
      invalidUrls.push({
        url,
        error: validation.error || 'URL inválida'
      });
    }
  });

  return {
    isValid: invalidUrls.length === 0,
    validUrls,
    invalidUrls
  };
}
