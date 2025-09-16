import { z } from 'zod';
import { validateImageUrl } from './image-validation';

// Esquemas de validación para formularios

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  email: z
    .string()
    .email('Por favor, introduce un email válido')
    .min(1, 'El email es requerido')
    .max(100, 'El email no puede exceder 100 caracteres'),
  subject: z
    .string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(100, 'El asunto no puede exceder 100 caracteres'),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres'),
});

export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Por favor, introduce un email válido')
    .min(1, 'El email es requerido')
    .max(100, 'El email no puede exceder 100 caracteres'),
});

export const commentSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  email: z
    .string()
    .email('Por favor, introduce un email válido')
    .min(1, 'El email es requerido')
    .max(100, 'El email no puede exceder 100 caracteres'),
  comment: z
    .string()
    .min(5, 'El comentario debe tener al menos 5 caracteres')
    .max(500, 'El comentario no puede exceder 500 caracteres'),
});

// Esquemas de validación para administración

export const adminAuthSchema = z.object({
  adminKey: z
    .string()
    .min(8, 'La clave debe tener al menos 8 caracteres')
    .max(100, 'La clave no puede exceder 100 caracteres'),
});

export const teamMemberSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .regex(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ.\s]+$/, 'El nombre contiene caracteres no válidos'),
  position: z
    .string()
    .min(3, 'El cargo debe tener al menos 3 caracteres')
    .max(150, 'El cargo no puede exceder 150 caracteres'),
  bio: z
    .string()
    .min(20, 'La biografía debe tener al menos 20 caracteres')
    .max(1000, 'La biografía no puede exceder 1000 caracteres')
    .optional(),
  imageUrl: z
    .string()
    .url('Debe ser una URL válida')
    .or(z.string().regex(/^\//, 'Debe ser una ruta válida que inicie con /'))
    .optional(),
  email: z
    .string()
    .email('Debe ser un email válido')
    .max(100, 'El email no puede exceder 100 caracteres'),
  linkedin: z
    .string()
    .url('Debe ser una URL válida de LinkedIn')
    .optional()
    .or(z.literal('')),
  twitter: z
    .string()
    .url('Debe ser una URL válida de Twitter')
    .optional()
    .or(z.literal('')),
  area: z
    .string()
    .min(1, 'El área es requerida')
    .max(50, 'El área no puede exceder 50 caracteres'),
  city: z
    .string()
    .min(2, 'La ciudad debe tener al menos 2 caracteres')
    .max(50, 'La ciudad no puede exceder 50 caracteres'),
  level: z
    .string()
    .min(1, 'El nivel es requerido')
    .max(50, 'El nivel no puede exceder 50 caracteres'),
  order: z.number().min(1).optional(),
});

export const newsItemSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(200, 'El título no puede exceder 200 caracteres'),
  slug: z
    .string()
    .min(5, 'El slug debe tener al menos 5 caracteres')
    .max(200, 'El slug no puede exceder 200 caracteres')
    .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones')
    .optional(),
  excerpt: z
    .string()
    .min(20, 'El extracto debe tener al menos 20 caracteres')
    .max(300, 'El extracto no puede exceder 300 caracteres'),
  content: z
    .string()
    .min(50, 'El contenido debe tener al menos 50 caracteres')
    .max(10000, 'El contenido no puede exceder 10000 caracteres'),
  author: z
    .string()
    .min(2, 'El autor debe tener al menos 2 caracteres')
    .max(100, 'El autor no puede exceder 100 caracteres'),
  publishedAt: z
    .string()
    .datetime('Debe ser una fecha válida')
    .optional(),
  imageUrl: z
    .string()
    .optional()
    .refine((url) => {
      if (!url || url.trim() === '') return true; // URL opcional
      const validation = validateImageUrl(url);
      return validation.isValid;
    }, {
      message: 'URL de imagen inválida. Debe ser HTTP/HTTPS válida o data URL de imagen válida'
    }),
  tags: z
    .array(z.string().min(1).max(50))
    .min(1, 'Debe tener al menos una etiqueta')
    .max(10, 'No puede tener más de 10 etiquetas'),
  category: z
    .string()
    .min(1, 'La categoría es requerida')
    .max(50, 'La categoría no puede exceder 50 caracteres'),
  featured: z.boolean(),
});

// Esquema simplificado para formulario de noticias (campos esenciales)
export const newsSchema = z.object({
  title: z
    .string()
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(200, 'El título no puede superar 200 caracteres'),
  excerpt: z
    .string()
    .min(20, 'El resumen debe tener al menos 20 caracteres')
    .max(10000, 'El resumen no puede superar 10,000 caracteres'),
  author: z
    .string()
    .min(2, 'El autor debe tener al menos 2 caracteres')
    .max(100, 'El autor no puede superar 100 caracteres'),
  category: z.string().min(2, 'La categoría es requerida'),
  imageUrl: z
    .string()
    .optional()
    .refine((url) => {
      if (!url || url.trim() === '') return true; // URL opcional
      const validation = validateImageUrl(url);
      return validation.isValid;
    }, {
      message: 'URL de imagen inválida. Debe ser HTTP/HTTPS válida o data URL de imagen válida'
    })
});

// Funciones de validación adicionales

export const validateImageFile = (file: File): string | null => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
  
  if (!allowedTypes.includes(file.type)) {
    return 'Tipo de archivo no permitido. Use JPEG, PNG, WebP o SVG.';
  }
  
  if (file.size > maxSize) {
    return 'El archivo es demasiado grande. Máximo 5MB.';
  }
  
  return null;
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remover < y > para prevenir XSS básico
    .slice(0, 10000); // Limitar longitud
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/-+/g, '-') // Múltiples guiones a uno
    .replace(/^-|-$/g, ''); // Remover guiones al inicio y final
};

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type CommentData = z.infer<typeof commentSchema>;
export type AdminAuthData = z.infer<typeof adminAuthSchema>;
export type TeamMemberData = z.infer<typeof teamMemberSchema>;
export type NewsItemData = z.infer<typeof newsItemSchema>;
export type NewsData = z.infer<typeof newsSchema>;
