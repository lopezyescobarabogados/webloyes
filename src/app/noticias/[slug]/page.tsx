'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import MainLayout from '@/layouts/MainLayout';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import SmartNewsImage from '@/components/news/SmartNewsImage';
import { renderNewsContent } from '@/utils/textFormatting';

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

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default function NoticiaPage({ params }: Props) {
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    }
    getParams();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const loadNews = async () => {
      try {
        // Cargar todas las noticias
        const response = await fetch('/api/news');
        if (response.ok) {
          const allNews = await response.json();
          
          // Encontrar el artículo por slug
          const currentArticle = allNews.find((item: NewsItem) => item.slug === slug);
          
          if (!currentArticle) {
            notFound();
            return;
          }
          
          setArticle(currentArticle);
          
          // Encontrar artículos relacionados
          const related = allNews
            .filter((item: NewsItem) => 
              item.category === currentArticle.category && 
              item.id !== currentArticle.id &&
              item.published
            )
            .slice(0, 3);
          
          setRelatedNews(related);
        }
      } catch (error) {
        console.error('Error loading news:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-navy"></div>
            <p className="mt-4 text-gray-600">Cargando artículo...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!article) {
    notFound();
  }

  return (
    <MainLayout>
      {/* Hero Section del Artículo */}
      <section className="from-navy to-navy bg-gradient-to-br via-blue-900 py-16 text-white sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center text-sm text-gray-300">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    Inicio
                  </Link>
                </li>
                <li className="mx-2">/</li>
                <li>
                  <Link
                    href="/noticias"
                    className="transition-colors hover:text-white"
                  >
                    Noticias
                  </Link>
                </li>
                <li className="mx-2">/</li>
                <li className="truncate text-gray-400">{article.title}</li>
              </ol>
            </nav>

            {/* Categoría */}
            <div className="mb-4">
              <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                {article.category}
              </span>
            </div>

            {/* Título */}
            <h1 className="mb-6 font-serif text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              {article.title}
            </h1>

            {/* Extracto */}
            <p className="mb-8 text-lg leading-relaxed text-gray-200 sm:text-xl text-justify">
              {article.excerpt}
            </p>

            {/* Metadatos del artículo */}
            <div className="flex flex-wrap items-center gap-4 border-t border-white/20 pt-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time dateTime={article.createdAt}>
                  {formatDate(article.createdAt)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <span>{JSON.parse(article.tags || '[]').join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Imagen destacada */}
      {article.imageUrl && (
        <section className="bg-gray-50 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg sm:h-80 md:h-96 bg-gray-100">
                <SmartNewsImage
                  news={article}
                  fill={true}
                  priority={true}
                  className="object-contain"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenido del artículo */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <article className="prose prose-lg prose-navy max-w-none">
              {/* Convertir el contenido con formato WhatsApp */}
              <div
                className="leading-relaxed text-gray-700 text-justify"
                dangerouslySetInnerHTML={{
                  __html: renderNewsContent(article.content)
                }}
              />
            </article>

            {/* Tags del artículo */}
            <div className="mt-12 border-t border-gray-200 pt-8">
              <h3 className="text-navy mb-4 text-lg font-semibold">
                Etiquetas:
              </h3>
              <div className="flex flex-wrap gap-2">
                {JSON.parse(article.tags || '[]').map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Navegación del artículo */}
            <div className="mt-12 border-t border-gray-200 pt-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <Link href="/noticias">
                  <Button variant="outline">
                    <svg
                      className="mr-2 h-4 w-4"
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
                    Volver a noticias
                  </Button>
                </Link>
                <Link href="/contacto">
                  <Button>
                    ¿Te gustó? Contáctanos
                    <svg
                      className="ml-2 h-4 w-4"
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artículos relacionados */}
      {relatedNews.length > 0 && (
        <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center">
                <h2 className="text-navy mb-4 font-serif text-3xl font-bold sm:text-4xl">
                  Artículos Relacionados
                </h2>
                <p className="text-lg text-gray-600">
                  Más contenido sobre {article.category}
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedNews.map(relatedArticle => (
                  <article
                    key={relatedArticle.id}
                    className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                  >
                    {/* Imagen del artículo relacionado */}
                    <div className="relative h-40 overflow-hidden">
                      {relatedArticle.imageUrl ? (
                        <SmartNewsImage
                          news={relatedArticle}
                          fill={true}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          priority={false}
                        />
                      ) : (
                        <div className="from-navy flex h-full w-full items-center justify-center bg-gradient-to-br to-blue-700 text-white">
                          <div className="p-4 text-center">
                            <svg
                              className="mx-auto mb-2 h-8 w-8 opacity-80"
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
                            <p className="text-xs font-medium opacity-90">
                              Artículo
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* Badge de categoría */}
                      <div className="absolute top-2 left-2">
                        <span className="bg-navy rounded-full px-2 py-1 text-xs font-medium text-white">
                          {relatedArticle.category}
                        </span>
                      </div>
                    </div>

                    {/* Contenido de la tarjeta */}
                    <div className="p-6">
                      <h3 className="text-navy mb-3 font-serif text-lg font-semibold line-clamp-2">
                        <Link
                          href={`/noticias/${relatedArticle.slug}`}
                          className="transition-colors duration-300 hover:text-blue-700"
                        >
                          {relatedArticle.title}
                        </Link>
                      </h3>

                      <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                        {relatedArticle.excerpt}
                      </p>

                      <div className="mb-4 text-xs text-gray-500">
                        {formatDate(relatedArticle.createdAt)}
                      </div>

                      <Link href={`/noticias/${relatedArticle.slug}`}>
                        <Button variant="ghost" size="sm" className="w-full">
                          Leer artículo
                        </Button>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}
