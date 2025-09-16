/**
 * Ejemplo de integración del procesador de imágenes
 * en el formulario de creación/edición de noticias
 */

'use client';

import { useState } from 'react';
import { useImageProcessor, ProcessedImage } from '../ImageProcessor';

export function ImageUploadExample() {
  const [imageUrl, setImageUrl] = useState('');
  const [processedImage, setProcessedImage] = useState<{
    url: string;
    method: string;
    isDataUrl: boolean;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const { processImage } = useImageProcessor();

  const handleImageProcess = async () => {
    if (!imageUrl.trim()) {
      setError('Por favor ingresa una URL de imagen');
      return;
    }

    setIsProcessing(true);
    setError('');
    
    try {
      const result = await processImage(imageUrl);
      setProcessedImage(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar imagen');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Procesador de Imágenes - Demo</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            URL de la imagen
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://drive.google.com/file/d/... o cualquier URL de imagen"
          />
        </div>

        <button
          onClick={handleImageProcess}
          disabled={isProcessing || !imageUrl.trim()}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Procesando...' : 'Procesar Imagen'}
        </button>

        {error && (
          <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
            {error}
          </div>
        )}
      </div>

      {processedImage && (
        <div className="space-y-4">
          <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
            <h3 className="font-semibold text-green-800">✅ Imagen procesada exitosamente</h3>
            <p className="text-green-700">
              Método usado: <code className="bg-green-200 px-2 py-1 rounded">{processedImage.method}</code>
            </p>
            {processedImage.isDataUrl && (
              <p className="text-green-700">
                ✨ Convertida a base64 (no requiere acceso externo)
              </p>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Vista previa:</h4>
            <ProcessedImage
              src={processedImage.url}
              alt="Imagen procesada"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">💡 URLs de prueba:</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <div>
            <strong>Google Drive:</strong>
            <br />
            <code className="text-xs">https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing</code>
          </div>
          <div>
            <strong>Imagen externa (con CORS):</strong>
            <br />
            <code className="text-xs">https://httpbin.org/image/png</code>
          </div>
          <div>
            <strong>Base64:</strong>
            <br />
            <code className="text-xs">data:image/png;base64,iVBORw0KGgo...</code>
          </div>
        </div>
      </div>
    </div>
  );
}
