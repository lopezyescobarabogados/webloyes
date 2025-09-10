'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { NewsItem } from './NewsManagement';
import { previewFormattedText, processWhatsAppFormatting } from '@/utils/textFormatting';
import { normalizeCategory } from '@/utils/newsNormalizer';

// Schema de validación simplificado - solo campos esenciales
const newsSchema = z.object({
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
  imageUrl: z.string().optional()
});

type NewsFormData = z.infer<typeof newsSchema>;

interface NewsFormProps {
  news: NewsItem | null;
  isCreating: boolean;
  onClose: () => void;
  onSuccess: (news: NewsItem) => void;
}

// Categorías específicas para firma de abogados
const categories = [
  'Derecho Civil',
  'Derecho Comercial',
  'Derecho Tributario',
  'Derecho Laboral',
  'Derecho Penal',
  'Derecho Administrativo',
  'Anuncios Legales',
  'Actualidad Jurídica',
  'Noticias de la Firma'
];

export default function NewsForm({
  news,
  isCreating,
  onClose,
  onSuccess,
}: NewsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      author: 'López y Escobar Abogados',
      category: 'Derecho Civil',
      imageUrl: ''
    },
  });

  // Cargar datos existentes si estamos editando
  useEffect(() => {
    if (news && !isCreating) {
      setValue('title', news.title);
      setValue('excerpt', news.excerpt);
      setValue('author', news.author);
      setValue('category', normalizeCategory(news.category));
      setValue('imageUrl', news.imageUrl || '');
      setImagePreview(news.imageUrl || '');
    }
  }, [news, isCreating, setValue]);

  // Manejar selección de archivo de imagen
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Subir imagen al servidor
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', 'news'); // Especificar que es para noticias
    
    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al subir la imagen');
    }

    const data = await response.json();
    return data.url;
  };

  const onSubmit = async (data: NewsFormData) => {
    setIsSubmitting(true);

    try {
      let imageUrl = data.imageUrl;

      // Si hay un archivo seleccionado, subirlo primero
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const newsData = {
        ...data,
        excerpt: processWhatsAppFormatting(data.excerpt), // Procesar el formato antes de guardar
        imageUrl,
        // Campos adicionales requeridos por la base de datos con valores por defecto
        content: processWhatsAppFormatting(data.excerpt), // Usar el resumen formateado como contenido
        featured: false,
        tags: JSON.stringify([data.category]), // Usar la categoría como tag
        published: true
      };

      const url = isCreating
        ? '/api/news'
        : `/api/news/${news?.id}`;
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar la noticia');
      }

      const result = await response.json();
      onSuccess(result);
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Error al guardar la noticia. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-navy font-serif text-2xl font-bold">
            {isCreating ? 'Nueva Noticia' : 'Editar Noticia'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
          {/* Título */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Título *
            </label>
            <input
              type="text"
              id="title"
              {...register('title')}
              className={`focus:ring-navy focus:border-navy w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none ${
                errors.title
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300 bg-white'
              }`}
              placeholder="Título de la noticia"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Resumen */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="excerpt"
                className="block text-sm font-semibold text-gray-800"
              >
                Resumen *
              </label>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="text-navy hover:text-navy-600 text-sm font-medium transition-colors"
              >
                {showPreview ? 'Editar' : 'Vista previa'}
              </button>
            </div>
            
            {!showPreview ? (
              <>
                <textarea
                  id="excerpt"
                  rows={12}
                  {...register('excerpt')}
                  className={`resize-vertical focus:ring-navy focus:border-navy w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none ${
                    errors.excerpt
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300 bg-white'
                  }`}
                  placeholder="Descripción completa de la noticia (hasta 10,000 caracteres)&#10;&#10;💡 Tip: Usa *texto* para poner palabras en negrita"
                />
                <div className="mt-1 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>💡 Usa *texto* para <strong>negrita</strong> (como WhatsApp)</span>
                    <span className={watch('excerpt')?.length > 9000 ? 'text-orange-500' : watch('excerpt')?.length > 9500 ? 'text-red-500' : ''}>
                      {watch('excerpt')?.length || 0} / 10,000 caracteres
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="min-h-[200px] rounded-lg border border-gray-300 bg-gray-50 p-4">
                <div className="text-gray-700 leading-relaxed">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: previewFormattedText(watch('excerpt') || '') 
                    }}
                  />
                </div>
                {!watch('excerpt') && (
                  <p className="text-gray-400 italic">
                    Escribe algo en el resumen para ver la vista previa...
                  </p>
                )}
              </div>
            )}
            
            {errors.excerpt && (
              <p className="mt-1 text-sm text-red-600">
                {errors.excerpt.message}
              </p>
            )}
          </div>

          {/* Autor y Categoría */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="author"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Autor *
              </label>
              <input
                type="text"
                id="author"
                {...register('author')}
                className={`focus:ring-navy focus:border-navy w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none ${
                  errors.author
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 bg-white'
                }`}
                placeholder="Nombre del autor"
              />
              {errors.author && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.author.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Categoría *
              </label>
              <select
                id="category"
                {...register('category')}
                className={`focus:ring-navy focus:border-navy w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none ${
                  errors.category
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          {/* Imagen */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Imagen
            </label>
            <div className="space-y-4">
              {/* Subir archivo */}
              <div>
                <label
                  htmlFor="imageFile"
                  className="mb-1 block text-xs text-gray-600"
                >
                  Subir imagen
                </label>
                <input
                  type="file"
                  id="imageFile"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="focus:ring-navy focus:border-navy w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:ring-2 focus:outline-none"
                />
              </div>

              {/* URL personalizada */}
              <div>
                <label
                  htmlFor="imageUrl"
                  className="mb-1 block text-xs text-gray-600"
                >
                  O URL de imagen
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  {...register('imageUrl')}
                  className={`focus:ring-navy focus:border-navy w-full rounded-lg border px-4 py-2 transition-colors focus:ring-2 focus:outline-none ${
                    errors.imageUrl
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300 bg-white'
                  }`}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                {errors.imageUrl && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>

              {/* Preview de imagen */}
              {imagePreview && (
                <div>
                  <label className="mb-1 block text-xs text-gray-600">
                    Vista previa
                  </label>
                  <Image
                    src={imagePreview}
                    alt="Vista previa"
                    width={400}
                    height={200}
                    className="max-h-48 w-full rounded-lg object-cover border"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="flex items-center justify-end space-x-4 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-navy hover:bg-navy-600 rounded-lg px-6 py-2 font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Guardando...
                </div>
              ) : isCreating ? (
                'Crear Noticia'
              ) : (
                'Guardar Cambios'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
