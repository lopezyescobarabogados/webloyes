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
                POLÍTICA INSTITUCIONAL DE MANEJO DE INFORMACIÓN, TRATAMIENTO DE TRATAMIENTO DE DATOS PERSONALES, PRIVACIDAD Y USO DE SERVICIOS

              </h1>
              <p className="text-lg text-gray-600 sm:text-xl">
                López & Escobar Abogados Asociados S.A.S.Nit 901168856-8

              </p>
            </div>

            <div className="space-y-8 rounded-2xl bg-white p-8 shadow-lg">
              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  I. OBJETO

                </h2>
                <p className="mb-4 text-gray-700">
                  Atendiendo lo dispuesto en el marco normativo colombiano en 
                  materia de protección de datos personales, particularmente 
                  la Ley 1581 de 2012; Decreto 1377 de 2013; y a cualquier norma 
                  que los sustituya o modifique la firma <strong>López & Escobar Abogados S.A.S.</strong>
                  , (la “Firma”) en cumplimiento de las obligaciones legales que le asisten 
                  como responsable del tratamiento de datos personales y en consonancia con 
                  su compromiso ético y profesional, adopta la presente Política Integral de
                  Información y Manejo de Datos Personales la cual tiene como propósito 
                  garantizar un tratamiento responsable, transparente y seguro de la 
                  información, así como establecer mecanismos adecuados para la atención de consultas,
                  solicitudes y reclamos relacionados con el manejo de los datos personales en caso 
                  de que el Titular otorgue su autorización expresa, previa e informada.

                </p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  II. DEFINICIONES

                </h2>
                <div className="mb-4 text-gray-700">
                  <p>
                    Conforme la Ley 1581 de 2012 y el Capítulo 25 del Decreto Único 1074 de 2005,
                    para los efectos de la presente Política de Manejo de Datos y en aras de una 
                    mayor información para los usuarios, se puntualizan los siguientes conceptos:
                  </p><br />
                  <strong>-	Autorización:</strong><br />
                  <p>
                    Consentimiento previo, expreso e informado del titular para llevar a cabo el 
                    Tratamiento de datos personales.
                  </p><br />
                  <strong>-	Aviso De Privacidad:</strong><br />
                  <p>
                    Comunicación verbal o escrita generada por el responsable, dirigida al titular
                    para el tratamiento de sus datos personales y mediante la cual se le informa 
                    de manera clara y suficiente sobre la existencia de las políticas de tratamiento
                    de información aplicables, los mecanismos dispuestos para su consulta y las 
                    finalidades específicas que se atribuirán al tratamiento de sus datos personales.
                  </p><br />
                  <strong>-	Base De Datos:</strong><br />
                  <p>
                    Conjunto organizado de datos personales que sean objeto de tratamiento, cualquiera
                    que fuere la modalidad de su formación, almacenamiento, organización y acceso.
                  </p><br />
                  <strong>-	Dato Personal:</strong><br />
                  <p>
                    Cualquier información vinculada o que pueda asociarse a una o varias personas 
                    naturales o jurídicas determinadas o determinables.
                  </p><br />
                  <strong>-	Dato Público:</strong><br />
                  <p>
                    Es el dato que no sea semiprivado, privado o sensible al cual se puede acceder 
                    libremente. Son considerados datos públicos, entre otros, los datos relativos 
                    al estado civil de las personas, a su profesión u oficio y a su calidad de comerciante
                    o de servidor público. Por su naturaleza, los datos públicos pueden estar contenidos, 
                    entre otros, en registros públicos, documentos públicos, gacetas y boletines oficiales 
                    y sentencias judiciales debidamente ejecutoriadas que no estén sometidas a reserva.
                  </p><br />
                  <strong>-	Dato Sensible:</strong><br />
                  <p>
                    Se entiende por datos sensibles aquellos que afectan la Intimidad del Titular o cuyo uso 
                    indebido puede generar su discriminación, tales como aquellos que revelen el origen racial 
                    o étnico, la orientación política, las convicciones religiosas o filosóficas, la pertenencia 
                    a sindicatos, organizaciones sociales, de derechos humanos o que promueva intereses de cualquier 
                    partido político o que garanticen los derechos y garantías de partidos políticos de oposición, 
                    así como los datos relativos a la salud, a la vida sexual, y los datos biométricos.
                  </p><br />
                  <strong>-	Encargado Del Tratamiento:</strong><br />
                  <p>
                    Persona natural o jurídica, pública o privada, que por sí misma o en asocio con otros, realice 
                    el Tratamiento de datos personales por cuenta del responsable del Tratamiento.
                  </p><br />
                  <strong>-	Responsable Del Tratamiento:</strong><br />
                  <p>
                    Persona natural o jurídica, pública o privada, que por sí misma o en asocio con otros, decida 
                    sobre la base de datos y/o el Tratamiento de los datos personales.
                  </p><br />
                  <strong>-	Titular:</strong><br />
                  <p>
                    Persona natural o jurídica cuyos datos personales sean objeto de Tratamiento.
                  </p><br />
                  <strong>-	Tratamiento:</strong><br />
                  <p>
                    Cualquier operación o conjunto de operaciones sobre datos personales, 
                    tales como la recolección, almacenamiento, uso, modificación, circulación o supresión.
                  </p><br />
                  <strong>-	Transferencia:</strong><br />
                  <p>
                    Actividad realizada cuando el responsable y/o Encargado del Tratamiento de datos personales, 
                    ubicado en Colombia, envía la información o los datos personales a un receptor, que a su vez 
                    es Responsable del Tratamiento y se encuentra dentro o fuera del país.
                  </p><br />
                  <strong>-	Transmisión:</strong><br />
                  <p>
                    Tratamiento de datos personales que implica la comunicación de los mismos dentro o fuera del 
                    territorio de la República de Colombia cuando tenga por objeto la realización de un Tratamiento 
                    por el Encargado por cuenta del responsable.
                  </p><br />
                </div>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  III.	PRINCIPIOS RECTORES
                </h2>
                <article className='mb-6'>
                  <p>
                    En el marco de nuestras actividades profesionales y administrativas, 
                    la Firma adelantará la recolección, uso, almacenamiento, transmisión, 
                    transferencia y, en general, el tratamiento de los datos personales de 
                    los titulares, de conformidad con las finalidades previstas en la presente Política.
                  </p><br />
                  <p>
                    Todo tratamiento de datos personales efectuado por la Firma, sus responsables, encargados 
                    o por terceros a quienes se transfiera la información, deberá ajustarse estrictamente a 
                    los principios y reglas establecidos en la Ley 1581 de 2012, sus decretos reglamentarios y 
                    en este instrumento, con el fin de garantizar el derecho fundamental al hábeas data y asegurar 
                    el cumplimiento de los lineamientos internos de la organización bajo los siguientes principios 
                    rectores del tratamiento de datos personales:
                  </p><br />
                </article>
                <strong>-	Legalidad y finalidad legítima:</strong><br />
                <p>
                  Todo tratamiento de datos personales se sujetará a las disposiciones legales vigentes y deberá 
                  perseguir propósitos legítimos, previamente informados al titular.
                </p><br />
                <strong>-	Libertad y consentimiento informado:</strong><br />
                <p>
                  El tratamiento de datos personales solo podrá realizarse con la autorización previa, expresa 
                  e informada del titular, salvo las excepciones previstas en la ley. En los casos en que la 
                  información haya sido recolectada antes de la entrada en vigor del Decreto 1377 de 2013, la 
                  Firma implementará mecanismos idóneos para obtener dicha autorización retroactiva.
                </p><br />
                <strong>-	Finalidad autorizada:</strong><br />
                <p>
                  Todo tratamiento deberá responder a las finalidades previstas en esta Política, en la autorización 
                  otorgada por el titular o en los documentos específicos que regulen cada proceso. Está prohibido 
                  el uso de los datos personales con fines distintos a los informados y autorizados.
                </p><br />
                <strong>-	Veracidad y actualización:</strong><br />
                <p>
                  Los datos personales deberán ser veraces, completos, exactos, actualizados, comprobables y 
                  comprensibles. La Firma se abstendrá de tratar información parcial, fraccionada o que induzca a 
                  error, salvo que el titular la complemente o corrija.
                </p><br />
                <strong>-	Transparencia:</strong><br />
                <p>
                  Los titulares tendrán derecho a obtener información clara y suficiente sobre el tratamiento que 
                  se dé a sus datos personales, en cualquier momento y sin restricciones.
                </p><br />
                <strong>-	Acceso y circulación restringida:</strong><br />
                <p>
                  El acceso y tratamiento de los datos personales estará limitado exclusivamente al personal 
                  autorizado de la Firma y a quienes, por la naturaleza de sus funciones, deban manejar dicha 
                  información. No podrán hacerse disponibles en medios masivos, salvo que se cuente con protocolos 
                  de seguridad que garanticen su restricción a usuarios autorizados.
                </p><br />
                <strong>-	Acceso del titular:</strong><br />
                <p>
                  Cuando lo solicite, el titular tendrá derecho a conocer la existencia de los datos que le conciernen. 
                  La dependencia designada para la protección de datos en la Firma será la encargada de responder tales solicitudes.
                </p><br />
                <strong>-	Temporalidad:</strong><br />
                <p>
                  La conservación y uso de los datos personales se limitará al tiempo estrictamente necesario para 
                  cumplir con la finalidad informada al titular.
                </p><br />
                <strong>-	Seguridad informática y confidencialidad profesional:</strong><br />
                <p>
                  La Firma adoptará medidas técnicas, humanas y administrativas para proteger los datos personales contra accesos no autorizados, 
                  pérdidas, alteraciones o usos indebidos, preservando en todo momento la confidencialidad de la información, conforme al deber 
                  de secreto profesional.
                </p><br />
                <strong>-	Confidencialidad:</strong><br />
                <p>
                  Todo tratamiento se realizará bajo criterios de reserva profesional, evitando que la información sea adulterada, modificada, 
                  consultada, usada o divulgada por personas no autorizadas. Todo proyecto que involucre tratamiento de datos deberá referirse 
                  expresamente a esta Política.
                </p><br />
                <strong>-	Tratamiento posterior:</strong><br />
                <p>
                  Los datos personales que no tengan la calidad de públicos conservarán su carácter confidencial incluso después de terminada 
                  la relación contractual o vínculo con el titular.
                </p><br />
                <strong>-	Separación de bases de datos:</strong><br />
                <p>
                  La Firma garantizará la individualidad de las bases de datos en las que actúe como responsable respecto de aquellas en las 
                  que tenga la calidad de encargado.
                </p><br />
                <strong>-	Principio de necesidad:</strong><br />
                <p>
                  La recolección y tratamiento de datos personales se limitará a aquellos estrictamente necesarios para el cumplimiento de las 
                  finalidades previstas en la Ley y en esta Política, evitando la obtención de información irrelevante o excesiva.
                </p><br />
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  IV.	TRATAMIENTO DE DATOS PERSONALES
                </h2><br />
                <h3 className="text-navy mb-4 font-serif font-bold">
                  IV.1.	Tratamiento de Datos Personales de niñas, niños y/o adolescentes. 
                </h3><br />
                <p>
                  La Firma únicamente llevará a cabo el tratamiento de datos personales de personas menores de 18 años 
                  cuando cuente con la autorización previa, expresa e informada de sus padres o representantes. En cualquier 
                  momento, estos podrán modificar o revocar dicha autorización conforme a lo dispuesto en la presente Política. 
                  En el caso de niñas, niños y adolescentes, el tratamiento de su información se regirá por los siguientes 
                  lineamientos:
                </p><br />
                <strong>-	Interés superior del menor:</strong><br />
                <p>
                  Toda actividad de tratamiento deberá estar orientada a proteger y garantizar el bienestar integral de los menores.
                </p><br />
                <strong>-	Respeto de derechos fundamentales:</strong><br />
                <p>
                  El manejo de los datos asegurará la salvaguarda de los derechos constitucionales, prevalentes frente a cualquier otro interés.
                </p><br />
                <strong>-	Participación del menor:</strong><br />
                <p>
                  La opinión del niño, niña o adolescente será tenida en cuenta, considerando su nivel de madurez, autonomía y capacidad de comprensión 
                  respecto del tema objeto de tratamiento.
                </p><br />
                <h3 className="text-navy mb-4 font-serif font-bold">
                  IV.2.	Tratamiento de Datos Sensibles. 
                </h3><br />
                <p>
                  La Firma podrá solicitar y tratar datos sensibles, siempre que estos se encuentren expresamente señalados en la respectiva autorización 
                  otorgada por el titular. En cumplimiento de la Ley 1581 de 2012 y demás disposiciones aplicables, el tratamiento de esta categoría de datos 
                  estará sujeto a las siguientes reglas:
                </p><br />
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li><strong>a.</strong> Autorización expresa: El tratamiento de datos sensibles solo procederá con el consentimiento previo, informado y expreso del titular, salvo en los supuestos en los que la ley autorice su uso sin necesidad de dicha autorización.</li><br />
                  <li><strong>b.</strong> Información clara al titular: En el momento de la recolección, la Firma informará al titular cuáles de sus datos tienen la calidad de sensibles, las finalidades específicas para su tratamiento y los derechos que le asisten en esta materia.</li><br />
                  <li><strong>c.</strong> Prohibición de condicionamiento: En ningún caso se condicionará la prestación de servicios, actividades o beneficios a la entrega de datos sensibles, salvo que exista una obligación legal o contractual que así lo requiera.</li><br />
                  <li><strong>d.</strong> Estándares de protección: Los datos sensibles serán tratados con los más altos niveles de seguridad, confidencialidad y diligencia, implementando medidas técnicas, administrativas y jurídicas adecuadas para evitar accesos no autorizados, adulteraciones o usos indebidos.</li><br />
                  <li><strong>e.</strong> Acceso restringido: Solo el personal autorizado y estrictamente necesario para cumplir con las finalidades del tratamiento podrá acceder a este tipo de información, bajo protocolos de reserva y confidencialidad reforzada.</li><br />
                </ul>
                 <h3 className="text-navy mb-4 font-serif font-bold">
                  IV.3.	Casos en que No se Requiere Autorización. 
                </h3><br />
                <p>
                  La Firma no requerirá la autorización del Titular de la información, cuando se trate de:
                </p><br />
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li>-	Información sea solicitada por una entidad pública o administrativa que esté actuando en ejercicio de sus funciones legales o por orden judicial.</li><br />
                  <li>-	Cuando se trate de datos de naturaleza pública debido a que éstos no son protegidos por el ámbito de aplicación de la norma.</li><br />
                  <li>-	Eventos de urgencia médica o sanitaria debidamente comprobadas.</li><br />
                  <li>-	En aquellos eventos donde la información sea autorizada por la ley para cumplir con fines históricos, estadísticos y científicos.</li><br />
                </ul>
                <h3 className="text-navy mb-4 font-serif font-bold">
                  IV.4.	Finalidades del tratamiento. 
                </h3><br />
                <p>
                  El tratamiento de los datos personales por parte de la Firma se realizará únicamente para las finalidades informadas al momento 
                  de su recolección y previamente consentidas por el titular. De igual forma, los encargados o terceros que, en virtud de la ley 
                  o de un contrato, tengan acceso a la información deberán ceñirse estrictamente a los usos autorizados y aquí descritos.
                </p><br />
                <p>
                  En particular, los datos personales serán tratados para las siguientes finalidades:
                </p><br />
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li>-	Cumplimiento normativo y obligaciones corporativas: Gestionar la información necesaria para el cumplimiento de deberes tributarios, contables, comerciales y corporativos de la Firma</li><br />
                  <li>-	Administración de relaciones contractuales: Ejecutar procesos internos relacionados con la gestión de clientes, contratistas y empleados.</li><br />
                  <li>-	Prestación de servicios jurídicos: Atender las necesidades particulares de los clientes en el marco de los contratos celebrados, lo que incluye la verificación de afiliaciones, derechos y condiciones de los individuos objeto del servicio, así como el uso de datos para actividades de mercadeo, promoción o comercialización de nuevos servicios profesionales.</li><br />
                  <li>-	Prevención de riesgos y actividades ilícitas: Desarrollar acciones de control y mitigación de riesgos relacionados con el fraude, la corrupción, el lavado de activos, la financiación del terrorismo o de armas de destrucción masiva, lo cual incluye la verificación en listas restrictivas, vinculantes o públicas, tanto nacionales como internacionales.</li><br />
                  <li>-	Videos de vigilancia. Proporcionar espacios de seguridad y privacidad a nuestros titulares y proteger los bienes de la Firma. Asimismo, la información recolectada podrá ser usada como prueba ante cualquier autoridad, de acuerdo con la regulación aplicable.</li><br />
                  <li>-	Cumplimiento de requerimientos de autoridad: Atender solicitudes formales de autoridades administrativas, judiciales, de control o de policía, tanto nacionales como extranjeras, en los casos en que exista una obligación legal o reglamentaria.</li><br />
                  <li>-	Protección de derechos e intereses legítimos: Usar o revelar datos personales con el fin de proteger los derechos y bienes de la Firma, de sus clientes o de sus usuarios, incluyendo la detección y prevención de fraudes o conductas criminales.</li><br />
                  <li>-	Procesos de auditoría: Permitir el acceso a los datos personales a auditores internos o externos, así como a terceros contratados, en el marco de procesos de verificación y control propios de la actividad profesional de la Firma.</li><br />
                  <li>-	Gestión documental y custodia de información: Ejecutar procesos de archivo, actualización de sistemas, protección, custodia y administración de bases de datos.</li><br />
                  <li>-	Gestión tecnológica y operativa: Realizar actividades de desarrollo, mantenimiento y administración de los sistemas internos de la Firma, necesarias para garantizar la continuidad de sus operaciones.</li><br />
                  <li>-	Transmisión y transferencia de información: Compartir datos personales con terceros con los cuales se hayan celebrado contratos para fines comerciales, administrativos, de mercadeo y/o operativos, incluyendo la expedición de carnés, certificaciones personalizadas y documentos equivalentes, en estricto cumplimiento de las disposiciones legales.</li><br />
                  <li>-	Procesamiento de información para la prestación de servicios: Mantener, sistematizar y procesar información vinculada con los negocios de los clientes, con el propósito de brindar los servicios jurídicos contratados de manera eficaz.</li><br />
                  <li>-	Establecer comunicación directa por diferentes medios (físico, telefónico, SMS, WhatsApp, correos electrónicos, página web, etc.) con los objetivos comerciales asociados a servicios.</li><br />
                  <li>-	Otras finalidades legítimas: Atender cualquier finalidad adicional que sea determinada en procesos específicos de recolección de datos personales, siempre que se enmarque dentro de las obligaciones legales, regulatorias o de las políticas internas de la Firma.</li><br />
                </ul>
                <h3 className="text-navy mb-4 font-serif font-bold">
                  IV.5.	Obligaciones de la Firma como responsable del tratamiento. 
                </h3><br />
                <p>
                  Cuando la Firma actúe en calidad de responsable del Tratamiento, asumirá los siguientes deberes y compromisos:
                </p><br />
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li><strong>a.</strong>	Autorización previa: Obtener la autorización previa, expresa e informada del titular en todos los casos en que la normativa aplicable así lo exija, y conservar prueba de dicha autorización.</li><br />
                  <li><strong>b.</strong>	Clasificación y custodia: Clasificar adecuadamente los datos solicitados y archivar las autorizaciones otorgadas, garantizando su conservación bajo condiciones de seguridad y confidencialidad.</li><br />
                  <li><strong>c.</strong>	Transparencia en la información: Informar de manera clara y expresa a clientes, trabajadores, proveedores, contratistas y terceros el tratamiento al cual serán sometidos sus datos, así como las finalidades específicas de dicho tratamiento. Para ello podrá emplear medios físicos, electrónicos o digitales, incluyendo correo electrónico y otros que en el futuro se adopten.</li><br />
                  <li><strong>d.</strong>	Derechos del titular: Comunicar a los titulares los derechos que les asisten conforme a la Ley 1581 de 2012 y garantizar su pleno y efectivo ejercicio, en especial el derecho a conocer, actualizar, rectificar y suprimir sus datos, así como a presentar consultas, quejas o reclamos.</li><br />
                  <li><strong>e.</strong>	Atención de solicitudes: Dar trámite oportuno a las consultas, peticiones, quejas o reclamos presentados por los titulares o sus representantes, de acuerdo con los plazos y requisitos establecidos por la normativa vigente.</li><br />
                  <li><strong>f.</strong>	Seguridad de la información: Adoptar medidas técnicas, humanas y administrativas necesarias para asegurar los datos personales contra el acceso no autorizado, la pérdida, alteración, uso indebido, fraude o deterioro, implementando controles periódicos de actualización y verificación.</li><br />
                  <li><strong>g.</strong>	Datos sensibles: Informar expresamente al titular cuando se soliciten datos sensibles, advirtiendo que no está obligado a autorizarlos, salvo los casos previstos en la Ley.</li><br />
                  <li><strong>h.</strong>	Responsabilidad compartida: Informar la identificación, dirección electrónica y demás datos de contacto del área o persona encargada del tratamiento de datos personales dentro de la Firma, a fin de garantizar el acceso a la atención de consultas y reclamos.</li><br />
                  <li><strong>i.</strong>	Contraseñas y accesos: Advertir a los titulares que son responsables de la custodia de sus contraseñas o accesos creados en sistemas de la Firma, debiendo notificar de inmediato cualquier uso no autorizado o vulneración de seguridad.</li><br />
                  <li><strong>j.</strong>	Principios rectores: Cumplir con los principios de legalidad, finalidad legítima, libertad, veracidad, transparencia, seguridad, confidencialidad, circulación restringida, necesidad y temporalidad, en todo proceso de tratamiento de datos personales adelantado por la Firma.</li><br />
                </ul>
                <h3 className="text-navy mb-4 font-serif font-bold">
                  IV.6.	Derechos del titular de los datos personales. 
                </h3><br />
                <p>
                  Los titulares de los datos personales cuyo tratamiento esté a cargo de la Firma tienen, de conformidad con la Constitución Política de Colombia, la Ley 1581 de 2012 y el Decreto 1377 de 2013, los siguientes derechos:
                </p><br />
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li>-	Derecho de actualización, rectificación y supresión: Conocer, actualizar y rectificar sus datos personales frente a la Firma o los Encargados del Tratamiento, en especial cuando sean parciales, inexactos, incompletos, fraccionados, induzcan a error, o cuando su tratamiento esté prohibido o no haya sido autorizado.</li><br />
                  <li>-	Derecho de prueba: Solicitar en cualquier momento prueba de la autorización otorgada a la Firma para el tratamiento de sus datos personales, salvo cuando expresamente se exceptúe como requisito conforme al artículo 10 de la Ley 1581 de 2012 y demás disposiciones concordantes.</li><br />
                  <li>-	Derecho de información: Ser informado, previa solicitud, respecto del uso que se ha dado a sus datos personales por parte de la Firma o de los Encargados del Tratamiento.</li><br />
                  <li>-	Derecho de quejas y reclamos: Presentar consultas, peticiones, quejas o reclamos ante la Firma en relación con el tratamiento de sus datos. Así mismo, acudir ante la Superintendencia de Industria y Comercio una vez agotado el trámite interno, para denunciar posibles infracciones a la normativa de protección de datos personales.</li><br />
                  <li>-	Derecho de revocación: Revocar la autorización otorgada y/o solicitar la supresión de sus datos personales de las bases de datos de la Firma cuando la Superintendencia de Industria y Comercio haya establecido mediante acto administrativo definitivo que en el tratamiento se han vulnerado disposiciones legales, o cuando no exista una obligación legal o contractual que justifique su conservación.</li><br />
                  <li>-	Derecho de acceso gratuito: Acceder de forma gratuita a sus datos personales objeto de tratamiento, conforme al artículo 21 del Decreto 1377 de 2013.</li><br />
                  <li>-	Derecho de conocimiento y notificación: Conocer las modificaciones a esta Política antes de su implementación y acceder a la información sobre el área o persona designada por la Firma para la atención de consultas, quejas o reclamos.</li><br />
                  <li>-	Derecho de supresión: Solicitar la eliminación de sus datos personales de las bases de datos de la Firma, siempre que no exista un deber legal o contractual que obligue a su conservación.</li><br />
                  <li>-	Derecho a la seguridad y custodia: Exigir que sus datos personales sean conservados y archivados de manera segura y confiable, con observancia de protocolos de confidencialidad y medidas de seguridad adecuadas.</li><br />
                  <li>-	Derecho a la transparencia y a la consulta: Recibir, a través de los medios dispuestos por la Firma (correo electrónico, comunicaciones escritas, mensajes electrónicos o cualquier otro medio idóneo), información clara y suficiente sobre las políticas de tratamiento de datos y los mecanismos para ejercer sus derechos.</li><br />
                </ul>
                <p>Los titulares podrán ejercer sus derechos mediante la presentación de su documento de identidad o copia del mismo. En el caso de menores de edad, podrán hacerlo directamente o a través de sus padres o representantes legales, quienes deberán acreditar su calidad mediante la documentación correspondiente. Igualmente, podrán ejercer estos derechos los causahabientes que acrediten dicha condición, así como representantes o apoderados debidamente facultados.</p>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  V.	PROCEDIMIENTO CONSULTAS, SOLICITUDES Y PETICIONES 
                </h2>
                <p>
                  Todo titular de datos personales que estén bajo responsabilidad de la Firma tiene derecho a realizar 
                  consultas y elevar solicitudes a la empresa respecto al manejo y tratamiento dado a su información.
                </p><br />
                <p>
                  Toda solicitud, consulta, petición, queja, reclamo, solicitudes (PQRS) que sea presentada a la Firma 
                  por parte de cualquier titular o sus causahabientes respecto al manejo y tratamiento dado a su información 
                  será resuelta de conformidad con la ley regulatoria al derecho al habeas data y será tramitado bajo la normatividad 
                  vigente para el caso.
                </p><br />
                <h3 className="text-navy mb-4 font-serif font-bold">
                  V.1.	Mecanismos.
                </h3><br />
                <p>
                  La Firma dispondrá de mecanismos para que formulen consultas respecto de cuáles son los Datos Personales del Titular que reposan en las Bases de Datos de la Firma.
                </p><br />
                <p>
                  Estos mecanismos podrán ser físicos como página web https://lopezyescobarabogados.com, electrónicos a través del correo mescobarm@lopezyescobarabogados.com o telefónicamente en la línea de atención 300 4308692.
                </p><br />
                <p>
                  Cualquiera que sea el medio, la Firma guardará prueba de la consulta y su respuesta.
                </p><br />
                <p>
                  En consecuencia, los siguientes son los pasos a seguir para la presentación de consultas:
                </p><br />
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li><strong>1.</strong>	Las solicitudes se deberán formular por escrito.</li><br />
                  <li><strong>2.</strong>	La solicitud será analizada para verificar la identificación del Titular. Si la solicitud es formulada por persona distinta del Titular y no se acredite que la misma actúa en representación de aquél de conformidad con las leyes vigentes, la solicitud será rechazada. Para ello la Firma puede solicitar el documento de identificación del Titular o copia del mismo, y los poderes especiales, generales o documentos que se exijan según sea el caso.</li><br />
                  <li><strong>3.</strong>	Si el solicitante tuviere capacidad para formular la consulta, de conformidad con los criterios de acreditación establecidos en la Ley 1581 de 2012 y el Decreto 1377 de 2013, la Firma recopilará toda la información sobre el Titular que esté contenida en el registro individual de esa persona o que esté vinculada con la identificación del Titular dentro de las Bases de Datos de la Firma.</li><br />
                  <li><strong>4.</strong>	La persona asignada para atender la consulta dará respuesta dentro de los quince (15) días hábiles contados a partir de la fecha en la que la solicitud fue recibida por la Firma.</li><br />
                  <li><strong>5.</strong>	En todo caso, la respuesta definitiva a todas las solicitudes no tardará más de quince (15) días hábiles desde la fecha en la que la solicitud inicial fue recibida por la Firma.</li><br />
                </ul>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  VI.	CONSULTAS
                </h2>
                <p>
                  La presente política y los derechos básicos que los titulares de los datos tienen en relación con la misma podrán ser consultados a través de los siguientes medios:
                </p><br />
                <ul className="mb-4 space-y-2 text-gray-700">
                  <li>-	Personalmente ante nuestras oficinas de atención al público Calle 6 Norte #17-33 Barrio Profesionales Armenia Quindío</li><br />
                  <li>-	Vía correo electrónico: mescobarm@lopezyescobarabogados.com </li><br />
                  <li>-	Vía Telefónica: 300 4308692</li><br />
                  <li>-	Página web https://lopezyescobarabogados.com</li><br />
                </ul>
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  VII.	VIGENCIA
                </h2>
               <p>
                 La presente política rige a partir de la fecha de su publicación y deja sin efectos las demás disposiciones institucionales que le sean contrarias. Toda información no contemplada en la presente política, se reglamentará de acuerdo al Régimen General de Protección de Datos Personales vigente en Colombia.
               </p><br />
               <p>
                 La actualización de la Políticas de Protección de Datos Personales dependerá de las instrucciones y lineamientos de la Dirección Ejecutiva de la Firma, así como de las extensiones reglamentarias del ente de vigilancia y control, la Superintendencia de Industria y Comercio.
               </p><br />
              </section>

              <section>
                <h2 className="text-navy mb-4 font-serif text-2xl font-bold">
                  VIII.	PUBLICACIÓN
                </h2>
                <p className="mb-4 text-gray-700">
                  Esta política ha sido publicada y actualizada en el mes de Agosto del año .2025
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
