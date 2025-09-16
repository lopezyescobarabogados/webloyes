/**
 * Sistema centralizado de manejo de errores para funciones de imagen
 */

export interface ImageError {
  code: string;
  message: string;
  originalUrl?: string;
  details?: unknown;
}

/**
 * Códigos de error estándar para imágenes
 */
export const IMAGE_ERROR_CODES = {
  INVALID_URL: 'INVALID_URL',
  UNSUPPORTED_PROTOCOL: 'UNSUPPORTED_PROTOCOL',
  CORS_ERROR: 'CORS_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FORMAT: 'INVALID_FORMAT',
  GOOGLE_DRIVE_ERROR: 'GOOGLE_DRIVE_ERROR',
  PROXY_ERROR: 'PROXY_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR'
} as const;

/**
 * Mensajes de error amigables para el usuario
 */
export const ERROR_MESSAGES = {
  [IMAGE_ERROR_CODES.INVALID_URL]: 'La URL de imagen no es válida',
  [IMAGE_ERROR_CODES.UNSUPPORTED_PROTOCOL]: 'Solo se permiten URLs HTTPS',
  [IMAGE_ERROR_CODES.CORS_ERROR]: 'No se puede acceder a la imagen debido a restricciones CORS',
  [IMAGE_ERROR_CODES.NETWORK_ERROR]: 'Error de conexión al cargar la imagen',
  [IMAGE_ERROR_CODES.FILE_TOO_LARGE]: 'La imagen es demasiado grande (máximo 10MB)',
  [IMAGE_ERROR_CODES.INVALID_FORMAT]: 'Formato de imagen no válido',
  [IMAGE_ERROR_CODES.GOOGLE_DRIVE_ERROR]: 'Error al procesar URL de Google Drive',
  [IMAGE_ERROR_CODES.PROXY_ERROR]: 'Error al procesar imagen a través del proxy',
  [IMAGE_ERROR_CODES.VALIDATION_ERROR]: 'Error de validación en la imagen'
} as const;

/**
 * Crea un error de imagen estandarizado
 */
export function createImageError(
  code: keyof typeof IMAGE_ERROR_CODES,
  originalUrl?: string,
  details?: unknown
): ImageError {
  return {
    code,
    message: ERROR_MESSAGES[code],
    originalUrl,
    details
  };
}

/**
 * Maneja errores de red/fetch de forma consistente
 */
export function handleNetworkError(error: unknown, originalUrl?: string): ImageError {
  if (error instanceof TypeError) {
    // Típicamente errores de CORS o red
    return createImageError(IMAGE_ERROR_CODES.CORS_ERROR, originalUrl, error);
  }
  
  if (error instanceof Error) {
    // Otros errores de JavaScript
    return createImageError(IMAGE_ERROR_CODES.NETWORK_ERROR, originalUrl, error);
  }
  
  // Error desconocido
  return createImageError(IMAGE_ERROR_CODES.NETWORK_ERROR, originalUrl, error);
}

/**
 * Convierte errores de imagen a mensajes para mostrar al usuario
 */
export function getErrorMessage(error: ImageError | Error | string): string {
  if (typeof error === 'string') {
    return error;
  }
  
  if ('code' in error && error.code in ERROR_MESSAGES) {
    return ERROR_MESSAGES[error.code as keyof typeof ERROR_MESSAGES];
  }
  
  if ('message' in error) {
    return error.message;
  }
  
  return 'Error desconocido al procesar imagen';
}

/**
 * Wrapper para funciones que procesan imágenes con manejo de errores consistente
 */
export async function withImageErrorHandling<T>(
  operation: () => Promise<T>,
  originalUrl?: string
): Promise<{ success: true; data: T } | { success: false; error: ImageError }> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    const imageError = handleNetworkError(error, originalUrl);
    return { success: false, error: imageError };
  }
}

/**
 * Logs errores de imagen con información contextual
 */
export function logImageError(error: ImageError, context?: string): void {
  console.error(`[ImageError${context ? ` - ${context}` : ''}]:`, {
    code: error.code,
    message: error.message,
    originalUrl: error.originalUrl,
    details: error.details
  });
}
