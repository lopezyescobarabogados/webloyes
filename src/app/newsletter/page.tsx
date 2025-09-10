import { Metadata } from 'next';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import ShareButton from '@/components/newsletter/ShareButton';

export const metadata: Metadata = {
  title: 'Newsletter - López y Escobar Abogados',
  description: 'Suscríbete a nuestro boletín informativo para recibir las últimas noticias jurídicas y actualizaciones de nuestro bufete.',
  keywords: ['newsletter', 'boletín', 'noticias jurídicas', 'abogados', 'López y Escobar'],
};

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy mb-6 font-serif">
            Subscribe to our Newsletter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Mantente informado con las últimas actualizaciones en el ámbito jurídico, 
            cambios legislativos relevantes y noticias importantes de nuestro bufete. 
            Recibe contenido exclusivo directamente en tu correo electrónico.
          </p>
        </div>

        {/* Newsletter Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700">
              <svg
                className="h-8 w-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-navy mb-2 font-serif">
              Únete a Nuestra Comunidad
            </h2>
            <p className="text-gray-600">
              Completa el formulario para recibir nuestro boletín informativo
            </p>
          </div>

          <NewsletterForm />
        </div>

        {/* Share Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-navy mb-4 font-serif">
              Comparte con Otros
            </h3>
            <p className="text-gray-600 mb-6">
              ¿Conoces a alguien que pueda estar interesado en nuestro boletín? 
              Comparte el enlace de suscripción con colegas, amigos y familiares.
            </p>
            
            <div className="flex justify-center">
              <ShareButton userId="newsletter-page" />
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-navy mb-2">Información Actualizada</h4>
            <p className="text-gray-600 text-sm">
              Recibe las últimas noticias del sector jurídico y cambios legislativos importantes
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="font-semibold text-navy mb-2">Contenido Exclusivo</h4>
            <p className="text-gray-600 text-sm">
              Accede a análisis exclusivos y consejos legales de nuestros expertos
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-navy mb-2">Frecuencia Conveniente</h4>
            <p className="text-gray-600 text-sm">
              Recibe actualizaciones semanales sin saturar tu bandeja de entrada
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
