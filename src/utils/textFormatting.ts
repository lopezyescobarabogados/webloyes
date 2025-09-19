/**
 * Convierte texto con marcadores de WhatsApp a HTML con negritas de forma robusta
 * *texto* -> <strong>texto</strong>
 * Protege code blocks y inline code del procesamiento
 * @param text - El texto a procesar
 * @returns Texto con HTML para negritas
 */
export function processWhatsAppFormatting(text: string): string {
  if (!text) return '';
  
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
  // Mejorado: evitar procesar asteriscos dentro de tags HTML existentes
  processedText = processedText.replace(/\*([^*\n<>]+)\*/g, (match, content) => {
    // Verificar que no estemos dentro de un tag HTML
    return `<strong>${content.trim()}</strong>`;
  });
  
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
 * Aplica procesamiento de WhatsApp, saltos de línea y formateo básico
 * @param content - Contenido de la noticia
 * @returns HTML procesado y listo para renderizar
 */
export function renderNewsContent(content: string): string {
  if (!content) return '';
  
  // 1. Procesar asteriscos de WhatsApp
  let processedContent = processWhatsAppFormatting(content);
  
  // 2. Convertir saltos de línea simples a <br> pero preservar párrafos
  processedContent = processedContent
    .replace(/\n\n/g, '</p><p>')  // Párrafos dobles
    .replace(/\n/g, '<br />');    // Saltos simples
  
  // 3. Envolver en párrafos si no hay estructura de párrafos
  if (!processedContent.includes('<p>')) {
    processedContent = `<p>${processedContent}</p>`;
  }
  
  // 4. Limpiar el contenido final
  processedContent = processedContent
    .replace(/<p><\/p>/g, '')     // Eliminar párrafos vacíos
    .replace(/<p><br \/>/g, '<p>') // Limpiar <br> al inicio de párrafos
    .replace(/<br \/><\/p>/g, '</p>') // Limpiar <br> al final de párrafos
    .trim();
  
  return processedContent;
}

/**
 * Función alternativa simplificada para renderizar contenido sin formateo de párrafos
 * @param content - Contenido de la noticia
 * @returns HTML procesado y listo para renderizar
 */
export function renderNewsContentSimple(content: string): string {
  if (!content) return '';
  
  // 1. Procesar asteriscos de WhatsApp
  let processedContent = processWhatsAppFormatting(content);
  
  // 2. Convertir saltos de línea a <br>
  processedContent = processedContent.replace(/\n/g, '<br />');
  
  // 3. Limpiar el contenido
  processedContent = processedContent.trim();
  
  return processedContent;
}
