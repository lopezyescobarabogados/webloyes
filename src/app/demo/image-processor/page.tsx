/**
 * Página de demostración del procesador de imágenes
 */

import { ImageUploadExample } from '../../../components/examples/ImageUploadExample';

export default function ImageProcessorDemo() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Demo: Procesador de Imágenes
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <ImageUploadExample />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Soluciones Implementadas</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-2">🔗 Google Drive URLs</h3>
              <p className="text-blue-700 text-sm">
                Convierte automáticamente URLs de Google Drive compartidas a formato directo
                para evitar errores de carga.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-bold text-green-800 mb-2">🌐 Proxy CORS</h3>
              <p className="text-green-700 text-sm">
                API proxy que resuelve problemas de CORS con imágenes externas,
                convirtiendo a base64 para uso local.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-bold text-purple-800 mb-2">📊 Base64 Support</h3>
              <p className="text-purple-700 text-sm">
                Soporte completo para imágenes base64 que funcionan sin problemas
                en cualquier contexto.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-4">🔧 Uso en Producción</h3>
            <div className="space-y-2 text-sm">
              <p><code className="bg-gray-200 px-2 py-1 rounded">processImageUrl(url)</code> - Procesa cualquier URL automáticamente</p>
              <p><code className="bg-gray-200 px-2 py-1 rounded">useImageProcessor()</code> - Hook para formularios React</p>
              <p><code className="bg-gray-200 px-2 py-1 rounded">ProcessedImage</code> - Componente con procesamiento automático</p>
              <p><code className="bg-gray-200 px-2 py-1 rounded">/api/proxy-image</code> - API endpoint para proxy CORS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
