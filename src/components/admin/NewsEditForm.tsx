import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useNewsUpload, validateNewsForm, type NewsFormData } from '@/utils/news-upload';

interface NewsEditFormProps {
  newsId: string;
  initialData?: Partial<NewsFormData>;
  onSuccess?: (updatedNews: Record<string, unknown>) => void;
  onCancel?: () => void;
}

/**
 * Componente de formulario para editar noticias existentes
 * Soporte completo para actualización de imágenes
 */
export function NewsEditForm({ newsId, initialData, onSuccess, onCancel }: NewsEditFormProps) {
  const { updateNewsItem, loading, error } = useNewsUpload();
  const [formData, setFormData] = useState<NewsFormData>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    author: initialData?.author || '',
    category: initialData?.category || '',
    tags: initialData?.tags || [],
    published: initialData?.published || false,
    featured: initialData?.featured || false,
    removeImage: false,
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  // Cargar datos de la noticia si no se proporcionan
  useEffect(() => {
    const loadNewsData = async () => {
      if (!initialData && newsId) {
        try {
          const response = await fetch(`/api/news/${newsId}`);
          if (response.ok) {
            const newsData = await response.json();
            setFormData({
              title: newsData.title || '',
              content: newsData.content || '',
              excerpt: newsData.excerpt || '',
              author: newsData.author || '',
              category: newsData.category || '',
              tags: newsData.tags ? JSON.parse(newsData.tags) : [],
              published: newsData.published || false,
              featured: newsData.featured || false,
              removeImage: false,
            });
            setCurrentImageUrl(newsData.imageUrl);
          }
        } catch (error) {
          console.error('Error loading news data:', error);
        }
      }
    };

    loadNewsData();
  }, [newsId, initialData]);

  const handleInputChange = (field: keyof NewsFormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationErrors([]); // Limpiar errores al cambiar datos
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file, removeImage: false }));
      
      // Generar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, removeImage: true, image: undefined }));
    setImagePreview(null);
    setCurrentImageUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar del lado cliente
    const errors = validateNewsForm(formData);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    try {
      const result = await updateNewsItem(newsId, formData);
      console.log('Noticia actualizada:', result);
      
      if (onSuccess) {
        onSuccess(result);
      } else {
        alert('Noticia actualizada exitosamente');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const displayImageUrl = imagePreview || currentImageUrl;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Editar Noticia</h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
        )}
      </div>
      
      {/* Errores de validación */}
      {validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <ul className="list-disc list-inside text-red-700">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Error del servidor */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Título */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Título *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Título de la noticia"
          required
        />
      </div>

      {/* Contenido */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Contenido *
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          rows={8}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Contenido completo de la noticia"
          required
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Resumen (Opcional)
        </label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => handleInputChange('excerpt', e.target.value)}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Resumen corto para listados"
        />
      </div>

      {/* Autor y Categoría */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Autor *
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre del autor"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Categoría *
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccionar categoría</option>
            <option value="legal">Legal</option>
            <option value="corporativo">Corporativo</option>
            <option value="fiscal">Fiscal</option>
            <option value="laboral">Laboral</option>
          </select>
        </div>
      </div>

      {/* Imagen */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Imagen
        </label>
        
        {/* Imagen actual o preview */}
        {displayImageUrl && !formData.removeImage && (
          <div className="mb-4">
            <div className="relative inline-block">
              <Image
                src={displayImageUrl}
                alt="Imagen actual"
                width={300}
                height={200}
                className="object-cover rounded-lg border"
                unoptimized={displayImageUrl.startsWith('/api/images/')}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {imagePreview ? 'Nueva imagen seleccionada' : 'Imagen actual'}
            </p>
          </div>
        )}
        
        {/* Input de archivo */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        
        {formData.removeImage && (
          <p className="text-sm text-red-600 mt-2">
            La imagen será eliminada al guardar
          </p>
        )}
      </div>

      {/* Flags */}
      <div className="flex gap-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => handleInputChange('published', e.target.checked)}
            className="mr-2"
          />
          Publicado
        </label>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => handleInputChange('featured', e.target.checked)}
            className="mr-2"
          />
          Destacado
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Actualizando noticia...' : 'Actualizar Noticia'}
      </button>
    </form>
  );
}
