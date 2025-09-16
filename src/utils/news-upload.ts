/**
 * Ejemplo de uso del endpoint de upload de noticias
 * Formulario optimizado para crear noticias con imágenes
 */

export interface NewsFormData {
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  category: string;
  tags?: string[];
  published?: boolean;
  featured?: boolean;
  image?: File;
  removeImage?: boolean; // Nueva prop para eliminar imagen
}

/**
 * Función para actualizar una noticia existente
 * @param id - ID de la noticia a actualizar
 * @param data - Datos del formulario
 * @returns Promise con la respuesta del servidor
 */
export async function updateNews(id: string, data: NewsFormData) {
  // Crear FormData para envío multipart
  const formData = new FormData();
  
  // Campos de texto requeridos
  formData.append('title', data.title.trim());
  formData.append('content', data.content.trim());
  formData.append('author', data.author.trim());
  formData.append('category', data.category.trim());
  
  // Campos opcionales
  if (data.excerpt) {
    formData.append('excerpt', data.excerpt.trim());
  }
  
  if (data.tags && data.tags.length > 0) {
    formData.append('tags', JSON.stringify(data.tags));
  }
  
  // Flags booleanos
  formData.append('published', String(data.published || false));
  formData.append('featured', String(data.featured || false));
  
  // Manejo de imagen
  if (data.removeImage) {
    formData.append('removeImage', 'true');
  } else if (data.image) {
    formData.append('image', data.image);
  }
  
  try {
    const response = await fetch(`/api/news/${id}`, {
      method: 'PUT',
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al actualizar la noticia');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
}

/**
 * Función para crear una noticia con imagen
 * @param data - Datos del formulario
 * @returns Promise con la respuesta del servidor
 */
export async function createNews(data: NewsFormData) {
  // Crear FormData para envío multipart
  const formData = new FormData();
  
  // Campos de texto requeridos
  formData.append('title', data.title.trim());
  formData.append('content', data.content.trim());
  formData.append('author', data.author.trim());
  formData.append('category', data.category.trim());
  
  // Campos opcionales
  if (data.excerpt) {
    formData.append('excerpt', data.excerpt.trim());
  }
  
  if (data.tags && data.tags.length > 0) {
    formData.append('tags', JSON.stringify(data.tags));
  }
  
  // Flags booleanos
  formData.append('published', String(data.published || false));
  formData.append('featured', String(data.featured || false));
  
  // Archivo de imagen
  if (data.image) {
    formData.append('image', data.image);
  }
  
  try {
    const response = await fetch('/api/news', {
      method: 'POST',
      body: formData, // Sin Content-Type header - se establece automáticamente
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al crear la noticia');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating news:', error);
    throw error;
  }
}

/**
 * Hook React para manejar upload y update de noticias
 */
import { useState } from 'react';

export function useNewsUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const uploadNews = async (data: NewsFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await createNews(data);
      setLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  const updateNewsItem = async (id: string, data: NewsFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await updateNews(id, data);
      setLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };
  
  return { uploadNews, updateNewsItem, loading, error };
}

/**
 * Validaciones del lado cliente
 */
export function validateNewsForm(data: NewsFormData): string[] {
  const errors: string[] = [];
  
  if (!data.title?.trim()) errors.push('El título es requerido');
  if (!data.content?.trim()) errors.push('El contenido es requerido');
  if (!data.author?.trim()) errors.push('El autor es requerido');
  if (!data.category?.trim()) errors.push('La categoría es requerida');
  
  if (data.title && data.title.length > 200) {
    errors.push('El título no puede exceder 200 caracteres');
  }
  
  if (data.image) {
    if (data.image.size > 10 * 1024 * 1024) {
      errors.push('La imagen no puede ser mayor a 10MB');
    }
    
    if (!data.image.type.startsWith('image/')) {
      errors.push('Solo se permiten archivos de imagen');
    }
  }
  
  return errors;
}
