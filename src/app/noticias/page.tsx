'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import Button from '@/components/ui/Button';
import NewsModal from '@/components/NewsModal';
import { truncateFormattedText } from '@/utils/textUtils';
import { normalizeNewsArray, normalizeCategory } from '@/utils/newsNormalizer';
import Link from 'next/link';
import Image from 'next/image';

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string;
  published: boolean;
  featured: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export default function NoticiasPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar noticias desde la API
  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (response.ok) {
          const rawData = await response.json();
          const publishedNews = rawData.filter((item: NewsItem) => item.published);
          // Normalizar las noticias para asegurar categorías como strings
          const normalizedNews = normalizeNewsArray(publishedNews);
          setNews(normalizedNews);
        }
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, []);

  // Auto-scroll del carrusel cada 10 segundos
  useEffect(() => {
    if (news.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % news.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [news.length]);

  // Funciones de navegación del carrusel
  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + news.length) % news.length);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % news.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Parsear tags desde JSON string
  const parseTags = (tags?: string): string[] => {
    if (!tags) return [];

    // Si ya es un array, devolverlo
    if (Array.isArray(tags)) return tags;

    try {
      const parsed = JSON.parse(tags);
      // Si el resultado es un array, devolverlo
      if (Array.isArray(parsed)) return parsed;
      // Si es un string, devolverlo como array de un elemento
      if (typeof parsed === 'string') return [parsed];
      // Para cualquier otro tipo, devolver array vacío
      return [];
    } catch {
      // Si falla el parsing, tratar como string simple
      return typeof tags === 'string' ? [tags] : [];
    }
  };

  // Formatear fecha
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Funciones para manejar el modal
  const openModal = (article: NewsItem) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArticle(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center space-x-3">
                <svg
                  className="text-navy h-8 w-8 animate-spin"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Cargando noticias...</span>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="from-navy to-navy bg-gradient-to-br via-blue-900 py-16 text-white sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 font-serif text-4xl leading-tight font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Noticias{' '}
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Jurídicas
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-200 sm:text-xl md:text-2xl">
              Mantente informado sobre las últimas novedades jurídicas, cambios
              normativos y análisis legales especializados.
            </p>
          </div>
        </div>
      </section>

      {/* Noticias Section */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-4xl text-center sm:mb-16">
            <h2 className="text-navy mb-4 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
              Noticias
            </h2>
            {news.length > 0 ? (
              <p className="text-lg text-gray-600 sm:text-xl">
                Análisis jurídicos y actualización normativa
              </p>
            ) : (
              <p className="text-lg text-gray-600 sm:text-xl">
                Próximamente tendrás acceso a nuestras noticias y análisis
                jurídicos
              </p>
            )}
          </div>

          {news.length > 0 ? (
            <div className="relative">
              {/* Carrusel Horizontal */}
              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {news.map(article => (
                    <div key={article.id} className="w-full flex-shrink-0">
                      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                        <div className="grid gap-0 lg:grid-cols-2">
                          {/* Imagen del artículo */}
                          <div className="relative h-64 lg:h-96">
                            {article.imageUrl ? (
                              <Image
                                src={article.imageUrl}
                                alt={article.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="from-navy flex h-full w-full items-center justify-center bg-gradient-to-br to-blue-700 text-white">
                                <div className="p-8 text-center">
                                  <svg
                                    className="mx-auto mb-4 h-16 w-16 opacity-80"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                                      clipRule="evenodd"
                                    />
                                    <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v-1z" />
                                  </svg>
                                  <p className="text-lg font-medium opacity-90">
                                    Noticia Jurídica
                                  </p>
                                </div>
                              </div>
                            )}
                            {/* Badge de categoría */}
                            <div className="absolute top-4 left-4">
                              <span className="bg-navy rounded-full px-3 py-1 text-sm font-medium text-white">
                                {normalizeCategory(article.category)}
                              </span>
                            </div>
                            {article.featured && (
                              <div className="absolute top-4 right-4">
                                <span className="rounded-full bg-yellow-500 px-3 py-1 text-sm font-medium text-yellow-900">
                                  Destacado
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Contenido del artículo */}
                          <div className="flex flex-col justify-center p-8 lg:p-12">
                            {/* Fecha y autor */}
                            <div className="mb-4 flex items-center text-sm text-gray-500">
                              <time dateTime={article.createdAt}>
                                {formatDate(article.createdAt)}
                              </time>
                              <span className="mx-2">•</span>
                              <span className="truncate">{article.author}</span>
                            </div>

                            {/* Título */}
                            <h3 className="text-navy mb-4 font-serif text-2xl font-bold lg:text-3xl">
                              {article.title}
                            </h3>

                            {/* Extracto truncado con formato */}
                            <div 
                              className="mb-6 text-justify leading-relaxed text-gray-700"
                              dangerouslySetInnerHTML={{
                                __html: truncateFormattedText(article.excerpt, 160)
                              }}
                            />

                            {/* Tags */}
                            {(() => {
                              const tags = parseTags(article.tags);
                              return (
                                tags.length > 0 && (
                                  <div className="mb-6">
                                    <div className="flex flex-wrap gap-2">
                                      {tags.slice(0, 4).map((tag, idx) => (
                                        <span
                                          key={idx}
                                          className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )
                              );
                            })()}

                            {/* Botón Ver noticia completa */}
                            <Button
                              size="lg"
                              className="w-full sm:w-auto"
                              onClick={() => openModal(article)}
                            >
                              Ver noticia completa
                              <svg
                                className="ml-2 h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navegación del carrusel */}
              {news.length > 1 && (
                <>
                  {/* Botones de navegación */}
                  <button
                    onClick={goToPrevious}
                    className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl"
                    aria-label="Noticia anterior"
                  >
                    <svg
                      className="text-navy h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl"
                    aria-label="Siguiente noticia"
                  >
                    <svg
                      className="text-navy h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Indicadores de posición */}
                  <div className="mt-8 flex justify-center space-x-2">
                    {news.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? 'bg-navy'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Ver noticia ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            // Estado vacío - sin noticias
            <div className="py-20 text-center">
              <div className="mb-6 text-gray-400">
                <svg
                  className="mx-auto h-20 w-20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-700">
                Noticias en Desarrollo
              </h3>
              <p className="mx-auto mb-8 max-w-md text-lg text-gray-500">
                Estamos preparando contenido jurídico especializado y análisis
                de actualidad normativa. Próximamente tendrás acceso a nuestras
                publicaciones especializadas.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/contacto">
                  <Button size="lg" className="w-full sm:w-auto">
                    Contactar para Consultas
                  </Button>
                </Link>
                <Link href="/nosotros">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Nosotros
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-navy to-navy bg-gradient-to-br via-blue-900 py-16 text-white sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:max-w-none sm:flex-row">
              <Link href="/contacto">
                <Button
                  size="lg"
                  className="btn-outline-white w-full transform transition-all duration-300 hover:scale-105 sm:w-auto"
                >
                  Contáctenos
                </Button>
              </Link>
              <Link href="/nosotros">
                <Button
                  size="lg"
                  className="btn-outline-white w-full transform transition-all duration-300 hover:scale-105 sm:w-auto"
                >
                  Nosotros
                </Button>
              </Link>
            </div><br />
            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-200 sm:text-xl">
              Orientación jurídica estratégica y especializada
            </p>
          </div>
        </div>
      </section>

      {/* Modal de Noticia Completa */}
      {selectedArticle && (
        <NewsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          article={selectedArticle}
          parseTags={parseTags}
          formatDate={formatDate}
        />
      )}
    </MainLayout>
  );
}
