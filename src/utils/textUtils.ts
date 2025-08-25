/**
 * Trunca el texto para mostrar aproximadamente 2-3 líneas
 * @param text - El texto a truncar
 * @param maxLength - Número máximo de caracteres (default: 150)
 * @returns Texto truncado con "..." si es necesario
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (!text) return '';
  
  if (text.length <= maxLength) {
    return text;
  }
  
  // Encontrar el último espacio antes del límite
  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  // Si hay un espacio, cortar ahí; si no, cortar en el límite
  const cutPoint = lastSpaceIndex > maxLength * 0.8 ? lastSpaceIndex : maxLength;
  
  return text.slice(0, cutPoint) + '...';
}
