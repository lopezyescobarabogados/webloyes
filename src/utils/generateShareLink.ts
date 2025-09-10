/**
 * Genera un enlace compartible para la página de suscripción al newsletter
 * @param userId - ID único del usuario que comparte
 * @returns URL formateada con parámetro de referencia
 */
export function generateShareLink(userId: string): string {
  // Obtener la URL base del sitio desde las variables de entorno
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';
  
  // Limpiar la URL base (remover barra final si existe)
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  
  // Generar la URL con el parámetro de referencia
  return `${cleanBaseUrl}/newsletter?ref=${encodeURIComponent(userId)}`;
}
