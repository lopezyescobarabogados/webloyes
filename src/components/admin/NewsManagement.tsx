'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NewsTable from './NewsTable';
import NewsForm from './NewsForm';

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string; // JSON string
  published: boolean;
  featured: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export default function NewsManagement() {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  // Cargar noticias al montar el componente
  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('/api/news');
      if (!response.ok) {
        throw new Error('Error al cargar las noticias');
      }

      const data = await response.json();
      setNews(data || []);
    } catch (err) {
      console.error('Error loading news:', err);
      setError('Error al cargar las noticias');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNews = () => {
    setSelectedNews(null);
    setIsCreating(true);
    setIsFormOpen(true);
  };

  const handleEditNews = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setIsCreating(false);
    setIsFormOpen(true);
  };

  const handleDeleteNews = async (id: string) => {
    if (
      !window.confirm('¿Estás seguro de que quieres eliminar esta noticia?')
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la noticia');
      }

      setNews(news.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting news:', err);
      setError('Error al eliminar la noticia');
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedNews(null);
    setIsCreating(false);
  };

  const handleFormSuccess = (updatedNews: NewsItem) => {
    if (isCreating) {
      setNews([updatedNews, ...news]);
    } else {
      setNews(
        news.map(item => (item.id === updatedNews.id ? updatedNews : item))
      );
    }
    handleFormClose();
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <svg
              className="text-navy h-6 w-6 animate-spin"
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
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-center">
            <svg
              className="mr-2 h-5 w-5 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Actions Bar */}
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin')}
              className="flex items-center text-gray-600 hover:text-navy transition-colors"
              title="Volver al panel de administración"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Volver al Admin
            </button>
            <h2 className="text-navy font-serif text-xl font-bold">
              Noticias ({news.length})
            </h2>
            <button
              onClick={loadNews}
              className="text-gray-500 hover:text-navy transition-colors"
              title="Recargar noticias"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <button
            onClick={handleCreateNews}
            className="bg-navy hover:bg-navy-600 rounded-lg px-4 py-2 font-medium text-white transition-colors"
          >
            <svg
              className="mr-2 inline h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Nueva Noticia
          </button>
        </div>
      </div>

      {/* News Table */}
      <NewsTable
        news={news}
        onEdit={handleEditNews}
        onDelete={handleDeleteNews}
      />

      {/* News Form Modal */}
      {isFormOpen && (
        <NewsForm
          news={selectedNews}
          isCreating={isCreating}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
