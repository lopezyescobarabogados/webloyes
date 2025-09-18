'use client';

import { motion, AnimatePresence } from 'framer-motion';
import SmartNewsImage from '@/components/news/SmartNewsImage';
import { normalizeCategory } from '@/utils/newsNormalizer';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    tags?: string;
    published: boolean;
    featured: boolean;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
  };
  parseTags: (tags?: string) => string[];
  formatDate: (dateString: string) => string;
}

export default function NewsModal({ 
  isOpen, 
  onClose, 
  article, 
  parseTags, 
  formatDate 
}: NewsModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del Modal */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-6">
            <div className="flex items-center space-x-4">
              <span className="bg-navy text-white px-3 py-1 rounded-full text-sm font-medium">
                {normalizeCategory(article.category)}
              </span>
              <span className="text-gray-500 text-sm">
                {formatDate(article.createdAt)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 transition-colors hover:text-gray-600 focus:outline-none"
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

          {/* Contenido del Modal */}
          <div className="p-6">
            {/* Imagen */}
            {article.imageUrl && (
              <div className="relative mb-6 h-64 lg:h-96 rounded-xl overflow-hidden">
                <SmartNewsImage
                  news={article}
                  size="xl"
                  priority={true}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Título */}
            <h1 className="text-navy mb-4 font-serif text-3xl font-bold lg:text-4xl">
              {article.title}
            </h1>

            {/* Autor */}
            <div className="mb-6 flex items-center space-x-3">
              <div className="bg-navy flex h-10 w-10 items-center justify-center rounded-full">
                <span className="text-sm font-semibold text-white">
                  {article.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{article.author}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(article.createdAt)}
                </p>
              </div>
            </div>

            {/* Tags */}
            {(() => {
              const tags = parseTags(article.tags);
              return tags.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Contenido completo */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed text-justify"
                dangerouslySetInnerHTML={{ 
                  __html: article.content
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-navy">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<strong class="font-semibold text-navy">$1</strong>')
                    .replace(/\n/g, '<br />') 
                }}
              />
            </div>
          </div>

          {/* Footer del Modal */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Última actualización: {formatDate(article.updatedAt)}
              </div>
              <button
                onClick={onClose}
                className="bg-navy hover:bg-navy-600 rounded-lg px-6 py-2 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
              >
                Cerrar
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
