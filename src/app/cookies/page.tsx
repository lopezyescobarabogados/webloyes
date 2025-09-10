import { Metadata } from 'next';
import MainLayout from '@/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'Política de Cookies - López & Escobar Abogados',
  description: 'Información sobre el uso de cookies en el sitio web de López & Escobar Abogados.',
  robots: 'index, follow',
};

const horarios = {
  "lunes_viernes": {
    "inicio": "07:30",
    "almuerzo": "12:00 - 13:00",
    "fin": "17:30"
  },
  "sabado": "cerrado",
  "domingo_festivo": "cerrado"
};

export default function CookiesPage() {
  return (
    <MainLayout>
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h1 className="text-navy mb-4 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
                POLÍTICA DE COOKIES
              </h1>
              <p className="text-lg text-gray-600 sm:text-xl">
                INFORMACIÓN SOBRE EL USO DE COOKIES EN NUESTRO SITIO WEB
              </p>
              <div className="mt-4">
                <p className="text-gray-700 font-medium">López & Escobar Abogados Asociados S.A.S.</p>
                <p className="text-gray-600">Nit 901.850.566-8</p>
              </div>
            </div>

            <div className="space-y-8 rounded-2xl bg-white p-8 shadow-lg">
              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  I. ¿QUÉ SON LAS COOKIES?
                </h2>
                <p className="mb-4 text-gray-700">
                  Las cookies son pequeños archivos de texto que se instalan en el dispositivo del usuario al acceder a un sitio web. Permiten reconocer al usuario, recordar sus preferencias y mejorar su experiencia de navegación.
                </p>
                <p className="mb-4 text-gray-700">
                  En cumplimiento de la Ley 1581 de 2012, el Decreto 1377 de 2013, la Circular Externa 002 de 2015 de la Superintendencia de Industria y Comercio (SIC) y la Ley 1480 de 2011 – Estatuto del Consumidor, informamos sobre el uso de cookies en nuestro sitio web con el fin de garantizar la transparencia en el tratamiento de datos personales y brindar a los usuarios control sobre su información.
                </p>
                <p className="mb-4 text-gray-700">
                  En López & Escobar Abogados utilizamos cookies con fines legítimos, principalmente para optimizar la funcionalidad del sitio, facilitar la navegación y ofrecer una experiencia digital segura y personalizada a quienes consultan nuestros servicios jurídicos especializados.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  II. ¿QUÉ TIPO DE COOKIES UTILIZA ESTA PÁGINA WEB?
                </h2>
                <p className="mb-4 text-gray-700">
                  En López & Escobar Abogados utilizamos las siguientes cookies para mejorar su experiencia como usuario y optimizar nuestros servicios jurídicos digitales:
                </p>
                <ul className="mb-4 space-y-3 text-gray-700">
                  <li>- <strong>Cookies de Funcionalidad:</strong> Permiten recordar configuraciones del usuario, como idioma, formato de visualización y preferencias de acceso, con el fin de facilitar una navegación más ágil.</li>
                  
                  <li>- <strong>Cookies de análisis de uso:</strong> Son aquéllas que bien tratadas por nosotros o por terceros, nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado. Para ello se analiza su navegación en nuestra página web con el fin de mejorar la oferta de servicios que ofrecemos.</li>

                  <li>- <strong>Cookies de Personalización:</strong> Facilitan la adaptación de contenidos y recursos jurídicos a los intereses del usuario, ofreciendo una experiencia más acorde con sus necesidades.</li>

                  <li>- <strong>Cookies de Seguridad:</strong> Se emplean para proteger la confidencialidad de las consultas y garantizar que las interacciones dentro del sitio web se desarrollen en un entorno seguro.</li>

                  <li>- <strong>Formularios de contacto:</strong> Facilitar el envío de consultas jurídicas y contacto.</li>

                  <li>- <strong>Cookies de Rendimiento:</strong> Nos ayudan a comprender cómo interactúan los usuarios con nuestro sitio, recopilando información sobre páginas visitadas, tiempo de permanencia y posibles errores de navegación. Esto permite mejorar la calidad y eficacia de nuestros servicios jurídicos digitales.</li>

                  <li>- <strong>Cookies Estrictamente Necesarias.</strong> Son esenciales para el funcionamiento básico del sitio web y no pueden desactivarse. Permiten, entre otros, la navegación, la seguridad y el acceso a áreas restringidas del portal.</li>

                  <li>- <strong>Cookies de Terceros:</strong> Nuestro sitio web puede utilizar servicios de terceros que establecen sus propias cookies, como:
                    <ul className="mt-2 ml-4 space-y-1">
                      <li>✓ Google Analytics: Análisis del tráfico web</li>
                      <li>✓ Google Fonts: Optimización en la carga de fuentes web</li>
                      <li>✓ Otros servicios de análisis y funcionalidad: Algunas cookies son esenciales para el funcionamiento del sitio, por ejemplo, el buscador incorporado o herramientas digitales asociadas al portal.</li>
                    </ul>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  III. DERECHOS DEL USUARIO Y CONTROL DE COOKIES
                </h2>
                <p className="mb-4 text-gray-700">
                  Conforme a la Ley 1581 de 2012 y las directrices de la SIC, el usuario cuenta con los siguientes derechos frente al uso de cookies:
                </p>
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li>- Derecho a ser informado sobre el uso de cookies.</li>
                  <li>- Derecho de acceso, para conocer qué cookies están activas en su dispositivo.</li>
                  <li>- Derecho de rectificación, para modificar configuraciones.</li>
                  <li>- Derecho de supresión, para eliminar cookies instaladas.</li>
                  <li>- Derecho de oposición, para rechazar cookies no esenciales.</li>
                </ul>
                <p className="mb-4 text-gray-700">
                  El usuario podrá configurar su navegador para permitir, bloquear o eliminar cookies según sus preferencias. Es importante señalar que, si se bloquean todas las cookies, es posible que ciertas funcionalidades del sitio no se encuentren disponibles o que la experiencia de navegación se vea limitada.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  IV. GUÍAS RÁPIDAS DE CONFIGURACIÓN
                </h2>
                <p className="mb-4 text-gray-700">
                  El Usuario puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador.
                </p>
                <p className="mb-4 text-gray-700">
                  En la mayoría de los navegadores web se ofrece la posibilidad de permitir, bloquear o eliminar las cookies instaladas en su equipo.
                </p>
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li>- Configurar su navegador para evitar nuevas cookies</li>
                  <li>- Modificar la configuración para cookies específicas</li>
                  <li>- Contactarnos para ejercer sus derechos</li>
                </ul>
                <p className="mb-4 text-gray-700">
                  El Usuario puede eliminar y bloquear todas las cookies de este sitio, pero parte del sitio no funcionará o la calidad de la página web y de los Contenidos pueden verse afectados.
                </p>

                <div className="mt-6">
                  <h3 className="text-navy mb-3 font-semibold text-lg">
                    IV.1. Configuración del Navegador
                  </h3>
                  <p className="mb-3 text-gray-700">
                    Para obtener información sobre cómo controlar las cookies en los navegadores más populares, visite:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Chrome: Configuración → Privacidad y seguridad → Cookies</li>
                    <li>✓ Firefox: Preferencias → Privacidad y seguridad</li>
                    <li>✓ Safari: Preferencias → Privacidad</li>
                    <li>✓ Microsoft Edge: Configuración → Privacidad, búsqueda y servicios</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  V. MARCO NORMATIVO
                </h2>
                <p className="mb-4 text-gray-700">
                  Nuestra política de cookies se fundamenta en la normatividad colombiana vigente:
                </p>
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li>- Ley 1581 de 2012: Protección de datos personales</li>
                  <li>- Decreto 1377 de 2013: Reglamentario de la Ley 1581</li>
                  <li>- Circular Externa 002 de 2015: Superintendencia de Industria y Comercio</li>
                  <li>- Ley 1480 de 2011: Estatuto del Consumidor</li>
                </ul>
                <p className="mb-4 text-gray-700">
                  Nos reservamos el derecho de actualizar esta política en caso de cambios regulatorios o tecnológicos. Cualquier modificación sustancial será comunicada oportunamente, en cumplimiento de la normatividad vigente.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  VI. INFORMACIÓN DE CONTACTO
                </h2>
                <p className="mb-4 text-gray-700">
                  Para ejercer sus derechos relacionados con el uso de cookies o resolver inquietudes sobre esta política, puede contactarnos en:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Oficina Principal</h4>
                    <div className="text-gray-700 space-y-1">
                      <p>Calle 6 Norte No.17-33 - Zona Los Profesionales</p>
                      <p>Armenia, Quindío – Colombia</p>
                      <p className="text-sm text-gray-600 mt-2">(cita previa)</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Contacto Directo</h4>
                    <div className="text-gray-700 space-y-2">
                      <div>
                        <p><strong>Teléfonos:</strong></p>
                        <p>300 4308692 – 311 3835833</p>
                      </div>
                      <div>
                        <p><strong>Correos:</strong></p>
                        <p>mescobarm@lopezyescobarabogados.com</p>
                        <p>blopez@lopezyescobarabogados.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Horarios</h4>
                  <div className="text-gray-700">
                    <p><strong>Lunes a viernes:</strong> {horarios.lunes_viernes.inicio} a.m. – {horarios.lunes_viernes.fin} p.m.</p>
                    <p><strong>Almuerzo:</strong> {horarios.lunes_viernes.almuerzo}</p>
                    <p><strong>Sábados, domingos y festivos:</strong> cerrado</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
