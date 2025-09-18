'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { NewsItem } from './NewsManagement';
import { previewFormattedText, processWhatsAppFormatting } from '@/utils/textFormatting';
import { normalizeCategory } from '@/utils/newsNormalizer';
import { convertGoogleDriveUrl, needsProxy } from '@/utils/image-utils';
import { validateImageUrl, getImageUrlInfo } from '@/utils/image-validation';
import { newsSchema, type NewsData } from '@/utils/validations';

type NewsFormData = NewsData;

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
  const [processedImageUrl, setProcessedImageUrl] = useState<string>('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [imageProcessError, setImageProcessError] = useState<string>('');

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

  // Procesar URL de imagen (Google Drive, CORS, etc.)
  const processImageUrl = async (url: string): Promise<string> => {
    if (!url.trim()) return url;

    setIsProcessingImage(true);
    setImageProcessError('');

    try {
      // Validar URL antes de procesar
      const validation = validateImageUrl(url);
      if (!validation.isValid) {
        setImageProcessError(validation.error || 'URL de imagen inválida');
        return url;
      }

      // Obtener información detallada sobre la URL
      const urlInfo = getImageUrlInfo(url);

      // 1. Si es base64, devolver directamente
      if (urlInfo.type === 'data-url') {
        return url;
      }

      // 2. Si es Google Drive, convertir URL
      if (urlInfo.isGoogleDrive) {
        const convertedUrl = convertGoogleDriveUrl(url);
        setProcessedImageUrl(convertedUrl);
        return convertedUrl;
      }

      // 3. Para URLs que necesitan proxy CORS, usar el proxy
      if (needsProxy(url)) {
        const response = await fetch('/api/proxy-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl: url }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.dataUrl) {
            setProcessedImageUrl(result.dataUrl);
            return result.dataUrl;
          }
        } else {
          const errorResult = await response.json();
          throw new Error(errorResult.error || 'Error al procesar imagen via proxy');
        }
      }

      // 4. Devolver URL original si no necesita procesamiento
      return url;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al procesar imagen';
      setImageProcessError(errorMessage);
      console.error('Error processing image:', error);
      return url; // Devolver URL original en caso de error
    } finally {
      setIsProcessingImage(false);
    }
  };

  // Manejar cambio en URL de imagen
  const handleImageUrlChange = async (url: string) => {
    if (url !== watch('imageUrl')) {
      setValue('imageUrl', url);
      
      if (url.trim()) {
        const processedUrl = await processImageUrl(url);
        setImagePreview(processedUrl);
      } else {
        setImagePreview('');
        setProcessedImageUrl('');
        setImageProcessError('');
      }
    }
  };

  const onSubmit = async (data: NewsFormData) => {
    setIsSubmitting(true);

    try {
      let imageUrl = data.imageUrl;

      // Si NO hay archivo seleccionado, procesar URL externa si existe
      if (!selectedFile && data.imageUrl) {
        if (processedImageUrl) {
          // Si tenemos una URL procesada, usarla
          imageUrl = processedImageUrl;
        } else {
          // Si no está procesada, procesarla ahora
          imageUrl = await processImageUrl(data.imageUrl);
        }
      }

      const newsData = {
        ...data,
        excerpt: processWhatsAppFormatting(data.excerpt), // Procesar el formato antes de guardar
        imageUrl: selectedFile ? '' : imageUrl, // Si hay archivo, dejar vacío para que /api/news genere la URL
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

      let response;

      // SIEMPRE usar FormData si hay archivo seleccionado
      if (selectedFile) {
        const formData = new FormData();
        formData.append('title', newsData.title);
        formData.append('content', newsData.content);
        formData.append('excerpt', newsData.excerpt);
        formData.append('author', newsData.author);
        formData.append('category', newsData.category);
        formData.append('tags', newsData.tags);
        formData.append('published', String(newsData.published));
        formData.append('featured', String(newsData.featured));
        formData.append('image', selectedFile); // Archivo original va aquí

        response = await fetch(url, {
          method,
          body: formData, // Sin Content-Type para FormData
        });
      } else {
        // Sin archivo, usar JSON como antes (para URLs externas)
        response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newsData),
        });
      }

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
                <div className="relative">
                  <input
                    type="url"
                    id="imageUrl"
                    {...register('imageUrl')}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    className={`focus:ring-navy focus:border-navy w-full rounded-lg border px-4 py-2 pr-10 transition-colors focus:ring-2 focus:outline-none ${
                      errors.imageUrl
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    placeholder="https://ejemplo.com/imagen.jpg (incluye Google Drive)"
                  />
                  {isProcessingImage && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="animate-spin h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Indicadores de procesamiento */}
                {watch('imageUrl') && !isProcessingImage && (
                  <div className="mt-1 text-xs">
                    {(() => {
                      const url = watch('imageUrl') || '';
                      if (!url) return null;
                      
                      const urlInfo = getImageUrlInfo(url);
                      
                      if (!urlInfo.isValid) {
                        return (
                          <span className="text-red-600 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {urlInfo.error}
                          </span>
                        );
                      }
                      
                      if (urlInfo.isGoogleDrive) {
                        return (
                          <span className="text-blue-600 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Google Drive detectado - URL convertida automáticamente
                          </span>
                        );
                      }
                      
                      if (urlInfo.hasCorsProblem) {
                        return (
                          <span className="text-orange-600 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            URL problemática - se procesará mediante proxy
                          </span>
                        );
                      }
                      
                      if (urlInfo.type === 'data-url') {
                        return (
                          <span className="text-green-600 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Imagen base64 válida
                          </span>
                        );
                      }
                      
                      return (
                        <span className="text-green-600 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          URL válida
                        </span>
                      );
                    })()}
                  </div>
                )}
                
                {imageProcessError && (
                  <p className="mt-1 text-sm text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                    ⚠️ {imageProcessError} (se usará URL original)
                  </p>
                )}
                
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
                  <div className="relative">
                    <Image
                      src={imagePreview}
                      alt="Vista previa"
                      width={400}
                      height={200}
                      className="max-h-48 w-full rounded-lg object-cover border"
                      onError={() => {
                        console.error('Error loading image preview');
                        setImageProcessError('Error al cargar vista previa de la imagen');
                      }}
                      onLoad={() => {
                        setImageProcessError(''); // Limpiar error si la imagen carga correctamente
                      }}
                    />
                    {processedImageUrl && processedImageUrl !== imagePreview && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        Procesada
                      </div>
                    )}
                  </div>
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
