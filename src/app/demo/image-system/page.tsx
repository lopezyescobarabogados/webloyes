/**
 * Página de ejemplo que muestra el uso del sistema de imágenes PostgreSQL
 * Incluye ejemplos de carga, visualización y gestión de imágenes
 */

'use client';

import { useState } from 'react';
import { ApiImage, NewsImage } from '@/components/ui/OptimizedImage';
import SmartNewsImage from '@/components/news/SmartNewsImage';

// Datos de ejemplo
const sampleNews = [
  {
    id: '1',
    title: 'Nuevo servicio legal especializado',
    imageUrl: '/api/images/1'
  },
  {
    id: '2', 
    title: 'Actualización en derecho corporativo',
    imageUrl: '/api/images/2'
  },
  {
    id: '3',
    title: 'Seminario de derecho digital',
    imageUrl: null
  }
];

export default function ImageSystemDemo() {
  const [selectedNews, setSelectedNews] = useState(sampleNews[0]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema de Imágenes PostgreSQL
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Demostración del sistema completo de almacenamiento y visualización 
            de imágenes usando PostgreSQL como base de datos principal.
          </p>
        </div>

        {/* Sección 1: ApiImage Básico */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            1. Componente ApiImage Básico
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Imagen desde API</h3>
                <ApiImage
                  src="/api/images/1"
                  alt="Imagen de ejemplo desde PostgreSQL"
                  width={400}
                  height={300}
                  className="rounded-lg border"
                  fallbackText="Imagen no disponible"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Características:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Carga directa desde PostgreSQL BYTEA</li>
                  <li>Fallback automático en caso de error</li>
                  <li>Optimización para Next.js deshabilitada</li>
                  <li>Estados de carga y error manejados</li>
                  <li>Headers de cache configurados</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 2: NewsImage con tamaños predefinidos */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            2. NewsImage con Tamaños Predefinidos
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h4 className="font-medium mb-3">Pequeña (sm)</h4>
                <NewsImage
                  src="/api/images/1"
                  alt="Imagen pequeña"
                  size="sm"
                  className="mx-auto"
                />
              </div>
              <div className="text-center">
                <h4 className="font-medium mb-3">Mediana (md)</h4>
                <NewsImage
                  src="/api/images/1"
                  alt="Imagen mediana"
                  size="md"
                  className="mx-auto"
                />
              </div>
              <div className="text-center">
                <h4 className="font-medium mb-3">Grande (lg)</h4>
                <NewsImage
                  src="/api/images/1"
                  alt="Imagen grande"
                  size="lg"
                  className="mx-auto"
                />
              </div>
              <div className="text-center">
                <h4 className="font-medium mb-3">Extra Grande (xl)</h4>
                <NewsImage
                  src="/api/images/1"
                  alt="Imagen extra grande"
                  size="xl"
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sección 3: SmartNewsImage */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            3. SmartNewsImage con Gestión Inteligente
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {sampleNews.map((news) => (
                <button
                  key={news.id}
                  onClick={() => setSelectedNews(news)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    selectedNews.id === news.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-medium text-left">{news.title}</h4>
                  <p className="text-sm text-gray-500 text-left">
                    ID: {news.id} • 
                    {news.imageUrl ? ' Con imagen' : ' Sin imagen'}
                  </p>
                </button>
              ))}
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">
                Noticia Seleccionada: {selectedNews.title}
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <SmartNewsImage
                    news={selectedNews}
                    size="lg"
                    className="w-full"
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Funcionalidades SmartNewsImage:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Verificación automática de imágenes</li>
                    <li>Fallback al endpoint /api/images/[id]</li>
                    <li>Hook useNewsImage para estado</li>
                    <li>Tamaños predefinidos</li>
                    <li>Carga perezosa optimizada</li>
                  </ul>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Estado actual:</h5>
                    <p className="text-sm">
                      <strong>URL:</strong> {selectedNews.imageUrl || 'No definida'}<br/>
                      <strong>Fallback:</strong> /api/images/{selectedNews.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 4: Grid responsive */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            4. Grid Responsive de Noticias
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleNews.map((news) => (
                <article key={news.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <SmartNewsImage
                      news={news}
                      fill={true}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Artículo #{news.id}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sección 5: Información técnica */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            5. Información Técnica
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Arquitectura</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>📦 <strong>PostgreSQL BYTEA:</strong> Almacenamiento binario</li>
                  <li>🔗 <strong>API Endpoints:</strong> /api/images/[id]</li>
                  <li>⚡ <strong>Cache Headers:</strong> Optimización de rendimiento</li>
                  <li>🛡️ <strong>Validación:</strong> Tipos MIME y tamaños</li>
                  <li>🎯 <strong>TypeScript:</strong> Tipado estricto</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Flujo de Datos</h3>
                <ol className="space-y-2 text-gray-600">
                  <li>1. <strong>Upload:</strong> FormData → Buffer → BYTEA</li>
                  <li>2. <strong>Storage:</strong> PostgreSQL con tipo MIME</li>
                  <li>3. <strong>Serving:</strong> SQL Query → Response Stream</li>
                  <li>4. <strong>Display:</strong> Next.js Image + unoptimized</li>
                  <li>5. <strong>Cache:</strong> Browser + CDN compatible</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
