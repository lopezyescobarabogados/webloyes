'use client';

import MainLayout from '@/layouts/MainLayout';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section con imagen institucional */}
      <section
        id="hero"
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 35, 66, 0.7), rgba(10, 35, 66, 0.7)), url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiBmaWxsPSIjZjNmNGY2Ii8+CjxjaXJjbGUgY3g9IjQ4MCIgY3k9IjI3MCIgcj0iMTIwIiBmaWxsPSIjZTVlN2ViIi8+CjxjaXJjbGUgY3g9IjE0NDAiIGN5PSI4MTAiIHI9IjE2MCIgZmlsbD0iI2U1ZTdlYiIvPgo8cGF0aCBkPSJNNjAwIDQwMEw4MDAgNjAwTDEwMDAgNDAwTDEyMDAgNjAwTDE0MDAgNDAwIiBzdHJva2U9IiNkMWQ1ZGIiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K')`,
        }}
      >
        <div className="relative z-10 container mx-auto px-4 text-center text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 font-serif text-4xl leading-tight font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Compromiso y Experiencia Jurídica
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-200 sm:text-xl md:text-2xl">
              López & Escobar Abogados Asociados S.A.S., ofrece servicios jurídicos especializados, con más de 25 años de experiencia.
            </p>
            <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:max-w-none sm:flex-row">
              <Link href="/servicios">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-navy w-full transform border-white bg-white transition-all duration-300 hover:scale-105 hover:bg-gray-100 sm:w-auto"
                >
                  Nuestros Servicios
                </Button>
              </Link>
              <Link href="/contacto">
                <Button
                  size="lg"
                  variant="ghost"
                  className="hover:text-navy w-full transform border-white text-white transition-all duration-300 hover:scale-105 hover:bg-white sm:w-auto"
                >
                  Consulta
                </Button>
              </Link>
            </div>
          </div>

          {/* Indicador de scroll */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
            {/* Scroll indicator icon removed */}
          </div>
        </div>
      </section>

      {/* Sección destacada de servicios */}
      <section
        id="servicios-destacados"
        className="bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="text-navy mb-4 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
              Servicios Jurídicos
            </h2>
          </div>
          <div className="text-center">
            <Link href="/servicios">
              <Button size="lg" className="px-8">
                 Servicios
              </Button>
            </Link>
          </div>
        </div>  
      </section>

      {/* Por qué elegirnos - Valores de la firma */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 font-serif text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">
              ¿Por qué elegir López & Escobar?
            </h2>
            <p className="mb-12 text-lg text-gray-600 sm:text-xl">
              Porque brindamos seguridad jurídica y confianza estratégica a todos nuestros clientes, con un enfoque integral y personalizado que garantiza resultados efectivos.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              
              <h3 className="mb-4 font-serif text-xl font-semibold text-navy">Experiencia Especializada</h3>
              <p className="text-gray-600">
                Más de 25 años de experiencia profesional en áreas especializadas del derecho, con amplio manejo normativo y jurisprudencial.
              </p>
            </div>

            <div className="text-center">
              
              <h3 className="mb-4 font-serif text-xl font-semibold text-navy">Atención Personalizada</h3>
              <p className="text-gray-600">
                Brindamos un acompañamiento cercano y profesional, reconociendo que cada cliente y cada caso requieren soluciones jurídicas únicas, diseñadas con dedicación y detalle.
              </p>
            </div>

            <div className="text-center">
              
              <h3 className="mb-4 font-serif text-xl font-semibold text-navy">Prevención de Riesgos</h3>
              <p className="text-gray-600">
                Nuestro enfoque preventivo evita problemas legales costosos. Anticipamos riesgos y estructuramos soluciones antes de que surjan conflictos.
              </p>
            </div>

            <div className="text-center">
              
              <h3 className="mb-4 font-serif text-xl font-semibold text-navy">Soluciones Estratégicas</h3>
              <p className="text-gray-600">
                Combinamos conocimiento técnico con visión estratégica para ofrecer soluciones que impulsen el crecimiento y protejan sus intereses.
              </p>
            </div>

            <div className="text-center">
              
              <h3 className="mb-4 font-serif text-xl font-semibold text-navy">Transparencia Total</h3>
              <p className="text-gray-600">
                Garantizamos una comunicación clara y permanente, con total transparencia en cada etapa del proceso, brindando a nuestros clientes la certeza y confianza necesarias en la gestión de sus asuntos jurídicos.
              </p>
            </div>

            <div className="text-center">
              
              <h3 className="mb-4 font-serif text-xl font-semibold text-navy">Acompañamiento Permanente</h3>
              <p className="text-gray-600">
                Más allá de resolver asuntos jurídicos, cultivamos relaciones de largo plazo, consolidándonos como asesores estratégicos de confianza.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/nosotros">
              <Button size="lg" variant="outline" className="mr-4">
                Nosotros
              </Button>
            </Link>
            <Link href="/contacto">
              <Button size="lg">
                Consulta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Resumen de la firma: visión, valores */}
      <section id="vision-valores" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="text-navy mb-4 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
              Nuestros Principios
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl">
              Ejercemos nuestra labor con ética, excelencia y un firme compromiso en la protección de los intereses de nuestros clientes.
            </p>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Visión */}
            <div className="text-center lg:text-left">
              
              <h3 className="text-navy mb-4 font-serif text-2xl font-bold sm:text-3xl">
                Visión
              </h3>
              <p className="text-lg leading-relaxed text-gray-600">
                Consolidarnos como una firma jurídica de referencia a nivel local, 
                nacional e internacional, distinguida por la excelencia en nuestras áreas de práctica. 
                Nuestra visión es ser un referente de confianza y transformación, aportando soluciones 
                jurídicas que impacten positivamente en nuestros clientes.
              </p>
            </div>

            {/* Valores */}
            <div className="space-y-8">
              <h3 className="text-navy text-center font-serif text-2xl font-bold sm:text-3xl lg:text-left">
               Pilares de la Organización
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div>
                    <h4 className="text-navy mb-2 font-semibold">
                      - El rigor jurídico no es una virtud, es un punto de partida.
                      </h4>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div>
                    <h4 className="text-navy mb-2 font-semibold">- Los litigantes somos contadores de historias.</h4>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div>
                    <h4 className="text-navy mb-2 font-semibold">
                      - No hay enemigo pequeño ni adversario invencible
                    </h4>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div>
                    <h4 className="text-navy mb-2 font-semibold">- Las formas sí importan.</h4>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div>
                    <h4 className="text-navy mb-2 font-semibold">
                      - Las victorias son siempre colectivas.
                    </h4>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div>
                    <h4 className="text-navy mb-2 font-semibold">
                      - Siempre, siempre se puede hacer mejor.
                    </h4>
                  </div>
                </div>

                 <div className="mt-6 rounded-lg bg-blue-50 p-4">
                    <p className="text-sm text-gray-600">
                      <strong>Autor:</strong> Ángela María Serrano Muñoz <br />
                      <strong>Publicado:</strong> viernes 22 de agosto de 2025 / Asuntos legales / La República
                    </p>
                  </div>
              </div>
            </div>
          </div>

          {/* CTA button to Nosotros */}
          <div className="mt-12 text-center">
            <Link href="/nosotros">
              <Button size="lg" className="bg-navy hover:bg-blue-800">
               Nosotros
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action al contacto */}
      <section
        id="cta-contacto"
        className="from-navy to-navy bg-gradient-to-br via-blue-900 py-16 text-white sm:py-20 lg:py-24"
      >
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
              Te Asesoramos 
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-200 sm:text-xl">
              Orientación jurídica estratégica y especializada
            </p>

            <div className="mx-auto mb-12 flex max-w-md flex-col justify-center gap-4 sm:max-w-none sm:flex-row">
              <Link href="/contacto">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-navy w-full transform border-white bg-white transition-all duration-300 hover:scale-105 hover:bg-gray-100 sm:w-auto"
                >
                  Contáctanos
                </Button>
              </Link>
              <Link href="/servicios">
                <Button
                  size="lg"
                  variant="ghost"
                  className="hover:text-navy w-full transform border-white text-white transition-all duration-300 hover:scale-105 hover:bg-white sm:w-auto"
                >
                  Nuestros Servicios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
