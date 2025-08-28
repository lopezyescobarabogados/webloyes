import { Metadata } from 'next';
import MainLayout from '@/layouts/MainLayout';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Nosotros - López y Escobar Abogados Asociados | Nuestra Historia, Visión y Valores',
  description:
    'Conoce la historia de López y Escobar Abogados Asociados, nuestra visión empresarial, misión y los valores que nos definen como firma jurídica líder.',
  keywords:
    'nosotros, historia, visión, misión, valores, López y Escobar, abogados, firma jurídica',
  openGraph: {
    title: 'Nosotros - López y Escobar Abogados Asociados',
    description:
      'Descubre quiénes somos, nuestra historia y los valores que guían nuestro trabajo jurídico',
    type: 'website',
  },
};

export default function NosotrosPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="from-navy to-navy bg-gradient-to-br via-blue-900 py-16 text-white sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 font-serif text-4xl leading-tight font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                López & Escobar Abogados
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-200 sm:text-xl md:text-2xl">
              Una trayectoria de compromiso, responsabilidad profesional y
              dedicación constante al servicio de nuestros clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Filosofía Empresarial */}
      <section
        id="vision-mision-valores"
        className="bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="text-navy mb-4 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
              Nuestra Firma
            </h2>
            {/* Presentación de la firma */}
            <article className="space-y-6 bg-white p-8 text-justify sm:p-12">
              <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl">
                Servicios legales integrales y profesionales, con
                especialización en las áreas de Derecho Comercial, Societario,
                Administrativo, Laboral - SSG ST y Tributario. Nuestra asesoría
                está dirigida tanto a personas naturales como jurídicas, con un
                enfoque práctico y estratégico que responde a las exigencias del
                entorno actual.
              </p>
              <br />
              <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl">
                Contamos con una alianza estratégica en materia contable, lo que
                nos permite ofrecer soluciones coordinadas y
                multidisciplinarias, garantizando a nuestros clientes un
                cumplimiento normativo sólido y coherente en todos los ámbitos
                corporativos.
              </p>
            </article>
            <br />
            <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl">
              Los principios fundamentales que guían cada decisión y definen
              nuestra identidad jurídica
            </p>
          </div>

          <div className="mx-auto max-w-6xl space-y-16">
            {/* Visión */}
            <article className="rounded-2xl bg-gray-50 p-8 transition-shadow duration-300 hover:shadow-lg sm:p-12">
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <div className="text-center">
                    <h3 className="text-navy font-serif text-2xl font-bold sm:text-3xl">
                      Misión
                    </h3>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="text-justify leading-relaxed text-gray-700">
                    <p className="text-lg sm:text-xl">
                      Acompañar y respaldar el crecimiento empresarial y
                      personal de nuestros clientes, mediante una asesoría legal
                      preventiva, estratégica y oportuna. Nuestro propósito es
                      mitigar riesgos y facilitar la toma de decisiones,
                      aportando seguridad jurídica en cada etapa de sus
                      actividades.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Visión */}
            <article className="rounded-2xl bg-gray-50 p-8 transition-shadow duration-300 hover:shadow-lg sm:p-12">
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <div className="text-center">
                    <h3 className="text-navy font-serif text-2xl font-bold sm:text-3xl">
                      Visión
                    </h3>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="text-justify leading-relaxed text-gray-700">
                    <p className="text-lg sm:text-xl">
                      Consolidarnos como una firma jurídica de referencia a
                      nivel local, nacional e internacional, distinguida por la
                      excelencia en nuestras áreas de práctica. Nuestra visión
                      es ser un referente de confianza y transformación,
                      aportando soluciones jurídicas que impacten positivamente
                      en nuestros clientes.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Objetivo */}
            <article className="rounded-2xl bg-gray-50 p-8 transition-shadow duration-300 hover:shadow-lg sm:p-12">
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <div className="text-center">
                    <h3 className="text-navy font-serif text-2xl font-bold sm:text-3xl">
                      Objetivo
                    </h3>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="text-justify leading-relaxed text-gray-700">
                    <p className="text-lg sm:text-xl">
                      Lograr la máxima satisfacción de nuestros clientes,
                      brindando soluciones jurídicas con altos estándares de
                      calidad, ética y profesionalismo. Nos comprometemos a
                      generar valor real en cada intervención legal, gracias a
                      nuestro conocimiento profundo y experiencia en las áreas
                      en que somos expertos.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Valores */}
            <article className="rounded-2xl bg-gray-50 p-8 transition-shadow duration-300 hover:shadow-lg sm:p-12">
              <div className="mb-12 text-center">
                <h3 className="text-navy font-serif text-2xl font-bold sm:text-3xl">
                  Pilares de la Organización
                </h3>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div>
                      <h4 className="text-navy mb-2 font-serif text-lg font-semibold">
                        El rigor jurídico no es una virtud, es un punto de
                        partida.
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div>
                      <h4 className="text-navy mb-2 font-serif text-lg font-semibold">
                        Los litigantes somos contadores de historias.
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div>
                      <h4 className="text-navy mb-2 font-serif text-lg font-semibold">
                        No hay enemigo pequeño ni adversario invencible
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div>
                      <h4 className="text-navy mb-2 font-serif text-lg font-semibold">
                        Las formas sí importan.
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div>
                      <h4 className="text-navy mb-2 font-serif text-lg font-semibold">
                        Las victorias son siempre colectivas.
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div>
                      <h4 className="text-navy mb-2 font-serif text-lg font-semibold">
                        Siempre, siempre se puede hacer mejor.
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-gray-600">
                    <strong>Autor:</strong> Ángela María Serrano Muñoz <br />
                    <strong>Publicado:</strong> viernes 22 de agosto de 2025 /
                    Asuntos legales / La República
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="from-navy to-navy bg-gradient-to-br via-blue-900 py-16 text-white sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:max-w-none sm:flex-row">
             <Link href="/contacto">
                <Button
                  size="lg"
                  className="btn-outline-white w-full transform transition-all duration-300 hover:scale-105 sm:w-auto"
                >
                  Contáctenos
                </Button>
              </Link>
              <Link href="/servicios">
                <Button
                  size="lg"
                  className="btn-outline-white w-full transform transition-all duration-300 hover:scale-105 sm:w-auto"
                >
                  Servicios
                </Button>
              </Link>
            </div><br />
            <p className="mb-8 text-lg leading-relaxed text-gray-200">
              Orientación jurídica estratégica y especializada
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
