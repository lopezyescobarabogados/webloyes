import { useState } from 'react';
import Image from 'next/image';
import { useNewsUpload, validateNewsForm, type NewsFormData } from '@/utils/news-upload';

/**
 * Componente de formulario para crear noticias con upload de imagen
 * Ejemplo de implementación completa
 */
export function NewsUploadForm() {
  const { uploadNews, loading, error } = useNewsUpload();
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    category: '',
    tags: [],
    published: false,
    featured: false,
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (field: keyof NewsFormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationErrors([]); // Limpiar errores al cambiar datos
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Generar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
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
      const result = await uploadNews(formData);
      console.log('Noticia creada:', result);
      // Redireccionar o mostrar éxito
      alert('Noticia creada exitosamente');
      
      // Limpiar formulario
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        author: '',
        category: '',
        tags: [],
        published: false,
        featured: false,
      });
      setImagePreview(null);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Crear Nueva Noticia</h2>
      
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
          Imagen (Opcional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        
        {imagePreview && (
          <div className="mt-4">
            <Image
              src={imagePreview}
              alt="Preview"
              width={300}
              height={128}
              className="object-cover rounded-lg border"
              unoptimized
            />
          </div>
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
          Publicar inmediatamente
        </label>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => handleInputChange('featured', e.target.checked)}
            className="mr-2"
          />
          Destacar noticia
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creando noticia...' : 'Crear Noticia'}
      </button>
    </form>
  );
}
