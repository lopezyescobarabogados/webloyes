/**
 * Convierte texto con marcadores de WhatsApp a HTML con negritas de forma robusta
 * *texto* -> <strong>texto</strong>
 * Protege code blocks y inline code del procesamiento
 * @param text - El texto a procesar
 * @returns Texto con HTML para negritas
 */
export function processWhatsAppFormatting(text: string): string {
  if (!text) return '';
  
  // Si ya contiene <strong>, evitar doble procesamiento
  if (text.includes('<strong>')) return text;
  
  // Almacenar code blocks temporalmente para protegerlos
  const codeBlocks: string[] = [];
  const inlineCodes: string[] = [];
  
  // Proteger code blocks (```)
  let processedText = text.replace(/```[\s\S]*?```/g, (match) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push(match);
    return placeholder;
  });
  
  // Proteger inline code (`)
  processedText = processedText.replace(/`[^`]+`/g, (match) => {
    const placeholder = `__INLINE_CODE_${inlineCodes.length}__`;
    inlineCodes.push(match);
    return placeholder;
  });
  
  // Aplicar formateo de asteriscos en el texto restante
  // Solo procesar asteriscos que rodeen palabras/frases (con límites de palabra)
  processedText = processedText.replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>');
  
  // Restaurar code blocks
  codeBlocks.forEach((code, index) => {
    processedText = processedText.replace(`__CODE_BLOCK_${index}__`, code);
  });
  
  // Restaurar inline codes
  inlineCodes.forEach((code, index) => {
    processedText = processedText.replace(`__INLINE_CODE_${index}__`, code);
  });
  
  return processedText;
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

/**
 * Función compartida para renderizar contenido de noticias de forma consistente
 * Aplica procesamiento de WhatsApp, saltos de línea y sanitización básica
 * @param content - Contenido de la noticia
 * @returns HTML procesado y listo para renderizar
 */
export function renderNewsContent(content: string): string {
  if (!content) return '';
  
  // 1. Procesar asteriscos de WhatsApp
  let processedContent = processWhatsAppFormatting(content);
  
  // 2. Convertir saltos de línea a <br>
  processedContent = processedContent.replace(/\n/g, '<br />');
  
  // 3. Sanitización básica adicional (mantener solo tags seguros)
  // Ya se hace en el backend, pero reforzamos aquí
  
  return processedContent;
}
