/**
 * Convierte texto con marcadores de WhatsApp a HTML con negritas
 * *texto* -> <strong>texto</strong>
 * @param text - El texto a procesar
 * @returns Texto con HTML para negritas
 */
export function processWhatsAppFormatting(text: string): string {
  if (!text) return '';
  
  // Reemplazar *texto* con <strong>texto</strong>
  // Usar regex para encontrar texto entre asteriscos que no estén escapados
  return text.replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>');
}

/**
 * Remueve el formateo HTML y devuelve texto plano
 * <strong>texto</strong> -> *texto*
 * @param html - El HTML a convertir
 * @returns Texto plano con marcadores de WhatsApp
 */
export function htmlToWhatsAppFormat(html: string): string {
  if (!html) return '';
  
  return html.replace(/<strong>(.*?)<\/strong>/g, '*$1*');
}

/**
 * Vista previa del texto formateado para mostrar cómo se verá
 * @param text - Texto con marcadores de WhatsApp
 * @returns HTML seguro para renderizar
 */
export function previewFormattedText(text: string): string {
  return processWhatsAppFormatting(text);
}
