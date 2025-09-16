/**
 * Ejemplos de uso del componente ApiImage para imágenes de PostgreSQL
 */

import { ApiImage, NewsImage } from '@/components/ui/OptimizedImage';

// Ejemplo 1: Imagen básica de noticia desde API
function NewsCard({ news }: { news: { id: string; title: string; imageUrl?: string } }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ApiImage
        src={news.imageUrl || '/api/images/default'}
        alt={news.title}
        width={400}
        height={250}
        className="w-full"
        priority={false}
        fallbackText="Imagen no disponible"
      />
      <div className="p-4">
        <h3 className="font-semibold">{news.title}</h3>
      </div>
    </div>
  );
}

// Ejemplo 2: Imagen con tamaños predefinidos
function NewsGallery({ articles }: { articles: Array<{ id: string; title: string; imageUrl?: string }> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div key={article.id} className="space-y-4">
          {/* Imagen pequeña para listado */}
          <NewsImage
            src={article.imageUrl || `/api/images/${article.id}`}
            alt={article.title}
            size="md"
            className="hover:scale-105 transition-transform duration-200"
          />
          <h3 className="font-medium">{article.title}</h3>
        </div>
      ))}
    </div>
  );
}

// Ejemplo 3: Imagen hero con fill
function HeroSection({ news }: { news: { id: string; title: string; imageUrl?: string } }) {
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-xl">
      <ApiImage
        src={news.imageUrl || `/api/images/${news.id}`}
        alt={news.title}
        fill={true}
        priority={true}
        className="absolute inset-0"
        fallbackText="Imagen principal no disponible"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
        <div className="p-8 text-white">
          <h1 className="text-4xl font-bold">{news.title}</h1>
        </div>
      </div>
    </div>
  );
}

// Ejemplo 4: Galería con lazy loading
function LazyImageGrid({ images }: { images: Array<{ id: string; alt: string }> }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <ApiImage
          key={image.id}
          src={`/api/images/${image.id}`}
          alt={image.alt}
          width={200}
          height={200}
          className="rounded-lg"
          priority={index < 4} // Solo las primeras 4 con prioridad
          showLoader={true}
        />
      ))}
    </div>
  );
}

// Ejemplo 5: Manejo de errores personalizado
function NewsDetail({ news }: { news: { id: string; title: string; content: string; imageUrl?: string } }) {
  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
        
        {/* Imagen principal con fallback personalizado */}
        <div className="mb-6">
          <ApiImage
            src={news.imageUrl || `/api/images/${news.id}`}
            alt={`Imagen del artículo: ${news.title}`}
            width={800}
            height={400}
            className="w-full rounded-lg"
            priority={true}
            fallbackText="Esta noticia no tiene imagen asociada"
            showLoader={true}
          />
        </div>
      </header>
      
      <div className="prose max-w-none">
        {news.content}
      </div>
    </article>
  );
}

export {
  NewsCard,
  NewsGallery,
  HeroSection,
  LazyImageGrid,
  NewsDetail,
};
