/**
 * Utilidades para validación de URLs de imagen
 * Valida URLs, detecta tipos específicos y verifica protocolos seguros
 */

/**
 * Valida si una URL de imag    return googleImageDomains.some(domain =>     return problematicDomains.some(domain => 
      urlObj.hostname === domain || 
      urlObj.hostname.endsWith('.' + domain)
    );

  } catch {
    return false;
  }rlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
    );

  } catch {
    return false;
  }álida y segura
 * @param url - URL a validar
 * @returns objeto con resultado de validación y mensaje de error si aplica
 */
export function validateImageUrl(url: string): {
  isValid: boolean;
  error?: string;
  type: 'data-url' | 'http-url' | 'invalid';
} {
  // Validar que no esté vacía
  if (!url || typeof url !== 'string') {
    return {
      isValid: false,
      error: 'URL requerida',
      type: 'invalid'
    };
  }

  const trimmedUrl = url.trim();
  
  // Validar URLs data (base64)
  if (trimmedUrl.startsWith('data:')) {
    if (trimmedUrl.startsWith('data:image/')) {
      // Validar formato básico de data URL de imagen
      const dataUrlPattern = /^data:image\/(jpeg|jpg|png|gif|webp|svg\+xml);base64,/i;
      if (dataUrlPattern.test(trimmedUrl)) {
        return {
          isValid: true,
          type: 'data-url'
        };
      } else {
        return {
          isValid: false,
          error: 'Formato de data URL de imagen inválido',
          type: 'invalid'
        };
      }
    } else {
      return {
        isValid: false,
        error: 'Solo se permiten data URLs de imagen',
        type: 'invalid'
      };
    }
  }

  // Validar URLs HTTP/HTTPS
  try {
    const urlObj = new URL(trimmedUrl);
    
    // Solo permitir protocolos seguros
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return {
        isValid: false,
        error: 'Solo se permiten protocolos HTTP y HTTPS',
        type: 'invalid'
      };
    }

    // Validar que tenga un hostname válido
    if (!urlObj.hostname) {
      return {
        isValid: false,
        error: 'URL debe tener un dominio válido',
        type: 'invalid'
      };
    }

    // Opcional: validar extensiones de archivo comunes
    const pathname = urlObj.pathname.toLowerCase();
    const hasImageExtension = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(pathname);
    const isGoogleDrive = isGoogleDriveUrl(trimmedUrl);
    const isGoogleImage = isGoogleImageUrl(trimmedUrl);
    
    // Para Google Drive y Google Images no validamos extensión
    if (!hasImageExtension && !isGoogleDrive && !isGoogleImage) {
      // Advertencia pero no error - puede ser una URL válida sin extensión
      console.warn('URL no tiene extensión de imagen reconocida:', pathname);
    }

    return {
      isValid: true,
      type: 'http-url'
    };

  } catch {
    return {
      isValid: false,
      error: 'URL con formato inválido',
      type: 'invalid'
    };
  }
}

/**
 * Detecta si una URL es de Google Drive
 * @param url - URL a verificar
 * @returns true si es URL de Google Drive
 */
export function isGoogleDriveUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const urlObj = new URL(url.trim());
    
    // Verificar dominio de Google Drive
    if (urlObj.hostname !== 'drive.google.com') {
      return false;
    }

    // Verificar patrones válidos de Google Drive
    const validPatterns = [
      /^\/file\/d\/[a-zA-Z0-9_-]+\/view/,  // Formato compartir: /file/d/ID/view
      /^\/file\/d\/[a-zA-Z0-9_-]+$/,       // Formato compartir sin /view
      /^\/uc\?id=[a-zA-Z0-9_-]+/,          // Formato directo: /uc?id=ID
      /^\/open\?id=[a-zA-Z0-9_-]+/         // Formato alternativo: /open?id=ID
    ];

    return validPatterns.some(pattern => pattern.test(urlObj.pathname + urlObj.search));

  } catch {
    return false;
  }
}

/**
 * Detecta si una URL es de Google Images (que típicamente tiene problemas de CORS)
 * @param url - URL a verificar
 * @returns true si es URL de Google Images o servicios relacionados
 */
export function isGoogleImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const urlObj = new URL(url.trim());
    
    // Dominios conocidos de Google Images que tienen problemas de CORS
    const googleImageDomains = [
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
      'images.google.com',
      'encrypted-tbn0.gstatic.com',
      'encrypted-tbn1.gstatic.com',
      'encrypted-tbn2.gstatic.com',
      'encrypted-tbn3.gstatic.com',
      'ssl.gstatic.com',
      'www.gstatic.com'
    ];

    return googleImageDomains.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
    );

  } catch {
    return false;
  }
}

/**
 * Detecta si una URL es problemática para CORS
 * @param url - URL a verificar
 * @returns true si la URL típicamente tiene problemas de CORS
 */
export function isProblematicCorsUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  // Google Images siempre tiene problemas de CORS
  if (isGoogleImageUrl(url)) {
    return true;
  }

  try {
    const urlObj = new URL(url.trim());
    
    // Otros dominios conocidos con problemas de CORS
    const problematicDomains = [
      'pinterest.com',
      'pinimg.com',
      'instagram.com',
      'cdninstagram.com',
      'facebook.com',
      'fbcdn.net',
      'twitter.com',
      'twimg.com'
    ];

    return problematicDomains.some(domain => 
      urlObj.hostname === domain || 
      urlObj.hostname.endsWith('.' + domain)
    );

  } catch {
    return false;
  }
}

/**
 * Obtiene información detallada sobre una URL de imagen
 * @param url - URL a analizar
 * @returns objeto con información detallada
 */
export function getImageUrlInfo(url: string): {
  isValid: boolean;
  type: 'data-url' | 'http-url' | 'invalid';
  isGoogleDrive: boolean;
  isGoogleImage: boolean;
  hasCorsProblem: boolean;
  needsProcessing: boolean;
  error?: string;
} {
  const validation = validateImageUrl(url);
  const isGoogleDrive = isGoogleDriveUrl(url);
  const isGoogleImage = isGoogleImageUrl(url);
  const hasCorsProblem = isProblematicCorsUrl(url);
  
  return {
    isValid: validation.isValid,
    type: validation.type,
    isGoogleDrive,
    isGoogleImage,
    hasCorsProblem,
    needsProcessing: isGoogleDrive || hasCorsProblem,
    error: validation.error
  };
}

/**
 * Valida múltiples URLs de imagen
 * @param urls - Array de URLs a validar
 * @returns Array con resultados de validación
 */
export function validateMultipleImageUrls(urls: string[]): Array<{
  url: string;
  isValid: boolean;
  error?: string;
}> {
  return urls.map(url => {
    const validation = validateImageUrl(url);
    return {
      url,
      isValid: validation.isValid,
      error: validation.error
    };
  });
}
