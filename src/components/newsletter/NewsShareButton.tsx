'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsShareButtonProps {
  title: string;
  slug: string;
  excerpt: string;
  className?: string;
}

export default function NewsShareButton({ title, slug, excerpt, className = '' }: NewsShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/noticias/${slug}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      setIsOpen(false);
    } catch {
      // Fallback para navegadores que no soportan Clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      setIsOpen(false);
    }
  };

  const shareOnWhatsApp = () => {
    const message = `${title}\n\n${excerpt}\n\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    setIsOpen(false);
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    setIsOpen(false);
  };

  const shareOnTwitter = () => {
    const text = `${title} ${shareUrl}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-gray-600 hover:text-gray-800 bg-white/90 hover:bg-white backdrop-blur-sm transition-all duration-200 shadow-sm"
        title="Compartir noticia"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
      </button>

      {/* Dropdown de opciones */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black/5 py-1"
            >
              <button
                onClick={shareOnWhatsApp}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <div className="w-5 h-5 mr-3 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-xs text-white font-bold">W</span>
                </div>
                WhatsApp
              </button>
              
              <button
                onClick={shareOnFacebook}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <div className="w-5 h-5 mr-3 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-xs text-white font-bold">f</span>
                </div>
                Facebook
              </button>
              
              <button
                onClick={shareOnTwitter}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <div className="w-5 h-5 mr-3 bg-black rounded flex items-center justify-center">
                  <span className="text-xs text-white font-bold">𝕏</span>
                </div>
                Twitter
              </button>
              
              <div className="border-t border-gray-100 my-1"></div>
              
              <button
                onClick={copyToClipboard}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
                Copiar enlace
              </button>
            </motion.div>
            
            {/* Overlay para cerrar */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
          </>
        )}
      </AnimatePresence>

      {/* Toast de confirmación */}
      <AnimatePresence>
        {copySuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">¡Enlace copiado!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
