/**
 * Utilidades para manejo y conversión de URLs de imágenes
 */

/**
 * Re-exportar validateImageUrl para mantener compatibilidad
 */
export { validateImageUrl } from './image-validation';

/**
 * Detecta si una URL necesita procesamiento via proxy para resolver CORS
 * @param url - URL a verificar
 * @returns true si la URL necesita proxy
 */
export function needsProxy(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  // Las data URLs no necesitan proxy
  if (url.startsWith('data:')) {
    return false;
  }

  try {
    const urlObj = new URL(url);
    
    // Dominios conocidos que tienen problemas de CORS
    const problematicDomains = [
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
      'www.gstatic.com',
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
      urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}

/**
 * Detecta si una URL es de Google Drive
 * @param url - URL a validar
 * @returns true si es una URL de Google Drive válida
 */
export function isGoogleDriveUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'drive.google.com' && 
           urlObj.pathname.includes('/file/d/');
  } catch {
    return false;
  }
}

/**
 * Extrae el FILE_ID de una URL de Google Drive
 * @param url - URL de Google Drive
 * @returns FILE_ID o null si no se puede extraer
 */
export function extractGoogleDriveFileId(url: string): string | null {
  try {
    // Patrón para extraer FILE_ID de URLs como:
    // https://drive.google.com/file/d/FILE_ID/view
    // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    // https://drive.google.com/file/d/FILE_ID/edit
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/**
 * Convierte una URL de Google Drive a formato directo utilizable en <img>
 * @param url - URL original de Google Drive
 * @returns URL directa para visualización de imagen o la URL original si no es de Google Drive
 * 
 * @example
 * ```typescript
 * const originalUrl = "https://drive.google.com/file/d/1WKLUA9iRhjRX_rQyqrK-FlUCIrTx4Guy/view?usp=drive_link";
 * const directUrl = convertGoogleDriveUrl(originalUrl);
 * // Resultado: "https://drive.google.com/uc?export=view&id=1WKLUA9iRhjRX_rQyqrK-FlUCIrTx4Guy"
 * ```
 */
export function convertGoogleDriveUrl(url: string): string {
  // Validar que sea una URL válida
  if (!url || typeof url !== 'string') {
    return url;
  }

  // Verificar si es una URL de Google Drive
  if (!isGoogleDriveUrl(url)) {
    return url;
  }

  // Extraer el FILE_ID
  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) {
    return url;
  }

  // Convertir a URL directa para visualización
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * Valida si una URL procesada de Google Drive es accesible
 * @param url - URL a validar
 * @returns true si la URL tiene el formato correcto para Google Drive directo
 */
export function isValidGoogleDriveDirectUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'drive.google.com' && 
           urlObj.pathname === '/uc' &&
           urlObj.searchParams.has('export') &&
           urlObj.searchParams.get('export') === 'view' &&
           urlObj.searchParams.has('id') &&
           !!urlObj.searchParams.get('id');
  } catch {
    return false;
  }
}

/**
 * Procesa múltiples URLs de imágenes, convirtiendo las de Google Drive
 * @param urls - Array de URLs a procesar
 * @returns Array de URLs procesadas
 */
export function processImageUrls(urls: string[]): string[] {
  return urls.map(url => convertGoogleDriveUrl(url));
}

/**
 * Valida que una URL sea segura para uso en imágenes
 * @param url - URL a validar
 * @returns true si la URL es segura para usar en <img>
 */
export function isSecureImageUrl(url: string): boolean {
  try {
    // Permitir data URLs de imagen
    if (url.startsWith('data:image/')) {
      return true;
    }

    const urlObj = new URL(url);
    
    // Solo permitir HTTPS (excepto localhost para desarrollo)
    if (urlObj.protocol !== 'https:' && !urlObj.hostname.includes('localhost')) {
      return false;
    }

    // Rechazar protocolos peligrosos
    if (['javascript:', 'data:', 'blob:', 'file:'].some(protocol => 
      url.toLowerCase().startsWith(protocol) && !url.startsWith('data:image/')
    )) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
