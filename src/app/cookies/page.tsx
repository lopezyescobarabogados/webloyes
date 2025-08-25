import { Metadata } from 'next';
import MainLayout from '@/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'Política de Cookies - López & Escobar Abogados',
  description: 'Información sobre el uso de cookies en el sitio web de López & Escobar Abogados.',
  robots: 'index, follow',
};

export default function CookiesPage() {
  return (
    <MainLayout>
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h1 className="text-navy mb-4 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
                Política de Cookies
              </h1>
              <p className="text-lg text-gray-600 sm:text-xl">
                Información sobre el uso de cookies en nuestro sitio web
              </p>
            </div>

            <div className="space-y-8 rounded-2xl bg-white p-8 shadow-lg">
              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  ¿Qué son las Cookies?
                </h2>
                <p className="mb-4 text-gray-700">
                  Las cookies son pequeños archivos de texto que se almacenan en su 
                  dispositivo cuando visita un sitio web. Conforme a la Circular Externa 
                  002 de 2015 de la Superintendencia de Industria y Comercio (SIC), 
                  informamos sobre su uso para garantizar la transparencia en el 
                  tratamiento de datos personales.
                </p>
                <p className="mb-4 text-gray-700">
                  En López & Escobar Abogados utilizamos cookies para mejorar la 
                  funcionalidad de nuestro sitio web y proporcionar una mejor experiencia 
                  a nuestros usuarios en la búsqueda de servicios jurídicos especializados.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  ¿Cómo Utilizamos las Cookies?
                </h2>
                <p className="mb-4 text-gray-700">
                  En López & Escobar Abogados utilizamos cookies para mejorar su experiencia 
                  como usuario y optimizar nuestros servicios jurídicos digitales:
                </p>
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li>• <strong>Funcionalidad del sitio:</strong> Mejorar la navegación y acceso a información jurídica</li>
                  <li>• <strong>Análisis de uso:</strong> Entender qué servicios legales son más consultados</li>
                  <li>• <strong>Personalización:</strong> Adaptar el contenido jurídico a sus intereses</li>
                  <li>• <strong>Preferencias del usuario:</strong> Recordar configuraciones de idioma y formato</li>
                  <li>• <strong>Seguridad:</strong> Proteger la confidencialidad de las consultas</li>
                  <li>• <strong>Formularios de contacto:</strong> Facilitar el envío de consultas jurídicas</li>
                </ul>
                <div className="p-4 bg-amber-50 rounded-lg mt-4">
                  <p className="text-amber-800">
                    <strong>Nota importante:</strong> Las cookies no almacenan información 
                    confidencial sobre casos jurídicos ni datos sensibles de consultas legales.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  Tipos de Cookies que Utilizamos
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900">
                      Cookies Estrictamente Necesarias
                    </h3>
                    <p className="text-gray-700">
                      Estas cookies son esenciales para el funcionamiento del sitio web 
                      y no se pueden desactivar. Incluyen cookies de seguridad y 
                      funcionalidad básica.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900">
                      Cookies de Rendimiento
                    </h3>
                    <p className="text-gray-700">
                      Nos ayudan a entender cómo los visitantes interactúan con nuestro 
                      sitio web, proporcionando información sobre las páginas visitadas, 
                      el tiempo de permanencia y cualquier mensaje de error.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900">
                      Cookies de Funcionalidad
                    </h3>
                    <p className="text-gray-700">
                      Permiten que el sitio web recuerde las elecciones que hace (como 
                      su idioma preferido) y proporcionan características mejoradas y 
                      más personales.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  Cookies de Terceros
                </h2>
                <p className="mb-4 text-gray-700">
                  Nuestro sitio web puede utilizar servicios de terceros que establecen 
                  sus propias cookies, como:
                </p>
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li>• Google Analytics: para análisis del tráfico web</li>
                  <li>• Google Fonts: para la carga de fuentes web</li>
                  <li>• Otros servicios de análisis y funcionalidad</li>
                </ul>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  Control de Cookies y Derechos del Usuario
                </h2>
                <p className="mb-4 text-gray-700">
                  Conforme a la Ley 1581 de 2012 y las directrices de la SIC, usted puede 
                  controlar y/o eliminar las cookies como desee:
                </p>
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li>• <strong>Derecho al conocimiento:</strong> Ser informado sobre el uso de cookies</li>
                  <li>• <strong>Derecho de acceso:</strong> Conocer qué cookies están activas</li>
                  <li>• <strong>Derecho de rectificación:</strong> Modificar configuraciones de cookies</li>
                  <li>• <strong>Derecho de supresión:</strong> Eliminar cookies de su dispositivo</li>
                  <li>• <strong>Derecho de oposición:</strong> Rechazar cookies no esenciales</li>
                </ul>
                <div className="p-4 bg-blue-50 rounded-lg mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Opciones de Control</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Eliminar todas las cookies existentes en su dispositivo</li>
                    <li>• Configurar su navegador para evitar nuevas cookies</li>
                    <li>• Modificar la configuración para cookies específicas</li>
                    <li>• Contactarnos para ejercer sus derechos</li>
                  </ul>
                </div>
                <p className="mb-4 text-gray-700 mt-4">
                  <strong>Importante:</strong> Deshabilitar ciertas cookies puede afectar 
                  la funcionalidad del sitio web.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  Configuración del Navegador
                </h2>
                <p className="mb-4 text-gray-700">
                  Para obtener información sobre cómo controlar las cookies en los 
                  navegadores más populares, visite:
                </p>
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li>• <strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                  <li>• <strong>Firefox:</strong> Preferencias → Privacidad y seguridad</li>
                  <li>• <strong>Safari:</strong> Preferencias → Privacidad</li>
                  <li>• <strong>Edge:</strong> Configuración → Privacidad, búsqueda y servicios</li>
                </ul>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  Marco Normativo y Actualizaciones
                </h2>
                <p className="mb-4 text-gray-700">
                  Esta política de cookies se fundamenta en la normatividad colombiana vigente:
                </p>
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li>• <strong>Ley 1581 de 2012:</strong> Protección de datos personales</li>
                  <li>• <strong>Decreto 1377 de 2013:</strong> Reglamentario de la Ley 1581</li>
                  <li>• <strong>Circular Externa 002 de 2015:</strong> SIC sobre cookies y tecnologías similares</li>
                  <li>• <strong>Ley 1480 de 2011:</strong> Estatuto del Consumidor</li>
                </ul>
                <p className="mb-4 text-gray-700">
                  Podemos actualizar esta política de cookies ocasionalmente para cumplir 
                  con cambios normativos de la Superintendencia de Industria y Comercio (SIC) 
                  o mejoras en nuestros servicios digitales. Se informará sobre cambios 
                  sustanciales conforme a la legislación vigente.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  Información de Contacto
                </h2>
                <p className="mb-4 text-gray-700">
                  Si tiene preguntas sobre nuestra política de cookies, puede contactarnos:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Oficina Principal</h4>
                    <div className="text-gray-700 space-y-1">
                      <p>Calle 6 Norte No.17-33</p>
                      <p>Zona Los Profesionales</p>
                      <p>Armenia, Quindío - Colombia</p>
                      <p className="text-sm text-gray-600 mt-2">Visitas con cita previa</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Contacto Directo</h4>
                    <div className="text-gray-700 space-y-2">
                      <div>
                        <p><strong>Teléfonos:</strong></p>
                        <p>300 4308692</p>
                        <p>311 3835833</p>
                      </div>
                      <div>
                        <p><strong>Emails:</strong></p>
                        <p>mescobarm@lopezyescobarabogados.com</p>
                        <p>blopez@lopezyescobarabogados.com</p>
                        <p className="text-sm text-gray-600">Respuesta en menos de 24h</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Horarios de Atención</h4>
                  <div className="text-gray-700">
                    <p><strong>Lunes - Viernes:</strong> 7:30 - 17:30</p>
                    <p><strong>Sábados:</strong> Cerrado</p>
                    <p><strong>Domingos:</strong> Cerrado</p>
                  </div>
                </div>
              </section>

              <div className="mt-8 border-t pt-8">
                <p className="text-center text-sm text-gray-500">
                  Última actualización: {new Date().toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
