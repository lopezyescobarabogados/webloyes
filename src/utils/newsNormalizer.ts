/**
 * Normaliza el campo category de las noticias
 * Convierte arrays en strings y limpia el formato
 */

export interface NewsItemRaw {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string | string[]; // Puede venir como string o array
  tags: string;
  published: boolean;
  featured: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsItemNormalized {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string; // Siempre string
  tags: string;
  published: boolean;
  featured: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Normaliza una categoría que puede venir como string o array
 * @param category - La categoría a normalizar
 * @returns String normalizado de la categoría
 */
export function normalizeCategory(category: string | string[] | unknown): string {
  // Si es null o undefined, devolver string vacío
  if (!category) return '';
  
  // Si ya es un string, devolverlo tal como está
  if (typeof category === 'string') return category;
  
  // Si es un array, tomar el primer elemento
  if (Array.isArray(category) && category.length > 0) {
    return typeof category[0] === 'string' ? category[0] : String(category[0]);
  }
  
  // Para cualquier otro tipo, convertir a string
  return String(category);
}

/**
 * Normaliza un item de noticia completo
 * @param newsItem - El item de noticia a normalizar
 * @returns NewsItem con categoría normalizada
 */
export function normalizeNewsItem(newsItem: NewsItemRaw): NewsItemNormalized {
  return {
    ...newsItem,
    category: normalizeCategory(newsItem.category)
  };
}

/**
 * Normaliza un array de noticias
 * @param newsArray - Array de noticias a normalizar
 * @returns Array de noticias con categorías normalizadas
 */
export function normalizeNewsArray(newsArray: NewsItemRaw[]): NewsItemNormalized[] {
  return newsArray.map(normalizeNewsItem);
}
