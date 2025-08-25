import { Metadata } from 'next';
import MainLayout from '@/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'Términos de Uso - López & Escobar Abogados',
  description: 'Términos y condiciones de uso del sitio web y servicios de López & Escobar Abogados.',
  robots: 'index, follow',
};

export default function TerminosPage() {
  return (
    <MainLayout>
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h1 className="text-navy mb-4 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
                Términos de Uso
              </h1>
              <p className="text-lg text-gray-600 sm:text-xl">
                Condiciones para el uso de nuestros servicios
              </p>
            </div>

            <div className="space-y-8 rounded-2xl bg-white p-8 shadow-lg">
              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  1. Aceptación de los Términos
                </h2>
                <p className="mb-4 text-gray-700">
                  Al acceder y utilizar el sitio web de López & Escobar Abogados, 
                  usted acepta estar sujeto a estos términos de uso y a nuestra 
                  política de privacidad.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  2. Descripción del Servicio
                </h2>
                <p className="mb-4 text-gray-700">
                  López & Escobar Abogados proporciona servicios jurídicos especializados 
                  en derecho civil, mercantil y familiar. Este sitio web sirve como 
                  plataforma informativa y de contacto para nuestros servicios.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  3. Uso Aceptable
                </h2>
                <p className="mb-4 text-gray-700">
                  Usted se compromete a utilizar este sitio web únicamente para fines legales 
                  y de manera que no infrinja los derechos de terceros o restrinja o inhiba 
                  el uso del sitio por parte de otros usuarios.
                </p>
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li>• No transmitir contenido ilegal, amenazante, difamatorio o obsceno</li>
                  <li>• No intentar acceder a áreas restringidas del sitio</li>
                  <li>• No interferir con el funcionamiento del sitio web</li>
                  <li>• No utilizar el sitio para actividades comerciales no autorizadas</li>
                </ul>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  4. Propiedad Intelectual
                </h2>
                <p className="mb-4 text-gray-700">
                  Todo el contenido de este sitio web, incluyendo textos, gráficos, logos, 
                  imágenes y software, es propiedad de López & Escobar Abogados y está 
                  protegido por las leyes de derechos de autor y otras leyes de propiedad intelectual.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  5. Relación Abogado-Cliente
                </h2>
                <p className="mb-4 text-gray-700">
                  La navegación por este sitio web no establece una relación abogado-cliente 
                  conforme al Estatuto del Ejercicio de la Abogacía en Colombia. Esta relación 
                  solo se establece mediante:
                </p>
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li>• La firma de un contrato de servicios profesionales específico</li>
                  <li>• El pago de honorarios profesionales acordados</li>
                  <li>• La aceptación formal del caso por parte del abogado</li>
                  <li>• El cumplimiento de los requisitos éticos y legales del ejercicio profesional</li>
                </ul>
                <p className="mb-4 text-gray-700">
                  <strong>Advertencia:</strong> La información proporcionada en este sitio 
                  tiene carácter informativo general y no constituye asesoría jurídica específica.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  6. Confidencialidad y Secreto Profesional
                </h2>
                <p className="mb-4 text-gray-700">
                  Cualquier información que nos proporcione a través de este sitio web 
                  será tratada con la máxima confidencialidad, de acuerdo con:
                </p>
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li>• Las normas éticas del Código de Ética Profesional del Abogado</li>
                  <li>• El Estatuto del Ejercicio de la Abogacía en Colombia</li>
                  <li>• La Ley 1581 de 2012 sobre protección de datos personales</li>
                  <li>• Las disposiciones del Código de Procedimiento Civil sobre secreto profesional</li>
                </ul>
                <p className="mb-4 text-gray-700">
                  <strong>Importante:</strong> El envío de información a través de este sitio 
                  no constituye consulta jurídica formal ni establece relación abogado-cliente.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  7. Limitación de Responsabilidad
                </h2>
                <p className="mb-4 text-gray-700">
                  López & Escobar Abogados no se hace responsable de los daños directos, 
                  indirectos, incidentales o consecuentes que puedan derivarse del uso 
                  de este sitio web o de la imposibilidad de utilizarlo.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  8. Enlaces a Terceros
                </h2>
                <p className="mb-4 text-gray-700">
                  Este sitio web puede contener enlaces a sitios de terceros. No somos 
                  responsables del contenido o las prácticas de privacidad de estos sitios externos.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  9. Marco Normativo del Ejercicio Profesional
                </h2>
                <p className="mb-4 text-gray-700">
                  El ejercicio profesional de López & Escobar Abogados se rige por:
                </p>
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li>• <strong>Decreto 196 de 1971:</strong> Estatuto del Ejercicio de la Abogacía</li>
                  <li>• <strong>Código de Ética Profesional del Abogado</strong></li>
                  <li>• <strong>Ley 1123 de 2007:</strong> Código Disciplinario del Abogado</li>
                  <li>• <strong>Constitución Política de Colombia:</strong> Derecho al debido proceso</li>
                  <li>• <strong>Código General del Proceso:</strong> Actuación procesal</li>
                </ul>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  10. Modificaciones de los Términos
                </h2>
                <p className="mb-4 text-gray-700">
                  Nos reservamos el derecho de modificar estos términos de uso en cualquier 
                  momento para cumplir con cambios normativos o mejoras en nuestros servicios. 
                  Las modificaciones entrarán en vigor inmediatamente después de su publicación 
                  en el sitio web. Se recomienda revisar periódicamente estos términos.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  11. Ley Aplicable y Jurisdicción
                </h2>
                <p className="mb-4 text-gray-700">
                  Estos términos se rigen por las leyes de la República de Colombia, 
                  especialmente por el Código Civil, Código de Comercio, Estatuto del 
                  Consumidor (Ley 1480 de 2011) y demás normatividad aplicable. 
                  Cualquier disputa será sometida a la jurisdicción de los tribunales 
                  competentes de Armenia, Quindío.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  12. Información de Contacto
                </h2>
                <p className="mb-4 text-gray-700">
                  Si tiene preguntas sobre estos términos de uso, puede contactarnos:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Oficina Principal</h4>
                    <div className="text-gray-700 space-y-1">
                      <p>Calle 6 Norte No.17-33 Carrera 17 y 18</p>
                      <p>Barrio los Profesionales</p>
                      <p>Urbanización las Delicias</p>
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
