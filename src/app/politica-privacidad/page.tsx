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
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold text-center">
                  POLÍTICA INSTITUCIONAL DE MANEJO DE INFORMACIÓN, TRATAMIENTO DE DATOS PERSONALES, PRIVACIDAD Y USO DE SERVICIOS
                </h2>
                <div className="mb-6 text-center text-gray-700">
                  <strong>López & Escobar Abogados Asociados S.A.S.</strong><br />
                  Nit 901.850.566-8
                </div>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-xl font-bold">
                  I. OBJETO
                </h2>
                <p className="mb-4 text-gray-700 text-justify">
                  Atendiendo lo dispuesto en el marco normativo colombiano en materia de protección de datos personales, particularmente la Ley 1581 de 2012; Decreto 1377 de 2013; y a cualquier norma que los sustituya o modifique la firma López & Escobar Abogados S.A.S., (la "Firma") en cumplimiento de las obligaciones legales que le asisten como responsable del tratamiento de datos personales y en consonancia con su compromiso ético y profesional, adopta la presente Política Integral de Información y Manejo de Datos Personales la cual tiene como propósito garantizar un tratamiento responsable, transparente y seguro de la información, así como establecer mecanismos adecuados para la atención de consultas, solicitudes y reclamos relacionados con el manejo de los datos personales en caso de que el Titular otorgue su autorización expresa, previa e informada.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-xl font-bold">
                  II. DEFINICIONES
                </h2>
                <p className="mb-4 text-gray-700 text-justify">
                  Conforme la Ley 1581 de 2012 y el Capítulo 25 del Decreto Único 1074 de 2005, para los efectos de la presente Política de Manejo de Datos y en aras de una mayor información para los usuarios, se puntualizan los siguientes conceptos:
                </p>
                <ul className="mb-4 space-y-3 text-gray-700 text-justify">
                  <li><strong>Autorización:</strong> Consentimiento previo, expreso e informado del titular para llevar a cabo el Tratamiento de datos personales.</li>
                  <li><strong>Aviso De Privacidad:</strong> Comunicación verbal o escrita generada por el responsable, dirigida al titular para el tratamiento de sus datos personales y mediante la cual se le informa de manera clara y suficiente sobre la existencia de las políticas de tratamiento de información aplicables, los mecanismos dispuestos para su consulta y las finalidades específicas que se atribuirán al tratamiento de sus datos personales.</li>
                  <li><strong>Base De Datos:</strong> Conjunto organizado de datos personales que sean objeto de tratamiento, cualquiera que fuere la modalidad de su formación, almacenamiento, organización y acceso.</li>
                  <li><strong>Dato Personal:</strong> Cualquier información vinculada o que pueda asociarse a una o varias personas naturales o jurídicas determinadas o determinables.</li>
                  <li><strong>Dato Público:</strong> Es el dato que no sea semiprivado, privado o sensible al cual se puede acceder libremente. Son considerados datos públicos, entre otros, los datos relativos al estado civil de las personas, a su profesión u oficio y a su calidad de comerciante o de servidor público. Por su naturaleza, los datos públicos pueden estar contenidos, entre otros, en registros públicos, documentos públicos, gacetas y boletines oficiales y sentencias judiciales debidamente ejecutoriadas que no estén sometidas a reserva.</li>
                  <li><strong>Dato Sensible:</strong> Se entiende por datos sensibles aquellos que afectan la Intimidad del Titular o cuyo uso indebido puede generar su discriminación, tales como aquellos que revelen el origen racial o étnico, la orientación política, las convicciones religiosas o filosóficas, la pertenencia a sindicatos, organizaciones sociales, de derechos humanos o que promueva intereses de cualquier partido político o que garanticen los derechos y garantías de partidos políticos de oposición, así como los datos relativos a la salud, a la vida sexual, y los datos biométricos.</li>
                  <li><strong>Encargado Del Tratamiento:</strong> Persona natural o jurídica, pública o privada, que por sí misma o en asocio con otros, realice el Tratamiento de datos personales por cuenta del responsable del Tratamiento.</li>
                  <li><strong>Responsable Del Tratamiento:</strong> Persona natural o jurídica, pública o privada, que por sí misma o en asocio con otros, decida sobre la base de datos y/o el Tratamiento de los datos personales.</li>
                  <li><strong>Titular:</strong> Persona natural o jurídica cuyos datos personales sean objeto de Tratamiento.</li>
                  <li><strong>Tratamiento:</strong> Cualquier operación o conjunto de operaciones sobre datos personales, tales como la recolección, almacenamiento, uso, modificación, circulación o supresión.</li>
                  <li><strong>Transferencia:</strong> Actividad realizada cuando el responsable y/o Encargado del Tratamiento de datos personales, ubicado en Colombia, envía la información o los datos personales a un receptor, que a su vez es Responsable del Tratamiento y se encuentra dentro o fuera del país.</li>
                  <li><strong>Transmisión:</strong> Tratamiento de datos personales que implica la comunicación de los mismos dentro o fuera del territorio de la República de Colombia cuando tenga por objeto la realización de un Tratamiento por el Encargado por cuenta del responsable.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-xl font-bold">
                  III. PRINCIPIOS RECTORES
                </h2>
                <p className="mb-4 text-gray-700 text-justify">
                  En el marco de nuestras actividades profesionales y administrativas, la Firma adelantará la recolección, uso, almacenamiento, transmisión, transferencia y, en general, el tratamiento de los datos personales de los titulares, de conformidad con las finalidades previstas en la presente Política.
                </p>
                <p className="mb-4 text-gray-700 text-justify">
                  Todo tratamiento de datos personales efectuado por la Firma, sus responsables, encargados o por terceros a quienes se transfiera la información, deberá ajustarse estrictamente a los principios y reglas establecidos en la Ley 1581 de 2012, sus decretos reglamentarios y en este instrumento, con el fin de garantizar el derecho fundamental al hábeas data y asegurar el cumplimiento de los lineamientos internos de la organización bajo los siguientes principios rectores del tratamiento de datos personales:
                </p>
                <ul className="mb-4 space-y-3 text-gray-700 text-justify">
                  <li><strong>Legalidad y finalidad legítima:</strong> Todo tratamiento de datos personales se sujetará a las disposiciones legales vigentes y deberá perseguir propósitos legítimos, previamente informados al titular.</li>
                  <li><strong>Libertad y consentimiento informado:</strong> El tratamiento de datos personales solo podrá realizarse con la autorización previa, expresa e informada del titular, salvo las excepciones previstas en la ley. En los casos en que la información haya sido recolectada antes de la entrada en vigor del Decreto 1377 de 2013, la Firma implementará mecanismos idóneos para obtener dicha autorización retroactiva.</li>
                  <li><strong>Finalidad autorizada:</strong> Todo tratamiento deberá responder a las finalidades previstas en esta Política, en la autorización otorgada por el titular o en los documentos específicos que regulen cada proceso. Está prohibido el uso de los datos personales con fines distintos a los informados y autorizados.</li>
                  <li><strong>Veracidad y actualización:</strong> Los datos personales deberán ser veraces, completos, exactos, actualizados, comprobables y comprensibles. La Firma se abstendrá de tratar información parcial, fraccionada o que induzca a error, salvo que el titular la complemente o corrija.</li>
                  <li><strong>Transparencia:</strong> Los titulares tendrán derecho a obtener información clara y suficiente sobre el tratamiento que se dé a sus datos personales, en cualquier momento y sin restricciones.</li>
                  <li><strong>Acceso y circulación restringida:</strong> El acceso y tratamiento de los datos personales estará limitado exclusivamente al personal autorizado de la Firma y a quienes, por la naturaleza de sus funciones, deban manejar dicha información. No podrán hacerse disponibles en medios masivos, salvo que se cuente con protocolos de seguridad que garanticen su restricción a usuarios autorizados.</li>
                  <li><strong>Acceso del titular:</strong> Cuando lo solicite, el titular tendrá derecho a conocer la existencia de los datos que le conciernen. La dependencia designada para la protección de datos en la Firma será la encargada de responder tales solicitudes.</li>
                  <li><strong>Temporalidad:</strong> La conservación y uso de los datos personales se limitará al tiempo estrictamente necesario para cumplir con la finalidad informada al titular.</li>
                  <li><strong>Seguridad informática y confidencialidad profesional:</strong> La Firma adoptará medidas técnicas, humanas y administrativas para proteger los datos personales contra accesos no autorizados, pérdidas, alteraciones o usos indebidos, preservando en todo momento la confidencialidad de la información, conforme al deber de secreto profesional.</li>
                  <li><strong>Confidencialidad:</strong> Todo tratamiento se realizará bajo criterios de reserva profesional, evitando que la información sea adulterada, modificada, consultada, usada o divulgada por personas no autorizadas. Todo proyecto que involucre tratamiento de datos deberá referirse expresamente a esta Política.</li>
                  <li><strong>Tratamiento posterior:</strong> Los datos personales que no tengan la calidad de públicos conservarán su carácter confidencial incluso después de terminada la relación contractual o vínculo con el titular.</li>
                  <li><strong>Separación de bases de datos:</strong> La Firma garantizará la individualidad de las bases de datos en las que actúe como responsable respecto de aquellas en las que tenga la calidad de encargado.</li>
                  <li><strong>Principio de necesidad:</strong> La recolección y tratamiento de datos personales se limitará a aquellos estrictamente necesarios para el cumplimiento de las finalidades previstas en la Ley y en esta Política, evitando la obtención de información irrelevante o excesiva.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-xl font-bold">
                  VI. CONSULTAS
                </h2>
                <p className="mb-4 text-gray-700 text-justify">
                  La presente política y los derechos básicos que los titulares de los datos tienen en relación con la misma podrán ser consultados a través de los siguientes medios:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Canales de Atención</h4>
                    <ul className="text-gray-700 space-y-2 text-justify">
                      <li>• <strong>Personalmente:</strong> Calle 6 Norte No.17-33 Carrera 17 y 18, Barrio los Profesionales, Armenia, Quindío</li>
                      <li>• <strong>Correo electrónico:</strong> mescobarm@lopezyescobarabogados.com</li>
                      <li>• <strong>Teléfono:</strong> 300 4308692 / 311 3835833</li>
                      <li>• <strong>Página web:</strong> www.lopezyescobarabogados.com</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Horarios de Atención</h4>
                    <div className="text-gray-700 space-y-2 text-justify">
                      <p><strong>Lunes - Viernes:</strong> 7:30-13:00/14:00-17:30</p>
                      <p><strong>Sábados y Domingos:</strong> Cerrado</p>
                      <p className="text-sm text-gray-600">Visitas con cita previa</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-xl font-bold">
                  VII. VIGENCIA
                </h2>
                <p className="mb-4 text-gray-700 text-justify">
                  La presente política rige a partir de la fecha de su publicación y deja sin efectos las demás disposiciones institucionales que le sean contrarias. Toda información no contemplada en la presente política, se reglamentará de acuerdo al Régimen General de Protección de Datos Personales vigente en Colombia.
                </p>
                <p className="mb-4 text-gray-700 text-justify">
                  La actualización de la Políticas de Protección de Datos Personales dependerá de las instrucciones y lineamientos de la Dirección Ejecutiva de la Firma, así como de las extensiones reglamentarias del ente de vigilancia y control, la Superintendencia de Industria y Comercio.
                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-xl font-bold">
                  VIII. PUBLICACIÓN
                </h2>
                <p className="text-gray-700 text-justify">
                  Esta política ha sido publicada y actualizada en el mes de agosto del año 2025.
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
