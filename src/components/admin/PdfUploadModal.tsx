'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

interface NewsItem {
  id: string;
  title: string;
  pdfName?: string;
}

interface PdfUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PdfUploadModal({ isOpen, onClose, onSuccess }: PdfUploadModalProps) {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [selectedNewsId, setSelectedNewsId] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadNews();
    }
  }, [isOpen]);

  const loadNews = async () => {
    try {
      const response = await fetch('/api/news');
      if (response.ok) {
        const data = await response.json();
        setNewsList(data);
      }
    } catch (error) {
      console.error('Error loading news:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Solo se permiten archivos PDF');
    }
  };

  const handleUpload = async () => {
    if (!file || !selectedNewsId) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('newsId', selectedNewsId);

      const response = await fetch('/api/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        onSuccess();
        handleClose();
      } else {
        alert('Error al subir el PDF');
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Error al subir el PDF');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setSelectedNewsId('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-navy text-white rounded-t-2xl">
          <h2 className="text-xl font-bold">Subir PDF</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Seleccionar Noticia */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Noticia
            </label>
            <select
              value={selectedNewsId}
              onChange={(e) => setSelectedNewsId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
            >
              <option value="">Seleccionar una noticia...</option>
              {newsList.map((news) => (
                <option key={news.id} value={news.id}>
                  {news.title} {news.pdfName && '(PDF: ✓)'}
                </option>
              ))}
            </select>
          </div>

          {/* Subir Archivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Archivo PDF
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {file ? (
                <div className="flex items-center justify-center">
                  <svg className="h-8 w-8 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-900 mb-2">Seleccionar archivo PDF</p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block px-4 py-2 bg-navy text-white rounded-lg cursor-pointer hover:bg-blue-800 transition-colors"
                  >
                    Elegir archivo
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleClose} disabled={isUploading}>
              Cancelar
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!file || !selectedNewsId || isUploading}
            >
              {isUploading ? 'Subiendo...' : 'Subir PDF'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
