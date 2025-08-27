import { Metadata } from 'next';
import MainLayout from '@/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'Política de Privacidad - López & Escobar Abogados',
  description: 'Política de privacidad y protección de datos de López & Escobar Abogados. Transparencia en el tratamiento de información personal.',
  robots: 'index, follow',
};

export default function PoliticaPrivacidadPage() {
  return (
    <MainLayout>
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h1 className="text-navy mb-4 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
                Política de Privacidad
              </h1>
              <p className="text-lg text-gray-600 sm:text-xl">
                Transparencia en el manejo de sus datos personales
              </p>
            </div>

            <div className="space-y-8 rounded-2xl bg-white p-8 shadow-lg">
              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  1. Información General
                </h2>
                <p className="mb-4 text-gray-700 text-justify">
                  López & Escobar Abogados (en adelante "el Bufete") se compromete a proteger 
                  la privacidad de nuestros clientes y usuarios de nuestro sitio web, conforme 
                  a la Ley 1581 de 2012 y el Decreto 1377 de 2013 sobre protección de datos 
                  personales en Colombia. Esta política describe cómo recopilamos, utilizamos 
                  y protegemos su información personal.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  2. Responsable del Tratamiento
                </h2>
                <div className="mb-4 text-gray-700 text-justify">
                  <strong>López & Escobar Abogados</strong><br />
                  Calle 6 Norte No.17-33 Carrera 17 y 18<br />
                  Barrio los Profesionales<br />
                  Urbanización las Delicias<br />
                  Armenia, Quindío - Colombia<br />
                  <br />
                  <strong>Teléfonos:</strong><br />
                  300 4308692<br />
                  311 3835833<br />
                  <br />
                  <strong>Emails:</strong><br />
                  mescobarm@lopezyescobarabogados.com<br />
                  blopez@lopezyescobarabogados.com<br />
                  <br />
                  <strong>Horarios de Atención:</strong><br />
                  Lunes - Viernes: 7:30 - 17:30<br />
                  Sábados y Domingos: Cerrado<br />
                  Visitas con cita previa
                </div>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  3. Datos que Recopilamos
                </h2>
                <ul className="mb-4 space-y-2 text-gray-700 text-justify">
                  <li>• Datos de identificación: nombre, apellidos, documento de identidad</li>
                  <li>• Datos de contacto: dirección, teléfono, correo electrónico</li>
                  <li>• Información profesional relevante para el servicio jurídico</li>
                  <li>• Datos relacionados con la consulta o caso legal</li>
                </ul>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  4. Finalidad del Tratamiento
                </h2>
                <p className="mb-4 text-gray-700 text-justify">
                  Conforme al artículo 12 de la Ley 1581 de 2012, los datos personales serán tratados para:
                </p>
                <ul className="mb-4 space-y-2 text-gray-700 text-justify">
                  <li>• Prestación de servicios jurídicos especializados</li>
                  <li>• Comunicación directa con el cliente sobre su caso</li>
                  <li>• Cumplimiento de obligaciones legales del ejercicio profesional</li>
                  <li>• Archivo y gestión del expediente jurídico</li>
                  <li>• Mejora de nuestros servicios legales</li>
                  <li>• Envío de información relevante sobre desarrollos jurisprudenciales</li>
                </ul>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  5. Derechos del Titular (Ley 1581 de 2012)
                </h2>
                <p className="mb-4 text-gray-700 text-justify">
                  Como titular de los datos personales, conforme al artículo 8 de la Ley 1581 de 2012, usted tiene derecho a:
                </p>
                <ul className="mb-4 space-y-2 text-gray-700 text-justify">
                  <li>• Conocer, actualizar y rectificar sus datos personales</li>
                  <li>• Solicitar prueba de la autorización otorgada para el tratamiento</li>
                  <li>• Ser informado sobre el uso que se ha dado a sus datos personales</li>
                  <li>• Presentar quejas ante la Superintendencia de Industria y Comercio</li>
                  <li>• Revocar la autorización y/o solicitar la supresión del dato</li>
                  <li>• Acceder de forma gratuita a sus datos personales objeto de tratamiento</li>
                </ul>
                <p className="mb-4 text-gray-700 text-justify">
                  <strong>Nota:</strong> Para ejercer estos derechos, puede dirigirse a nuestras oficinas 
                  en horarios de atención o mediante los canales de contacto indicados en esta política.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  6. Base Jurídica y Normatividad
                </h2>
                <p className="mb-4 text-gray-700 text-justify">
                  El tratamiento de datos personales en López & Escobar Abogados se fundamenta en:
                </p>
                <ul className="mb-4 space-y-2 text-gray-700 text-justify">
                  <li>• <strong>Ley 1581 de 2012:</strong> Ley General de Protección de Datos Personales</li>
                  <li>• <strong>Decreto 1377 de 2013:</strong> Reglamentario de la Ley 1581 de 2012</li>
                  <li>• <strong>Ley 1266 de 2008:</strong> Disposiciones generales del hábeas data</li>
                  <li>• <strong>Ley 1273 de 2009:</strong> Protección de la información y de los datos</li>
                  <li>• <strong>Código de Procedimiento Civil:</strong> Confidencialidad profesional del abogado</li>
                </ul>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  7. Seguridad de los Datos
                </h2>
                <p className="mb-4 text-gray-700 text-justify">
                  Implementamos medidas técnicas y organizativas apropiadas para proteger 
                  sus datos personales contra el acceso no autorizado, la alteración, 
                  divulgación o destrucción, cumpliendo con los estándares establecidos 
                  en el Decreto 1377 de 2013.
                </p>
                <ul className="mb-4 space-y-2 text-gray-700 text-justify">
                  <li>• Cifrado de información sensible</li>
                  <li>• Control de acceso por personal autorizado</li>
                  <li>• Respaldos seguros de la información</li>
                  <li>• Protocolo de confidencialidad profesional</li>
                </ul>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  7. Contacto para Ejercicio de Derechos
                </h2>
                <p className="mb-4 text-gray-700 text-justify">
                  Para ejercer sus derechos como titular de datos personales o resolver 
                  dudas sobre esta política, puede contactarnos:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Oficina Principal</h4>
                    <div className="text-gray-700 space-y-1 text-justify">
                      <p>Calle 6 Norte No.17-33 Carrera 17 y 18</p>
                      <p>Barrio los Profesionales</p>
                      <p>Urbanización las Delicias</p>
                      <p>Armenia, Quindío - Colombia</p>
                      <p className="text-sm text-gray-600 mt-2">Visitas con cita previa</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Contacto Directo</h4>
                    <div className="text-gray-700 space-y-2 text-justify">
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
                  <div className="text-gray-700 text-justify">
                    <p><strong>Lunes - Viernes:</strong> 7:30 - 17:30</p>
                    <p><strong>Sábados:</strong> Cerrado</p>
                    <p><strong>Domingos:</strong> Cerrado</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  8. Actualizaciones de la Política
                </h2>
                <p className="text-gray-700 text-justify">
                  Esta política puede ser actualizada periódicamente para cumplir con 
                  cambios normativos o mejoras en nuestros procesos. Conforme al artículo 
                  13 de la Ley 1581 de 2012, se informará a los titulares sobre cualquier 
                  cambio sustancial. La fecha de la última actualización aparece al final 
                  de este documento.
                </p>
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
